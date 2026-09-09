import React from "react";
import { COLORS } from "@/theme/colors";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-[12px] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  };

  const variantStyles = {
    primary: `bg-[${COLORS.primary}] text-white hover:opacity-90 active:scale-95 focus:ring-offset-[${COLORS.bgPage}]`,
    secondary: `bg-[${COLORS.bgElevated}] text-[${COLORS.textPrimary}] border-2 border-[${COLORS.border}] hover:bg-[${COLORS.bgSurface}] active:scale-95`,
    tertiary: `bg-transparent text-[${COLORS.primary}] hover:bg-[${COLORS.bgElevated}] active:scale-95`,
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
