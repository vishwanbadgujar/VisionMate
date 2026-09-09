export interface VisionRequest {
  imageData: string; // Base64 encoded image
  type: "describe" | "ocr" | "identify";
  language?: string;
}

export interface VisionResponse {
  type: "describe" | "ocr" | "identify";
  content: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
  processingTimeMs: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface HealthCheckResponse {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  services: {
    vision: boolean;
    database: boolean;
  };
}
