import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "beige" | "pink" | "white" | "burgundy";
}

const backgrounds = {
  beige: "bg-[#FAF7F2]",
  pink: "bg-[#F4EBE2]",
  white: "bg-white",
  burgundy: "bg-[#7A2F2F]",
};

export function SectionWrapper({
  children,
  className = "",
  id,
  background = "beige",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 overflow-hidden ${backgrounds[background]} ${className}`}
    >
      {children}
    </section>
  );
}
