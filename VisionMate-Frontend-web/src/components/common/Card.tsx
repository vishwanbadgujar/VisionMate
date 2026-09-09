import React from "react";
import { COLORS } from "@/theme/colors";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "elevated" | "outlined";
}

export default function Card({
  children,
  variant = "elevated",
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "rounded-[16px] p-6 transition-all duration-200";

  const variantStyles = {
    elevated: `bg-[${COLORS.bgElevated}] shadow-lg`,
    outlined: `bg-[${COLORS.bgSurface}] border-2 border-[${COLORS.border}]`,
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
