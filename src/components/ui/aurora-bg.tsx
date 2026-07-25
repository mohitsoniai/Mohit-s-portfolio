"use client";

import React from "react";

export default function AuroraBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]">
      {/* Aurora glow blobs */}
      <div 
        className="absolute -top-[30%] -left-[20%] h-[80%] w-[80%] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-[140px] animate-pulse"
        style={{
          animationDuration: "15s",
        }}
      />
      <div 
        className="absolute -top-[10%] -right-[10%] h-[70%] w-[70%] rounded-full bg-gradient-to-bl from-secondary/15 to-primary/15 blur-[160px] animate-pulse"
        style={{
          animationDuration: "20s",
          animationDelay: "3s",
        }}
      />
      <div 
        className="absolute top-[40%] left-[10%] h-[60%] w-[60%] rounded-full bg-gradient-to-tr from-accent/10 to-secondary/10 blur-[130px] animate-pulse"
        style={{
          animationDuration: "18s",
          animationDelay: "1s",
        }}
      />
      <div 
        className="absolute -bottom-[20%] right-[10%] h-[70%] w-[70%] rounded-full bg-gradient-to-t from-primary/10 to-accent/10 blur-[150px] animate-pulse"
        style={{
          animationDuration: "25s",
          animationDelay: "5s",
        }}
      />

      {/* Grid overlay for a tech aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px, 32px 32px, 32px 32px",
        }}
      />
    </div>
  );
}
