import express from 'express';
import apiRoutes from './server/src/routes/index.js';

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

console.log('✓ All API routes successfully loaded and mounted without error.');
process.exit(0);
