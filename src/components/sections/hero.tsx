"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useSoundEffects } from "@/hooks/use-sound-effects";

// Load 3D Globe dynamically to avoid SSR hydration issues
const Globe3D = dynamic(() => import("../ui/globe-3d"), { ssr: false });

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const { playHover, playClick } = useSoundEffects();

  const titles = [
    "Azure Cloud Engineer",
    "DevOps Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Cloud Architect",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [titles.length]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 md:px-12 lg:px-24"
    >
      <div className="z-10 grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-8">
        
        {/* Left Content */}
        <div className="flex flex-col space-y-6 lg:col-span-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center space-x-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-accent"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">Open to Opportunities</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                Mohit Soni
              </span>
            </motion.h1>

            {/* Rotating Titles */}
            <div className="h-[40px] sm:h-[48px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-xl font-bold tracking-wide text-gray-300 sm:text-2xl md:text-3xl"
                >
                  {titles[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-sm leading-relaxed text-gray-400 sm:text-base"
          >
            Architecting secure cloud environments, writing declarative DevOps automations, and engineering full-stack platforms with embedded artificial intelligence.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#"
              onMouseEnter={playHover}
              onClick={() => playClick()}
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>

            <a
              href="#projects"
              onMouseEnter={playHover}
              onClick={handleScrollToProjects}
              className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-accent transition-all"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="flex space-x-2 mt-1 sm:mt-0">
              <a
                href="https://github.com/mohitsoniai"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={() => playClick()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:border-accent hover:text-accent transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com/in/mohitswarnkar"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={() => playClick()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:border-accent hover:text-accent transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center lg:col-span-5"
        >
          <Globe3D />
        </motion.div>
      </div>

      {/* Downward scrolling visual indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5 opacity-60">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll Down</span>
        <div className="h-9 w-5 rounded-full border-2 border-gray-600 p-1 flex justify-center">
          <motion.div 
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-2 w-1.5 rounded-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
}
