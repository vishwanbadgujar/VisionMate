import { Router } from "express";
import { visionController } from "@/controllers/visionController";

const router = Router();

/**
 * Vision API Routes
 */

// POST /api/vision/describe - Describe a scene
router.post("/describe", (req, res) => visionController.describe(req, res));

// POST /api/vision/ocr - Extract text (OCR)
router.post("/ocr", (req, res) => visionController.ocr(req, res));

// POST /api/vision/identify - Identify an object
router.post("/identify", (req, res) => visionController.identify(req, res));

// GET /api/vision/health - Health check
router.get("/health", (req, res) => visionController.health(req, res));

export const visionRoutes = router;
