import { Request, Response } from "express";
import { visionServiceClient } from "@/services/visionService";
import { VisionRequest, VisionResponse, ApiError } from "@/types";

class VisionController {
  async describe(req: Request, res: Response) {
    try {
      const { imageData, language } = req.body;

      if (!imageData) {
        return res.status(400).json({
          error: {
            code: "INVALID_REQUEST",
            message: "imageData is required",
          },
        });
      }

      const visionRequest: VisionRequest = {
        imageData,
        type: "describe",
        language,
      };

      const result = await visionServiceClient.process(visionRequest);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("[Vision.describe] Error:", error);
      res.status(500).json({
        error: {
          code: "VISION_ERROR",
          message: "Failed to describe scene",
        },
      });
    }
  }

  async ocr(req: Request, res: Response) {
    try {
      const { imageData, language } = req.body;

      if (!imageData) {
        return res.status(400).json({
          error: {
            code: "INVALID_REQUEST",
            message: "imageData is required",
          },
        });
      }

      const visionRequest: VisionRequest = {
        imageData,
        type: "ocr",
        language,
      };

      const result = await visionServiceClient.process(visionRequest);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("[Vision.ocr] Error:", error);
      res.status(500).json({
        error: {
          code: "OCR_ERROR",
          message: "Failed to extract text",
        },
      });
    }
  }

  async identify(req: Request, res: Response) {
    try {
      const { imageData } = req.body;

      if (!imageData) {
        return res.status(400).json({
          error: {
            code: "INVALID_REQUEST",
            message: "imageData is required",
          },
        });
      }

      const visionRequest: VisionRequest = {
        imageData,
        type: "identify",
      };

      const result = await visionServiceClient.process(visionRequest);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("[Vision.identify] Error:", error);
      res.status(500).json({
        error: {
          code: "IDENTIFY_ERROR",
          message: "Failed to identify object",
        },
      });
    }
  }

  async health(req: Request, res: Response) {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        vision: true,
        database: true,
      },
    });
  }
}

export const visionController = new VisionController();
