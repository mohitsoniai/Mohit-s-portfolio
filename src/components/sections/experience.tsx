"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { Calendar, MapPin, Briefcase } from "lucide-react";

interface TimelineItemProps {
  role: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
  skills: string[];
  glowColor: string;
}

function TimelineItem({
  role,
  company,
  location,
  duration,
  points,
  skills,
  glowColor,
}: TimelineItemProps) {
  return (
    <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 md:gap-8">
      {/* Left Spacer / Dot indicator on mobile / Right align text on desktop */}
      <div className="hidden md:flex md:col-span-5 flex-col md:items-end justify-start pt-1 text-right">
        <span className="inline-flex items-center space-x-1 text-xs text-accent font-bold uppercase tracking-wider bg-accent/5 border border-accent/20 px-3 py-1 rounded-full">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          {duration}
        </span>
        <span className="flex items-center text-xs text-gray-500 mt-2 font-medium">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          {location}
        </span>
      </div>

      {/* Timeline Node Dot */}
      <div className="absolute left-0 top-1.5 md:left-1/2 md:-translate-x-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-gray-950 shadow-md shadow-accent/50">
        <Briefcase className="h-3 w-3 text-accent" />
      </div>

      {/* Right Content Card */}
      <div className="md:col-span-7 pb-12">
        {/* Mobile Date Header */}
        <div className="flex flex-col mb-3 md:hidden">
          <span className="inline-flex w-fit items-center space-x-1 text-xs text-accent font-bold uppercase tracking-wider bg-accent/5 border border-accent/20 px-3 py-1 rounded-full">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            {duration}
          </span>
          <span className="flex items-center text-xs text-gray-500 mt-1.5">
            <MapPin className="mr-1 h-3 w-3" />
            {location}
          </span>
        </div>

        <GlassCard glowColor={glowColor}>
          <h4 className="font-display text-lg font-bold text-white tracking-wide">
            {role}
          </h4>
          <p className="text-sm font-semibold text-primary mt-1">
            {company}
          </p>

          <ul className="mt-4 space-y-2 text-xs text-gray-300 leading-relaxed list-disc list-inside">
            {points.map((pt, index) => (
              <li key={index} className="pl-1">
                <span className="text-gray-300">{pt}</span>
              </li>
            ))}
          </ul>

          {/* Skill Badges */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold text-gray-400 hover:text-white hover:border-accent/40 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position to animate timeline progress bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const timelineData = [
    {
      role: "Cloud & DevOps Engineer",
      company: "Parul University",
      location: "Vadodara, Gujarat, India",
      duration: "2024 - Present",
      points: [
        "Orchestrated Kubernetes clusters (AKS) to host high-traffic educational portals, securing container runtime configurations and achieving 99.9% application availability.",
        "Engineered end-to-end CI/CD pipelines via GitHub Actions and Azure DevOps to automate multi-stage linting, vulnerability scanning, and package deployment.",
        "Implemented Infrastructure-as-Code (IaC) architectures with modular Terraform definitions to deploy VNets, Key Vault secrets, and Cosmos DB instances.",
        "Hardened cluster workloads by integrating Entra ID (Azure AD) with RBAC (Role-Based Access Control) policies and Zero Trust credentials management.",
        "Established full-stack observability with Azure Monitor and Application Insights to query metrics, trace queries, and configure notification alerts."
      ],
      skills: ["Azure", "Kubernetes", "AKS", "Docker", "Terraform", "GitHub Actions", "Azure DevOps", "Zero Trust", "Azure Monitor"],
      glowColor: "rgba(0, 229, 255, 0.12)",
    },
    {
      role: "Full Stack Developer & AI Associate",
      company: "Parul University (R&D Labs)",
      location: "Vadodara, Gujarat, India",
      duration: "2023 - 2024",
      points: [
        "Developed and maintained next-generation web interfaces using Next.js, React, and TypeScript.",
        "Built fast web APIs in Python/FastAPI integrating large language model SDKs (Gemini, Groq) to carry out semantic audits and automated text generation.",
        "Containerized Python backend services and configured Nginx reverse proxies, shrinking request overhead by 25%.",
        "Assisted in configuring automated unit testing hooks and Docker registry builds, reducing deployment error rates."
      ],
      skills: ["React", "Next.js", "Python", "FastAPI", "Gemini AI", "Docker", "Node.js", "TypeScript"],
      glowColor: "rgba(139, 92, 246, 0.12)",
    },
  ];

  return (
    <section
      id="experience"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-20 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Timeline
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Professional Experience
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
        {/* Vertical Progress Line (Desktop) */}
        <div className="absolute left-[11px] md:left-1/2 top-2 bottom-6 h-full w-[2px] -translate-x-1/2 bg-white/5">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="h-full w-full bg-gradient-to-b from-accent via-primary to-secondary"
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
