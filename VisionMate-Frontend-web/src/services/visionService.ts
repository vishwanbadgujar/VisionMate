import { VisionResult } from "@/types/app";

export interface VisionServiceOptions {
  apiKey?: string;
  backendUrl?: string;
}

class VisionService {
  private backendUrl: string =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  async describeScene(imageData: string): Promise<VisionResult> {
    // Mock response for now
    // In production, this would call: POST /api/vision/describe
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      type: "scene",
      content:
        "A modern office space with large windows showing a city skyline. There's a desk with a laptop, some plants, and natural lighting throughout the room.",
      timestamp: Date.now(),
      confidence: 0.95,
    };
  }

  async readText(imageData: string): Promise<VisionResult> {
    // Mock response for now
    // In production, this would call: POST /api/vision/ocr
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      type: "text",
      content:
        "VisionMate\n\nAn AI accessibility companion\n\nPoint. Listen. Understand.",
      timestamp: Date.now(),
      confidence: 0.92,
    };
  }

  async identifyObject(imageData: string): Promise<VisionResult> {
    // Mock response for now
    // In production, this would call: POST /api/vision/identify
    await new Promise((resolve) => setTimeout(resolve, 1300));
    return {
      type: "object",
      content: "Laptop",
      timestamp: Date.now(),
      confidence: 0.88,
      details: {
        alternatives: ["Computer", "MacBook"],
        description:
          "A portable computing device, typically used for work or personal tasks.",
      },
    };
  }
}

export const visionService = new VisionService();
