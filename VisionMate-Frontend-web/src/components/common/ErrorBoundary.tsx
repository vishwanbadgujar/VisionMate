import React, { ReactNode } from "react";
import { COLORS } from "@/theme/colors";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center p-6"
          style={{ backgroundColor: COLORS.bgPage }}
        >
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: COLORS.error + "20" }}
              >
                <span className="text-4xl">⚠️</span>
              </div>
            </div>

            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: COLORS.textPrimary }}
            >
              Something went wrong
            </h1>

            <p
              className="text-sm mb-6"
              style={{ color: COLORS.textSecondary }}
            >
              {this.state.error?.message ||
                "An unexpected error occurred. Please try again."}
            </p>

            {import.meta.env.DEV && (
              <div
                className="p-4 rounded-lg mb-6 text-xs text-left overflow-auto max-h-[200px]"
                style={{
                  backgroundColor: COLORS.bgElevated,
                  color: COLORS.textMuted,
                }}
              >
                <details className="cursor-pointer">
                  <summary className="font-semibold mb-2">
                    Error details (dev only)
                  </summary>
                  <code>{this.state.error?.toString()}</code>
                </details>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="px-6 py-3 rounded-lg font-semibold w-full"
              style={{
                backgroundColor: COLORS.primary,
                color: "white",
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
