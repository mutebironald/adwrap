import express from 'express';
import { createMediaItem, getMediaItems, getWorkspaceDetails } from '../controllers/mediaController.js';

const router = express.Router();

router.post('/', createMediaItem);
router.get('/', getMediaItems);
router.get('/workspaces', getWorkspaceDetails)

export default router;
