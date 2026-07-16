"use client";

import React from "react";
import Link from "next/link";
import { handleHashLinkClick } from "@/lib/scrollToHash";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#7A2F2F] text-white hover:bg-[#5c2020] shadow-[0_4px_24px_rgba(122,47,47,0.3)] hover:shadow-[0_8px_32px_rgba(122,47,47,0.4)]",
  secondary:
    "bg-[#F4EBE2] text-[#7A2F2F] hover:bg-[#e8d4c8] border border-[#D2B09F]",
  outline:
    "bg-transparent text-[#7A2F2F] border-2 border-[#7A2F2F] hover:bg-[#7A2F2F] hover:text-white",
  ghost:
    "bg-transparent text-[#7A2F2F] hover:bg-[#F4EBE2]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  loading,
  icon,
  iconPosition = "left",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-poppins font-medium transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A2F2F] focus-visible:ring-offset-2";
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled || loading ? "opacity-60 cursor-not-allowed" : ""
  } ${className}`;

  const content = (
    <>
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && iconPosition === "left" && icon
      )}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={(e) => handleHashLinkClick(e, href)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
