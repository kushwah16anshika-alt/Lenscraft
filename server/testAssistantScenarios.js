import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/index.js';

dotenv.config();

let BASE_URL = 'http://localhost:5000/api';
let testServer = null;
let isInternalServer = false;

async function setupServer() {
  try {
    const res = await fetch('http://localhost:5000/api/health');
    if (res.ok) {
      BASE_URL = 'http://localhost:5000/api';
      return;
    }
  } catch (err) {
    // Port 5000 not running, start internal test server
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db');
  }

  const app = express();
  app.use(express.json());
  app.use('/api', apiRoutes);

  await new Promise((resolve) => {
    testServer = app.listen(5008, () => {
      BASE_URL = 'http://localhost:5008/api';
      isInternalServer = true;
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
  await setupServer();
  console.log('\n==================================================');
  console.log('🧪 RUNNING TECHNOLOGY 3 ASSISTANT TEST SUITE');
  console.log('==================================================\n');

  const results = [];

  // Scenario 1: Finding a wedding photographer within a specified budget
  results.push(
    await runTest('Finding wedding photographer in Bhopal under 15k', async () => {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'I need a wedding photographer in Bhopal under ₹15,000.' }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Request failed');
      if (!data.data.photographers || data.data.photographers.length === 0) {
        throw new Error('No photographers returned for valid Bhopal wedding query');
      }
      const kabir = data.data.photographers.find((p) => p.name.includes('Kabir'));
      if (!kabir) throw new Error('Kabir Sen not found in results');
      if (kabir.startingPrice > 15000) throw new Error('Starting price exceeded 15k budget');
    })
  );

  // Scenario 2: Incomplete query asking a useful follow-up question
  results.push(
    await runTest('Searching with incomplete query and receiving follow-up question', async () => {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Can you suggest a photographer for me?' }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Request failed');
      const reply = data.data.reply.toLowerCase();
      if (!reply.includes('event') && !reply.includes('city') && !reply.includes('budget')) {
        throw new Error('Follow-up question did not ask for missing event/city/budget');
      }
    })
  );

  // Scenario 3: Searching when no matching photographers exist
  results.push(
    await runTest('Searching when no matching photographers exist in database', async () => {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'I need a photographer in Antarctica under ₹500.' }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Request failed');
      const reply = data.data.reply.toLowerCase();
      if (!reply.includes('do not have') && !reply.includes('no photographers') && !reply.includes('available in')) {
        throw new Error('Response did not properly state absence of matching creators');
      }
      if (data.data.photographers && data.data.photographers.length > 0) {
        throw new Error('Photographers array should be empty for impossible criteria');
      }
    })
  );

  // Scenario 4: Asking about actual package prices
  results.push(
    await runTest('Asking about actual package prices from MongoDB', async () => {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'What are the available photography packages and actual prices?' }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Request failed');
      if (!data.data.reply.includes('₹') && !data.data.reply.includes('Rs')) {
        throw new Error('Packages response did not include actual monetary pricing');
      }
    })
  );

  // Scenario 5: Booking process explanation
  results.push(
    await runTest('Understanding how the booking process works', async () => {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'How does the booking process work on Lenscraft?' }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Request failed');
      const reply = data.data.reply.toLowerCase();
      if (!reply.includes('booking') || !reply.includes('date')) {
        throw new Error('Booking explanation missing key booking lifecycle steps');
      }
    })
  );

  // Scenario 6: Malformed / Empty requests
  results.push(
    await runTest('Rejecting malformed / empty requests with HTTP 400', async () => {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '   ' }),
      });
      if (res.status !== 400) throw new Error(`Expected HTTP 400 for empty message, got ${res.status}`);
    })
  );

  // Scenario 7: Regression Check - Health & Existing APIs
  results.push(
    await runTest('Regression: Health endpoint responding OK', async () => {
      const res = await fetch(`${BASE_URL}/health`);
      if (res.status !== 200) throw new Error(`Health status ${res.status}`);
    })
  );

  results.push(
    await runTest('Regression: Professionals directory endpoint working', async () => {
      const res = await fetch(`${BASE_URL}/professionals`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.data.professionals)) {
        throw new Error('Failed to retrieve professionals directory');
      }
    })
  );

  results.push(
    await runTest('Regression: Technology 1 Recommendations endpoint intact', async () => {
      const res = await fetch(`${BASE_URL}/recommendations/photographers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'Wedding', location: 'Bhopal', maxBudget: 20000 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error('Recommendation system returned failure');
    })
  );

  results.push(
    await runTest('Regression: Technology 2 Style Classification endpoint intact', async () => {
      const res = await fetch(`${BASE_URL}/ai/categories`);
      const data = await res.json();
      if (!data.success || !data.data.categories) {
        throw new Error('AI Style Categories returned failure');
      }
    })
  );

  console.log('\n==================================================');
  const passed = results.filter((r) => r.status === 'PASSED').length;
  const failed = results.length - passed;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('==================================================\n');

  await teardownServer();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(failed > 0 ? 1 : 0);
}

main();
