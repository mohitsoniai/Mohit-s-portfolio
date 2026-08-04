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
            {title === "WADE" && <ShieldAlert className="h-4 w-4 text-accent animate-pulse" />}
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
        {/* Project 1: WADE */}
        <ProjectCard
          title="WADE"
          description="Web AI Defense Engine - Next-generation browser defense system powered by Generative AI and Computer Vision to block phishing."
          tags={["Python", "FastAPI", "Gemini AI", "Chrome Extension", "VirusTotal API"]}
          githubUrl="https://github.com/mohitsoniai/WADE-AI-Defense"
          liveUrl="#"
          glowColor="rgba(0, 229, 255, 0.15)"
        >
          {/* WADE Mockup UI */}
          <div className="w-[90%] max-w-[280px] bg-gray-900 border border-white/10 rounded-xl p-4 shadow-xl text-left select-none">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WADE Scan Panel</span>
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

        {/* Project 2: AURA */}
        <ProjectCard
          title="AURA"
          description="A premium full-stack E-Commerce SaaS application featuring real-time checkout animations, order trackers, and analytics dashboard."
          tags={["React", "TypeScript", "NestJS", "Prisma", "PostgreSQL"]}
          githubUrl="https://github.com/mohitsoniai/AURA"
          liveUrl="#"
          glowColor="rgba(139, 92, 246, 0.15)"
        >
          {/* AURA Premium E-Commerce Mockup UI */}
          <div className="w-[90%] max-w-[280px] bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-white/10 rounded-xl p-4 shadow-xl text-left select-none backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">AURA SaaS Checkout</span>
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            </div>
            
            <div className="space-y-3">
              {/* Credit Card Graphic */}
              <div className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2.5 shadow-md text-white">
                <div className="flex justify-between items-start">
                  <div className="text-[7px] uppercase tracking-wider opacity-80">Premium Member</div>
                  <span className="text-[8px] font-extrabold tracking-widest">AURA</span>
                </div>
                <div className="mt-2 text-xs font-mono tracking-widest">•••• •••• •••• 4820</div>
                <div className="mt-1 flex justify-between items-center text-[7px]">
                  <span className="opacity-80">MOHIT SWARNKAR</span>
                  <span className="opacity-85">12/29</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[9px] text-gray-300">
                <span>Total Amount:</span>
                <span className="font-bold text-white">$1,299.00</span>
              </div>
            </div>
          </div>
        </ProjectCard>

        {/* Project 3: TaskFlow Pro */}
        <ProjectCard
          title="TaskFlow Pro"
          description="Enterprise-grade full-stack project management SaaS platform featuring Kanban boards, monthly calendars, and real-time Socket.IO."
          tags={["Next.js", "Express.js", "MongoDB", "Socket.IO", "Zustand", "Framer Motion"]}
          githubUrl="https://github.com/mohitsoniai/TaskFlow-Pro"
          liveUrl="#"
          glowColor="rgba(37, 99, 235, 0.15)"
        >
          {/* TaskFlow Pro Mockup UI */}
          <div className="w-[90%] max-w-[280px] bg-gray-900 border border-white/10 rounded-xl p-4 shadow-xl text-left select-none">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TaskFlow Sprint</span>
              <div className="flex space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
            </div>
            
            <div className="space-y-2.5">
              {/* Kanban Column */}
              <div className="space-y-1.5">
                <div className="text-[9px] text-gray-500 font-bold uppercase">In Progress (2)</div>
                <div className="rounded bg-white/5 border border-white/10 p-2 flex flex-col gap-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold text-white">Database Indexing</span>
                    <span className="rounded bg-red-500/10 text-red-400 px-1 py-0.5 text-[7px] font-bold">High</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-3/4" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[9px] border-t border-white/5 pt-2">
                <span className="text-gray-400">Socket Connections:</span>
                <span className="text-green-400 font-bold flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1 animate-pulse" /> Active
                </span>
              </div>
            </div>
          </div>
        </ProjectCard>
      </div>
    </section>
  );
}
