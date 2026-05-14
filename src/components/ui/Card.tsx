import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, className = "", hover, padding = "md" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-[0_8px_40px_rgba(122,47,47,0.08)] ${paddings[padding]} ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(122,47,47,0.14)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
