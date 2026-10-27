import express from 'express';
import { getPhotographerRecommendations } from '../controllers/recommendationController.js';
import {
  getSmartPackageRecommendations,
  getRecommendationFilterOptions,
} from '../controllers/packageRecommendationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Technology 1: Photographer Matchmaker Recommendations
router.post('/photographers', getPhotographerRecommendations);
router.get('/photographers', getPhotographerRecommendations);

// Technology 4: ML-Based Smart Package Recommendations
router.post('/smart-packages', optionalAuth, getSmartPackageRecommendations);
router.get('/smart-packages', optionalAuth, getSmartPackageRecommendations);
router.get('/smart-packages/options', getRecommendationFilterOptions);

export default router;

