"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowLeft, RefreshCw } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export default function NotFound() {
  const { playHover, playClick } = useSoundEffects();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#030712] text-white p-6">
      
      {/* Aurora glow overlay */}
      <div className="absolute top-[30%] left-[30%] h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[30%] h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <div className="z-10 text-center max-w-md">
        
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-accent mb-6"
        >
          <Compass className="h-10 w-10" />
        </motion.div>

        {/* 404 Header */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary glow-text"
        >
          404
        </motion.h1>

        <h2 className="font-display text-lg font-bold text-white uppercase tracking-wider mt-4">
          Telemetry Link Severed
        </h2>
        
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          The routing path you requested does not exist in our active DNS or cloud load balancers. Verify your destination path.
        </p>

        {/* Return Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            onMouseEnter={playHover}
            onClick={() => playClick()}
            className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Gateway</span>
          </Link>
        </div>
      </div>

      {/* Grid background matching layouts */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
