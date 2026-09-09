import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { COLORS } from "@/theme/colors";
import { loadHistory, deleteHistoryItem, clearHistory } from "@/services/historyService";
import { HistoryItem } from "@/types/app";

export default function History() {
  const navigate = useNavigate();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setItems(loadHistory());
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      clearHistory();
      setItems([]);
    }
  };

  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.bgPage }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b"
        style={{ borderColor: COLORS.border }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-lg hover:bg-opacity-10"
            style={{
              color: COLORS.primary,
              backgroundColor: COLORS.primary + "10",
            }}
            title="Back"
            aria-label="Go back"
          >
            ←
          </button>
          <h1
            className="text-2xl font-bold"
            style={{ color: COLORS.textPrimary }}
          >
            History
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {items.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="text-6xl mb-4">📭</div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.textPrimary }}
            >
              Nothing yet
            </h2>
            <p
              className="text-center text-sm mb-6"
              style={{ color: COLORS.textSecondary }}
            >
              Try describing a scene, reading text, or identifying an object to
              start building your history.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate("/home")}
            >
              Go to Home
            </Button>
          </div>
        ) : (
          // History List
          <div className="space-y-3 pb-6">
            {items.map((item) => (
              <Card
                key={item.id}
                variant={selectedId === item.id ? "outlined" : "elevated"}
                className={`cursor-pointer transition-all ${
                  selectedId === item.id ? "ring-2" : ""
                }`}
                style={
                  selectedId === item.id
                    ? { outlineColor: COLORS.primary }
                    : {}
                }
                onClick={() =>
                  setSelectedId(
                    selectedId === item.id ? null : item.id
                  )
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">
                        {item.type === "describe"
                          ? "📍"
                          : item.type === "read"
                            ? "📖"
                            : item.type === "identify"
                              ? "🎯"
                              : "🎤"}
                      </span>
                      <span
                        className="font-semibold capitalize"
                        style={{ color: COLORS.textPrimary }}
                      >
                        {item.type}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: COLORS.textMuted }}
                      >
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedId === item.id && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.border }}>
                    <p
                      className="text-sm mb-3 leading-relaxed"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {item.content}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(item.content);
                        }}
                        title="Copy"
                      >
                        📋 Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="tertiary"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        title="Delete"
                      >
                        🗑️ Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {items.length > 0 && (
        <div
          className="p-4 border-t"
          style={{ borderColor: COLORS.border }}
        >
          <Button
            size="lg"
            variant="secondary"
            onClick={handleClearAll}
            className="w-full"
            style={{ color: COLORS.error }}
          >
            Clear All History
          </Button>
        </div>
      )}
    </div>
  );
}
