import { useEffect, useRef } from "react";
import { COLORS } from "@/theme/colors";

interface MockCameraProps {
  isActive?: boolean;
}

export default function MockCamera({ isActive = true }: MockCameraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps

      // Clear canvas
      ctx.fillStyle = COLORS.bgSurface;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, COLORS.primary + "30");
      gradient.addColorStop(1, COLORS.bgSurface);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated grid
      ctx.strokeStyle = COLORS.primary + "40";
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw focus reticle (animated circle in center)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 40 + Math.sin(time * 2) * 8;

      ctx.strokeStyle = COLORS.primary + "80";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw cross in center
      ctx.strokeStyle = COLORS.primary + "60";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY);
      ctx.lineTo(centerX + 20, centerY);
      ctx.moveTo(centerX, centerY - 20);
      ctx.lineTo(centerX, centerY + 20);
      ctx.stroke();

      // Draw pulsing corner markers
      const pulse = 0.5 + Math.sin(time * 1.5) * 0.5;
      const markerSize = 20;
      const markerColor = COLORS.teal + Math.floor(pulse * 255).toString(16);

      const corners = [
        [20, 20],
        [canvas.width - 20, 20],
        [20, canvas.height - 20],
        [canvas.width - 20, canvas.height - 20],
      ];

      ctx.strokeStyle = markerColor;
      ctx.lineWidth = 2;
      corners.forEach(([x, y]) => {
        ctx.strokeRect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <div className="w-full h-full relative bg-black rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          maxHeight: "100vh",
        }}
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: COLORS.textSecondary }}
          >
            📷 Camera Preview (Web Prototype)
          </p>
          <p
            className="text-xs"
            style={{ color: COLORS.textMuted }}
          >
            On a real device, live camera feed will appear here
          </p>
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 backdrop-blur-sm border-t"
        style={{ borderColor: COLORS.border }}
      >
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: COLORS.textMuted }}>
            🎥 Ready
          </span>
          <span
            style={{ color: COLORS.primary }}
          >
            Point to capture
          </span>
        </div>
      </div>
    </div>
  );
}
