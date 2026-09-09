import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "@/config";
import { visionRoutes } from "@/routes/visionRoutes";
import { errorHandler } from "@/middleware/errorHandler";

const app = express();

// Security & Logging Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(cors(config.cors));

// Body Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/vision", visionRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Endpoint not found",
      path: req.path,
    },
  });
});

// Error Handler (must be last)
app.use(errorHandler.handle.bind(errorHandler));

// Start Server
const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`
┌─────────────────────────────────────┐
│   🚀 VisionMate Backend              │
│   Version: ${config.app.version}                 │
│   Port: ${PORT}                          │
│   Environment: ${config.app.nodeEnv}         │
│   Vision Provider: ${config.vision.provider}       │
└─────────────────────────────────────┘
  `);
});

export default app;
