// src/components/ui/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // Add other props if needed, like variants for motion
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`glass-card
                 w-full
                 rounded-2xl
                 border border-white/15
                 bg-white/5
                 backdrop-blur-xl
                 shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                 relative
                 overflow-hidden
                 ${className}`}
    >
      {/* Shine / نور ملایم */}
      <div
        className="pointer-events-none absolute inset-0
                      bg-[radial-gradient(500px_circle_at_20%_0%,rgba(120,119,198,0.35),transparent_40%)]
                      opacity-70"
      />
      <div
        className="pointer-events-none absolute inset-0
                      bg-[radial-gradient(500px_circle_at_80%_100%,rgba(34,211,238,0.18),transparent_45%)]
                      opacity-60"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;
