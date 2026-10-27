import express from 'express';
import { getPhotographerRecommendations } from '../controllers/recommendationController.js';

const router = express.Router();

// Both POST and GET are supported for flexible recommendation queries
router.post('/photographers', getPhotographerRecommendations);
router.get('/photographers', getPhotographerRecommendations);

export default router;
