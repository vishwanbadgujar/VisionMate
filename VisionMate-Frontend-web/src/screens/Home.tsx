import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import StatusIndicator from "@/components/common/StatusIndicator";
import MockCamera from "@/components/camera/MockCamera";
import { COLORS } from "@/theme/colors";
import { visionService } from "@/services/visionService";
import { addHistoryItem } from "@/services/historyService";
import { VisionResult } from "@/types/app";

export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"scene" | "text" | "object">("scene");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<VisionResult | null>(null);
  const [resultText, setResultText] = useState("");
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");

  const handleDescribe = async () => {
    setIsProcessing(true);
    setStatus("processing");
    try {
      const visionResult = await visionService.describeScene("mock-image");
      setResult(visionResult);
      setResultText(visionResult.content);
      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 2000);
      addHistoryItem({
        id: Date.now().toString(),
        type: "describe",
        content: visionResult.content,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error describing scene:", error);
      setStatus("idle");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReadText = async () => {
    setIsProcessing(true);
    setStatus("processing");
    try {
      const visionResult = await visionService.readText("mock-image");
      setResult(visionResult);
      setResultText(visionResult.content);
      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 2000);
      addHistoryItem({
        id: Date.now().toString(),
        type: "read",
        content: visionResult.content,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error reading text:", error);
      setStatus("idle");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleIdentify = async () => {
    setIsProcessing(true);
    setStatus("processing");
    try {
      const visionResult = await visionService.identifyObject("mock-image");
      setResult(visionResult);
      setResultText(visionResult.content);
      setStatus("speaking");
      setTimeout(() => setStatus("idle"), 2000);
      addHistoryItem({
        id: Date.now().toString(),
        type: "identify",
        content: visionResult.content,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error identifying object:", error);
      setStatus("idle");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: COLORS.bgPage }}
    >
      {/* Header with status */}
      <div
        className="p-4 flex items-center justify-between border-b flex-shrink-0"
        style={{ borderColor: COLORS.border }}
      >
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: COLORS.textPrimary }}
          >
            VisionMate
          </h1>
          <StatusIndicator status={status} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/history")}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{
              color: COLORS.primary,
              backgroundColor: COLORS.primary + "10",
            }}
            title="History"
            aria-label="View history"
          >
            🕐
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{
              color: COLORS.primary,
              backgroundColor: COLORS.primary + "10",
            }}
            title="Settings"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Camera Preview - Takes up most of the space */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: COLORS.bgSurface }}
      >
        <MockCamera isActive={true} />
      </div>

      {/* Mode Selector */}
      <div
        className="p-4 flex gap-2 border-t flex-shrink-0"
        style={{ borderColor: COLORS.border }}
      >
        {(["scene", "text", "object"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
              mode === m ? "scale-105" : "opacity-60"
            }`}
            style={{
              backgroundColor: mode === m ? COLORS.primary : COLORS.bgElevated,
              color:
                mode === m ? "white" : COLORS.textSecondary,
            }}
          >
            {m === "scene"
              ? "📍 Scene"
              : m === "text"
                ? "📖 Text"
                : "🎯 Object"}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3 flex-shrink-0 max-h-48 overflow-y-auto">
        {mode === "scene" && (
          <Button
            size="lg"
            variant="primary"
            onClick={handleDescribe}
            isLoading={isProcessing}
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Describing..." : "Describe Scene"}
          </Button>
        )}

        {mode === "text" && (
          <Button
            size="lg"
            variant="primary"
            onClick={handleReadText}
            isLoading={isProcessing}
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Reading..." : "Read Text"}
          </Button>
        )}

        {mode === "object" && (
          <Button
            size="lg"
            variant="primary"
            onClick={handleIdentify}
            isLoading={isProcessing}
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Identifying..." : "What Am I Holding?"}
          </Button>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div
          className="p-6 border-t"
          style={{ borderColor: COLORS.border }}
        >
          <Card variant="elevated">
            <div className="space-y-4">
              <h3
                className="font-semibold text-lg"
                style={{ color: COLORS.textPrimary }}
              >
                {result.type === "scene"
                  ? "Scene Description"
                  : result.type === "text"
                    ? "Extracted Text"
                    : "Object Identified"}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: COLORS.textSecondary }}
              >
                {resultText}
              </p>
              {result.confidence && (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: COLORS.textMuted }}
                >
                  <span>Confidence: {Math.round(result.confidence * 100)}%</span>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setResult(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="tertiary"
                  className="flex-1"
                  title="Copy result"
                >
                  📋
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
