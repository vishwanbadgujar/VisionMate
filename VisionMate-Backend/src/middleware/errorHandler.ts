import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/types";

class ErrorHandler {
  handle(err: Error | ApiError, req: Request, res: Response, next: NextFunction) {
    console.error("[Error]", err);

    // Determine status and message
    let status = 500;
    let message = "Internal server error";
    let code = "INTERNAL_ERROR";
    let details: Record<string, unknown> | undefined;

    if ("code" in err && "message" in err) {
      // Custom API error
      const apiErr = err as ApiError;
      message = apiErr.message;
      code = apiErr.code;
      details = apiErr.details;

      // Map codes to status
      switch (code) {
        case "INVALID_REQUEST":
          status = 400;
          break;
        case "UNAUTHORIZED":
          status = 401;
          break;
        case "FORBIDDEN":
          status = 403;
          break;
        case "NOT_FOUND":
          status = 404;
          break;
        case "RATE_LIMITED":
          status = 429;
          break;
        case "SERVICE_UNAVAILABLE":
          status = 503;
          break;
        default:
          status = 500;
      }
    } else if (err instanceof Error) {
      message = err.message;
    }

    res.status(status).json({
      error: {
        code,
        message,
        details,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === "development" && {
          stack: err instanceof Error ? err.stack : undefined,
        }),
      },
    });
  }
}

export const errorHandler = new ErrorHandler();
