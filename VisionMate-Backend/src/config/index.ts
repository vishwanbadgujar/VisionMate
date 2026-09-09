import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    name: "VisionMate Backend",
    version: "1.0.0",
    port: parseInt(process.env.PORT || "3001", 10),
    nodeEnv: process.env.NODE_ENV || "development",
  },

  vision: {
    // Google Cloud Vision API
    googleApiKey: process.env.GOOGLE_VISION_API_KEY,
    googleProjectId: process.env.GOOGLE_PROJECT_ID,

    // Claude Vision (Anthropic)
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,

    // Provider selection
    provider: (process.env.VISION_PROVIDER || "mock") as "google" | "anthropic" | "mock",
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:8443",
    credentials: true,
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
  },

  security: {
    // Add rate limiting, API key validation, etc.
    apiKeyRequired: process.env.API_KEY_REQUIRED === "true",
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
    },
  },
};

// Validate required env vars for production
if (config.app.nodeEnv === "production") {
  const requiredVars = ["VISION_PROVIDER"];

  if (config.vision.provider === "google") {
    requiredVars.push("GOOGLE_VISION_API_KEY");
  }

  if (config.vision.provider === "anthropic") {
    requiredVars.push("ANTHROPIC_API_KEY");
  }

  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missing.join(", ")}`
    );
  }
}
