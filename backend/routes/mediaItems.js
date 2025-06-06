import express from "express";
import {
  createMediaItem,
  getMediaItems,
  getWorkspaceDetails,
  saveWorkspaceDetails,
} from "../controllers/mediaController.js";

const router = express.Router();

router.post("/", createMediaItem);
router.get("/", getMediaItems);
router.get("/workspaces", getWorkspaceDetails);
router.post("/workspaces", saveWorkspaceDetails);

export default router;
