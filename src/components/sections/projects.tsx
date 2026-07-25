"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldAlert, Sparkles, TrendingUp, Smartphone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  glowColor: string;
  children: React.ReactNode; // UI Mockup inside card
}

function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  glowColor,
  children,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    // Set max tilt to 12 degrees
    setTilt({
      x: -mouseY * 12,
      y: mouseX * 12,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl border border-white/5 bg-gray-950/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-black/50"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? "none" : "transform 0.5s ease, border-color 0.3s ease",
      }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at 50% 50%, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Mockup Preview Area */}
        <div className="relative w-full h-[220px] rounded-2xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center mb-6">
          {children}
        </div>

        {/* Info */}
        <div>
          <h4 className="font-display text-xl font-bold text-white tracking-wide flex items-center gap-2">
            {title}
            {title === "WISE" && <ShieldAlert className="h-4 w-4 text-accent animate-pulse" />}
          </h4>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed h-[60px] overflow-hidden">
            {description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5 h-[65px] overflow-hidden">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClick()}
            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 hover:border-accent transition-all"
          >
            <FaGithub className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClick()}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:scale-105 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Work
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Featured Engineering Projects
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Project 1: WISE */}
        <ProjectCard
          title="WISE"
          description="AI-powered Chrome extension designed to scan login gateways and audit URL anomalies for automated phishing defense."
          tags={["Python", "FastAPI", "Gemini AI", "Chrome Extension", "VirusTotal API"]}
          githubUrl="https://github.com/mohitswarnkar"
          liveUrl="#"
          glowColor="rgba(0, 229, 255, 0.15)"
        >
          {/* WISE Mockup UI */}
          <div className="w-[90%] max-w-[280px] bg-gray-900 border border-white/10 rounded-xl p-4 shadow-xl text-left select-none">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WISE Scan Panel</span>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <div className="space-y-2">
              <div className="rounded bg-red-950/30 border border-red-500/20 p-2.5 flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 text-red-500 flex-shrink-0" />
                <div>
                  <h5 className="text-[10px] font-bold text-white">Threat Alert</h5>
                  <p className="text-[8px] text-gray-400">Suspicious sign-in portal detected</p>
                </div>
              </div>
              <div className="text-[9px] text-gray-400 bg-white/5 rounded p-2 space-y-1">
                <div className="flex justify-between"><span>Gemini Trust Index:</span><span className="text-red-400 font-bold">12%</span></div>
                <div className="flex justify-between"><span>VirusTotal Flags:</span><span className="text-red-400 font-bold">8 / 74</span></div>
              </div>
            </div>
          </div>
        </ProjectCard>

        {/* Project 2: AI Mental Health Dashboard */}
        <ProjectCard
          title="AI Mental Health Dashboard"
          description="Mental health monitoring system using Azure AI Language cognitive APIs to process sentiment logs and render emotion analytics."
          tags={["Azure AI", "Python", "React", "NLP", "Cognitive Services"]}
          githubUrl="https://github.com/mohitswarnkar"
          liveUrl="#"
          glowColor="rgba(139, 92, 246, 0.15)"
        >
          {/* AI Mental Health Dashboard Mockup UI */}
          <div className="w-[90%] max-w-[280px] bg-gray-900 border border-white/10 rounded-xl p-4 shadow-xl text-left select-none">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sentiment Telemetry</span>
              <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
            </div>
            
            <div className="space-y-3">
              {/* Pulsing sentiment line */}
              <div className="h-16 flex items-end justify-between px-2 gap-1 border-b border-white/5 pb-1">
                <div className="w-4 bg-primary/20 h-[30%] rounded-t" />
                <div className="w-4 bg-accent/40 h-[60%] rounded-t" />
                <div className="w-4 bg-secondary h-[85%] rounded-t animate-pulse" />
                <div className="w-4 bg-primary/30 h-[45%] rounded-t" />
                <div className="w-4 bg-accent/50 h-[70%] rounded-t" />
              </div>
              
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-gray-400">Emotion Trend:</span>
                <span className="font-bold text-accent">92% positive</span>
              </div>
            </div>
          </div>
        </ProjectCard>

        {/* Project 3: Gold & Silver Tracking App */}
        <ProjectCard
          title="Gold & Silver Tracker"
          description="Finance tracking application supporting real-time metal cost indexes, portfolio valuations, and interactive price-spread metrics."
          tags={["React Native", "Figma Design", "Tailwind CSS", "Market API"]}
          githubUrl="https://github.com/mohitswarnkar"
          liveUrl="#"
          glowColor="rgba(37, 99, 235, 0.15)"
        >
          {/* Gold & Silver Phone Mockup UI */}
          <div className="relative w-[130px] h-[200px] bg-black border-4 border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-3 select-none">
            {/* Camera notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-gray-800" />
            
            <div className="mt-4">
              <div className="flex items-center justify-between text-[9px] text-gray-400">
                <span>Gold Price</span>
                <span className="text-green-400 flex items-center"><TrendingUp className="h-2 w-2 mr-0.5" />+1.4%</span>
              </div>
              <h5 className="text-xs font-extrabold text-white mt-0.5">$2,420.50<span className="text-[8px] text-gray-500 font-normal">/oz</span></h5>
            </div>

            {/* Micro Chart SVG */}
            <svg viewBox="0 0 100 50" className="w-full h-16 mt-2 overflow-visible">
              <path
                d="M0,45 Q15,42 30,25 T60,30 T90,5 L100,20"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2"
                className="animate-pulse"
              />
              <path
                d="M0,45 Q15,42 30,25 T60,30 T90,5 L100,20 L100,50 L0,50 Z"
                fill="url(#grad)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="border-t border-white/5 pt-2 flex justify-between items-center mt-2">
              <Smartphone className="h-3 w-3 text-accent" />
              <span className="text-[8px] text-gray-500">Live Telemetry</span>
            </div>
          </div>
        </ProjectCard>
      </div>
    </section>
  );
}
