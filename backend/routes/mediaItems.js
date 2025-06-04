import express from 'express';
import { createMediaItem, getMediaItems } from '../controllers/mediaController.js';

const router = express.Router();

router.post('/', createMediaItem);
router.get('/', getMediaItems);

export default router;
