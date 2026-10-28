import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { classifyIntentAndEntities, runGroundedNlpFallback } from './src/services/nlpIntentService.js';
import { processAssistantMessage } from './src/services/assistantService.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db';

let passed = 0;
let failed = 0;

async function assert(desc, condition) {
  if (condition) {
    console.log(`  ✓ ${desc}`);
    passed++;
  } else {
    console.error(`  ✗ FAILED: ${desc}`);
    failed++;
    throw new Error(desc);
  }
}

async function main() {
  console.log('\n=============================================================');
  console.log('🧪 TECHNOLOGY 5: MULTILINGUAL NLP INTENT & ENTITY TEST SUITE');
  console.log('=============================================================\n');

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.\n');

    // -------------------------------------------------------------
    // Test 1: Grounded JavaScript NLP Fallback Engine
    // -------------------------------------------------------------
    console.log('TEST 1: Grounded Fallback Engine Parsing & Entity Extraction');
    const fbResult = runGroundedNlpFallback('mujhe bhopal me wedding photographer chahiye 15k ke andar');
    assert('Fallback detects intent: photographer_search', fbResult.intent === 'photographer_search');
    assert('Fallback extracts location: Bhopal', fbResult.entities.location === 'Bhopal');
    assert('Fallback parses budget "15k" as 15000', fbResult.entities.budget === 15000);
    assert('Fallback extracts eventType: Wedding', fbResult.entities.eventType === 'Wedding');
    assert('Fallback detects language: hinglish', fbResult.entities.detectedLanguage === 'hinglish');

    // Hindi word budget in fallback
    const fbHindi = runGroundedNlpFallback('indore me shadi ke liye 15 hazaar tak photographer');
    assert('Fallback parses "15 hazaar" as 15000', fbHindi.entities.budget === 15000);
    assert('Fallback extracts location: Indore', fbHindi.entities.location === 'Indore');

    // -------------------------------------------------------------
    // Test 2: End-to-End English Search via Assistant
    // -------------------------------------------------------------
    console.log('\nTEST 2: End-to-End English Assistant Search');
    const resEn = await processAssistantMessage({
      message: 'I need a candid wedding photographer in Bhopal under ₹15,000.',
    });
    assert('Assistant returns reply', typeof resEn.reply === 'string' && resEn.reply.length > 20);
    assert('NLP metadata present', !!resEn.nlp);
    assert('NLP intent is photographer_search', resEn.nlp.intent === 'photographer_search');
    assert('Photographers retrieved from MongoDB', Array.isArray(resEn.photographers) && resEn.photographers.length > 0);
    assert('Top photographer matches budget', resEn.photographers[0].startingPrice <= 15000 || resEn.photographers[0].packages.some(p => p.price <= 15000));

    // -------------------------------------------------------------
    // Test 3: End-to-End Roman Hinglish Search
    // -------------------------------------------------------------
    console.log('\nTEST 3: End-to-End Roman Hinglish Search');
    const resHinglish = await processAssistantMessage({
      message: 'mujhe bhopal me wedding photographer chahiye 15k ke andar',
    });
    assert('Hinglish intent is photographer_search', resHinglish.nlp.intent === 'photographer_search');
    assert('Hinglish parsed location is Bhopal', resHinglish.nlp.entities.location === 'Bhopal');
    assert('Hinglish parsed budget is 15000', resHinglish.nlp.entities.budget === 15000);
    assert('Retrieved verified Bhopal photographers', resHinglish.photographers.some(p => p.city === 'Bhopal'));

    // -------------------------------------------------------------
    // Test 4: End-to-End Devanagari Hindi Search
    // -------------------------------------------------------------
    console.log('\nTEST 4: End-to-End Devanagari Hindi Search');
    const resHindi = await processAssistantMessage({
      message: 'मुझे भोपाल में शादी के लिए फोटोग्राफर चाहिए',
    });
    assert('Hindi intent is photographer_search', resHindi.nlp.intent === 'photographer_search');
    assert('Hindi detected language is hi', resHindi.nlp.entities.detectedLanguage === 'hi');
    assert('Hindi location is Bhopal', resHindi.nlp.entities.location === 'Bhopal');
    assert('Photographers retrieved for Hindi query', resHindi.photographers.length > 0);

    // -------------------------------------------------------------
    // Test 5: Booking Help Intent
    // -------------------------------------------------------------
    console.log('\nTEST 5: Booking Help Intent');
    const resBooking = await processAssistantMessage({
      message: 'lenscraft par photographer kaise book kare step by step?',
    });
    assert('Intent is booking_help', resBooking.nlp.intent === 'booking_help');
    assert('Reply contains booking steps', resBooking.reply.toLowerCase().includes('book') || resBooking.reply.includes('बुकिंग'));

    // -------------------------------------------------------------
    // Test 6: Pricing Question Intent
    // -------------------------------------------------------------
    console.log('\nTEST 6: Pricing Question Intent');
    const resPricing = await processAssistantMessage({
      message: 'wedding photography ka ek din ka kitna kharcha aayega?',
    });
    assert('Intent is pricing_question', resPricing.nlp.intent === 'pricing_question');

    // -------------------------------------------------------------
    // Test 7: General Lenscraft Help Intent
    // -------------------------------------------------------------
    console.log('\nTEST 7: General Lenscraft Help Intent');
    const resGeneral = await processAssistantMessage({
      message: 'lenscraft kya hai aur ye platform kaise kaam karta hai?',
    });
    assert('Intent is general_lenscraft_help', resGeneral.nlp.intent === 'general_lenscraft_help');
    assert('Reply explains Lenscraft marketplace', resGeneral.reply.toLowerCase().includes('lenscraft'));

    // -------------------------------------------------------------
    // Test 8: Unknown / Out-of-Domain Intent
    // -------------------------------------------------------------
    console.log('\nTEST 8: Unknown / Out-of-Domain Intent');
    const resUnknown = await processAssistantMessage({
      message: 'What is the weather forecast in Mumbai today?',
    });
    assert('Intent is unknown_or_unsupported', resUnknown.nlp.intent === 'unknown_or_unsupported');
    assert('Photographers list is empty for weather query', resUnknown.photographers.length === 0);

    console.log('\n=============================================================');
    console.log(`🎉 ALL TECHNOLOGY 5 NLP TESTS PASSED! (${passed} checks passed, 0 failed)`);
    console.log('=============================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Test failed with error:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

main();
