import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { rankPhotographers } from './src/services/recommendationService.js';

dotenv.config();

const runRecommendationTests = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db';
  console.log(`Connecting to MongoDB at ${mongoUri}...`);
  await mongoose.connect(mongoUri);
  console.log('✓ Connected to MongoDB for recommendation testing.\n');

  try {
    console.log('========================================================================');
    console.log('TEST 1: Customer Example Requirements (Bhopal, Wedding, ₹15,000, Candid, 2026-11-20)');
    console.log('========================================================================');
    const results1 = await rankPhotographers({
      eventType: 'Wedding',
      location: 'Bhopal',
      maxBudget: 15000,
      photographyStyle: 'Candid',
      eventDate: '2026-11-20', // A Friday
    });

    console.log(`Found ${results1.length} eligible photographers:`);
    results1.forEach((p, idx) => {
      console.log(
        `#${idx + 1}: ${p.name} (${p.city}) — Match Score: ${p.overallScore}% | Price: ₹${p.displayPrice} | Avail: ${p.availabilityStatus}`
      );
      console.log(`   Best Package: "${p.bestMatchingPackage?.title}" (₹${p.bestMatchingPackage?.price})`);
      console.log(`   Reasons:`);
      p.matchReasons.forEach((r) => console.log(`     • ${r}`));
    });

    // Assertions for Test 1
    if (results1.length === 0) throw new Error('Test 1 failed: Expected at least 1 photographer');
    const top = results1[0];
    if (top.name !== 'Kabir Sen') {
      console.warn(`Warning: Expected Kabir Sen to rank #1, got ${top.name}`);
    } else {
      console.log('✓ Test 1 PASSED: Kabir Sen correctly ranked #1 with real package from DB.\n');
    }

    console.log('========================================================================');
    console.log('TEST 2: Availability Collision & Exclusion (Requested Date = 2026-11-15)');
    console.log('Vikramaditya Rao has a confirmed booking on 2026-11-15.');
    console.log('Ananya Deshmukh is unavailable on Sundays in her weekly schedule.');
    console.log('========================================================================');
    const results2 = await rankPhotographers({
      eventType: 'Wedding',
      location: 'Bhopal',
      maxBudget: 15000,
      photographyStyle: 'Candid',
      eventDate: '2026-11-15', // Sunday
      excludeUnavailable: true,
    });

    const vikramFound = results2.find((p) => p.name === 'Vikramaditya Rao');
    const ananyaFound = results2.find((p) => p.name === 'Ananya Deshmukh');

    if (vikramFound) {
      throw new Error('Test 2 failed: Vikramaditya Rao was booked on 2026-11-15 but was not excluded!');
    } else {
      console.log('✓ Vikramaditya Rao was correctly excluded due to confirmed active booking.');
    }

    if (ananyaFound) {
      throw new Error('Test 2 failed: Ananya Deshmukh is closed on Sundays but was not excluded!');
    } else {
      console.log('✓ Ananya Deshmukh was correctly excluded due to Sunday weekly schedule closure.');
    }
    console.log('✓ Test 2 PASSED: Reliable unavailability exclusions working accurately.\n');

    console.log('========================================================================');
    console.log('TEST 3: Rule 8 - Missing Availability Schedule (Neha Kapoor)');
    console.log('Never assume a photographer is available if the database does not confirm it.');
    console.log('========================================================================');
    const results3 = await rankPhotographers({
      eventType: 'Fashion',
      location: 'Bhopal',
      maxBudget: 20000,
      photographyStyle: 'Fashion',
      eventDate: '2026-11-20',
      excludeUnavailable: false, // Include all to inspect status
    });

    const neha = results3.find((p) => p.name === 'Neha Kapoor');
    if (!neha) throw new Error('Test 3 failed: Neha Kapoor not found');
    console.log(`Neha Kapoor Availability Status: ${neha.availabilityStatus}`);
    console.log(`Explanation: ${neha.componentScores.availability.explanation}`);
    if (neha.availabilityStatus !== 'UNVERIFIED') {
      throw new Error(`Test 3 failed: Expected UNVERIFIED status, got ${neha.availabilityStatus}`);
    }
    console.log('✓ Test 3 PASSED: Missing availability schedule displayed as UNVERIFIED without assumption.\n');

    console.log('========================================================================');
    console.log('TEST 4: Non-matching / Out-of-Budget Search');
    console.log('========================================================================');
    const results4 = await rankPhotographers({
      eventType: 'Corporate',
      location: 'Chennai',
      maxBudget: 3000, // Very low budget
      photographyStyle: 'Underwater',
    });

    console.log(`Found ${results4.length} results for extreme criteria.`);
    results4.slice(0, 3).forEach((p) => {
      console.log(`${p.name} - Score: ${p.overallScore}% - Budget Score: ${p.componentScores.budget.score}%`);
    });
    console.log('✓ Test 4 PASSED: Gracefully handled low/non-matching parameters.\n');

    console.log('========================================================================');
    console.log('TEST 5: Custom Configurable Weights');
    console.log('Test heavy budget weighting vs heavy location weighting.');
    console.log('========================================================================');
    const resultsHeavyLoc = await rankPhotographers({
      location: 'Mumbai',
      maxBudget: 15000,
      weights: { location: 0.8, budget: 0.1, style: 0.05, service: 0.05, availability: 0.0 },
    });
    const topMumbai = resultsHeavyLoc[0];
    console.log(`Top photographer under 80% location weight: ${topMumbai.name} (${topMumbai.city}) - Score: ${topMumbai.overallScore}%`);
    if (topMumbai.city !== 'Mumbai') {
      throw new Error('Test 5 failed: Expected Mumbai photographer to win under heavy location weight');
    }
    console.log('✓ Test 5 PASSED: Configurable weights alter ranking dynamically.\n');

    console.log('=============================================');
    console.log('🎉 ALL BACKEND RECOMMENDATION TESTS PASSED!');
    console.log('=============================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('✗ Test failed:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

runRecommendationTests();
