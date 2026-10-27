import express from 'express';
import recommendationRoutes from './src/routes/recommendationRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/recommendations', recommendationRoutes);

const runRouteTests = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db');
  const server = app.listen(5009);

  try {
    // 1. Test POST endpoint with valid criteria
    const resValid = await fetch('http://localhost:5009/api/recommendations/photographers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'Wedding',
        location: 'Bhopal',
        maxBudget: 15000,
        photographyStyle: 'Candid',
        eventDate: '2026-11-20',
      }),
    });
    const jsonValid = await resValid.json();
    if (!jsonValid.success || jsonValid.data.recommendations.length === 0) {
      throw new Error('Route POST test failed: did not receive recommendations');
    }
    console.log(`✓ HTTP POST /api/recommendations/photographers returned ${jsonValid.data.recommendations.length} recommendations successfully.`);

    // 2. Test Invalid Budget Validation (e.g. negative number)
    const resInvalidBudget = await fetch('http://localhost:5009/api/recommendations/photographers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        maxBudget: -500,
      }),
    });
    const jsonInvalidBudget = await resInvalidBudget.json();
    if (resInvalidBudget.status !== 400 || jsonInvalidBudget.success !== false) {
      throw new Error('Route POST test failed: Negative budget should return HTTP 400');
    }
    console.log(`✓ HTTP POST with negative budget correctly rejected with status 400: "${jsonInvalidBudget.message}"`);

    // 3. Test Invalid Date Validation
    const resInvalidDate = await fetch('http://localhost:5009/api/recommendations/photographers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventDate: 'not-a-valid-date-string',
      }),
    });
    const jsonInvalidDate = await resInvalidDate.json();
    if (resInvalidDate.status !== 400 || jsonInvalidDate.success !== false) {
      throw new Error('Route POST test failed: Invalid date should return HTTP 400');
    }
    console.log(`✓ HTTP POST with invalid date correctly rejected with status 400: "${jsonInvalidDate.message}"`);

    // 4. Test GET query params
    const resGet = await fetch('http://localhost:5009/api/recommendations/photographers?location=Bhopal&maxBudget=15000');
    const jsonGet = await resGet.json();
    if (!jsonGet.success || jsonGet.data.recommendations.length === 0) {
      throw new Error('Route GET test failed');
    }
    console.log(`✓ HTTP GET /api/recommendations/photographers with query params returned ${jsonGet.data.recommendations.length} recommendations successfully.`);

    console.log('✓ ALL HTTP ROUTE TESTS PASSED!');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
  }
};

runRouteTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
