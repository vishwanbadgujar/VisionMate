import { VisionResult } from "@/types";

interface VisionServiceConfig {
  backendUrl?: string;
  apiKey?: string;
}

class VisionService {
  private backendUrl: string;
  private apiKey: string | undefined;

  constructor(config?: VisionServiceConfig) {
    this.backendUrl = config?.backendUrl || "http://localhost:3001/api";
    this.apiKey = config?.apiKey || process.env.EXPO_PUBLIC_VISION_API_KEY;
  }

  /**
   * Describe a scene from an image
   * In production, sends image to backend which calls vision API
   */
  async describeScene(imageUri: string): Promise<VisionResult> {
    // For now, return mock response
    // In production: POST to /vision/describe with image data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          type: "scene",
          content:
            "A professional workspace with natural lighting. There's a person sitting at a desk with a laptop. The walls are neutral colored, and there's a window showing outdoor scenery.",
          timestamp: Date.now(),
          confidence: 0.94,
        });
      }, 2000);
    });
  }

  /**
   * Extract and recognize text from image (OCR)
   * Uses on-device ML Kit in production, backend fallback
   */
  async recognizeText(imageUri: string): Promise<VisionResult> {
    // For now, return mock response
    // In production: POST to /vision/ocr or use on-device ML Kit
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          type: "text",
          content: "VisionMate\nAI Accessibility Companion\nPoint. Listen. Understand.",
          timestamp: Date.now(),
          confidence: 0.88,
        });
      }, 1500);
    });
  }

  /**
   * Identify object in image
   * Calls backend vision API with image
   */
  async identifyObject(imageUri: string): Promise<VisionResult> {
    // For now, return mock response
    // In production: POST to /vision/identify
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          type: "object",
          content: "Laptop",
          timestamp: Date.now(),
          confidence: 0.91,
          details: {
            alternatives: ["Computer", "MacBook"],
            description:
              "A portable computing device used for work, development, or personal computing.",
          },
        });
      }, 1800);
    });
  }

  /**
   * Check if backend is reachable
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/health`, {
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const visionService = new VisionService();
