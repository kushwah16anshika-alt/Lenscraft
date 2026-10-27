import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/index.js';
import packageRecommendationService from './src/services/packageRecommendationService.js';

dotenv.config();

let BASE_URL = 'http://localhost:5012/api';
let testServer = null;

async function setupServer() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db');
  }

  const app = express();
  app.use(express.json());
  app.use('/api', apiRoutes);

  await new Promise((resolve) => {
    testServer = app.listen(5012, () => {
      BASE_URL = 'http://localhost:5012/api';
      resolve();
    });
  });
}

async function teardownServer() {
  if (testServer) {
    await new Promise((resolve) => testServer.close(resolve));
  }
}

async function runTest(name, fn) {
  try {
    process.stdout.write(`Testing: ${name}... `);
    await fn();
    console.log('✓ PASSED');
    return { name, status: 'PASSED' };
  } catch (error) {
    console.log(`✗ FAILED: ${error.message}`);
    return { name, status: 'FAILED', error: error.message };
  }
}

async function main() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING TECHNOLOGY 4 ML SMART PACKAGE TEST SUITE');
  console.log('======================================================\n');

  await setupServer();
  const results = [];

  // Scenario 1: Valid Customer Preferences - Wedding in Bhopal under Rs. 15,000
  results.push(
    await runTest('Valid customer preferences: Wedding in Bhopal under 15k', async () => {
      const res = await fetch(`${BASE_URL}/recommendations/smart-packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'Wedding',
          budget: 15000,
          location: 'Bhopal',
          photographyStyle: 'Candid',
          requiredService: 'photographer',
          strictBudget: true,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Request failed');
      const recs = data.data.recommendations;
      if (!recs || recs.length === 0) throw new Error('No recommendations returned');

      const top = recs[0];
      if (top.package.price > 15000) throw new Error(`Top recommendation price ${top.package.price} exceeded budget 15000`);
      if (!top.isWithinBudget) throw new Error('Top package is not flagged as within budget');
      if (!top.reasons || top.reasons.length === 0) throw new Error('Missing recommendation reasons');
      if (!top.matchBadges || top.matchBadges.length === 0) throw new Error('Missing recommendation badges');
    })
  );

  // Scenario 2: Strict Budget vs Non-Strict Budget Filtering
  results.push(
    await runTest('Strict budget constraint enforcement', async () => {
      // Non-strict allows stretch packages
      const resNonStrict = await fetch(`${BASE_URL}/recommendations/smart-packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'Wedding Photography',
          budget: 14000,
          strictBudget: false,
        }),
      });
      const dataNonStrict = await resNonStrict.json();
      const recsNonStrict = dataNonStrict.data.recommendations;
      const hasStretch = recsNonStrict.some((r) => r.package.price > 14000);
      if (!hasStretch) throw new Error('Non-strict budget should include higher tier stretch options');

      // Strict must only have packages <= budget
      const resStrict = await fetch(`${BASE_URL}/recommendations/smart-packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'Wedding Photography',
          budget: 14000,
          strictBudget: true,
        }),
      });
      const dataStrict = await resStrict.json();
      const recsStrict = dataStrict.data.recommendations;
      for (const r of recsStrict) {
        if (r.package.price > 14000) {
          throw new Error(`Strict budget violated: package ${r.package.title} costs ${r.package.price} > 14000`);
        }
      }
    })
  );

  // Scenario 3: Reject Invalid Budget with HTTP 400
  results.push(
    await runTest('Validation: Reject negative budget with HTTP 400', async () => {
      const res = await fetch(`${BASE_URL}/recommendations/smart-packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'Wedding',
          budget: -5000,
        }),
      });
      if (res.status !== 400) throw new Error(`Expected HTTP 400, got ${res.status}`);
      const data = await res.json();
      if (data.success !== false) throw new Error('Expected success=false');
    })
  );

  // Scenario 4: Grounded Fallback Engine Resilience (offline Python service test)
  results.push(
    await runTest('Grounded Fallback Engine produces verified ranks & explanations', async () => {
      const allPkgs = await packageRecommendationService.getActivePackagesFromDb();
      if (!allPkgs || allPkgs.length === 0) throw new Error('No packages in DB');

      const fallbackResult = packageRecommendationService.rankPackagesGroundedFallback(
        {
          eventType: 'Reels & Short-Form Video',
          budget: 10000,
          location: 'Delhi',
          photographyStyle: 'Modern',
          requiredService: 'editor',
        },
        allPkgs
      );

      if (!fallbackResult.recommendations || fallbackResult.recommendations.length === 0) {
        throw new Error('Fallback engine returned empty recommendations');
      }

      const topRec = fallbackResult.recommendations[0];
      if (!topRec.package.title.toLowerCase().includes('reel')) {
        throw new Error(`Expected Reels package at rank #1, got ${topRec.package.title}`);
      }
      if (topRec.package.professionType !== 'editor') {
        throw new Error(`Expected editor profession, got ${topRec.package.professionType}`);
      }
    })
  );

  // Scenario 5: Filter Options endpoint
  results.push(
    await runTest('GET /api/recommendations/smart-packages/options returns filter options', async () => {
      const res = await fetch(`${BASE_URL}/recommendations/smart-packages/options`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (!data.data.eventTypes || !data.data.cities || !data.data.styles) {
        throw new Error('Filter options missing required filter categories');
      }
    })
  );

  // Scenario 6: Regression check - Package browsing through services route
  results.push(
    await runTest('Regression: GET /api/services still retrieves active services', async () => {
      const res = await fetch(`${BASE_URL}/services`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Services endpoint returned failure');
    })
  );

  // Scenario 7: Regression check - Photographer recommendations route intact
  results.push(
    await runTest('Regression: POST /api/recommendations/photographers still intact', async () => {
      const res = await fetch(`${BASE_URL}/recommendations/photographers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'Wedding',
          location: 'Bhopal',
          maxBudget: 20000,
        }),
      });
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    })
  );

  console.log('\n======================================================');
  const passed = results.filter((r) => r.status === 'PASSED').length;
  const failed = results.length - passed;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================\n');

  await teardownServer();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(failed > 0 ? 1 : 0);
}

main();
