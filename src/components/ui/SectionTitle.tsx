import React from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered,
  light,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`block text-sm font-poppins font-medium tracking-widest uppercase mb-3 ${
            light ? "text-[#D2B09F]" : "text-[#D2B09F]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-cormorant font-bold leading-tight ${
          light ? "text-white" : "text-[#7A2F2F]"
        }`}
        style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-poppins leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-[#F4EBE2]" : "text-[#6B6B6B]"}`}
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
