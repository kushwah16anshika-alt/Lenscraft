import express from 'express';
import { classifyImage, getSupportedCategories } from '../controllers/aiController.js';

const router = express.Router();

// Public/Creative routes for AI image classification
router.post('/classify-image', classifyImage);
router.get('/categories', getSupportedCategories);

export default router;
