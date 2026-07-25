"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { Cloud, Cog, Terminal, BrainCircuit, ShieldAlert, GitBranch } from "lucide-react";

interface Skill {
  name: string;
  glow: string; // custom glow color
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("cloud");

  const categories = [
    { id: "cloud", label: "Cloud", icon: Cloud },
    { id: "devops", label: "DevOps", icon: Cog },
    { id: "programming", label: "Programming", icon: Terminal },
    { id: "ai", label: "Artificial Intelligence", icon: BrainCircuit },
    { id: "security", label: "Security", icon: ShieldAlert },
    { id: "tools", label: "Git & Tools", icon: GitBranch },
  ];

  const skillsData: Record<string, Skill[]> = {
    cloud: [
      { name: "Azure", glow: "rgba(0, 120, 212, 0.4)" },
      { name: "AKS (Azure Kubernetes)", glow: "rgba(50, 108, 229, 0.4)" },
      { name: "Azure SQL", glow: "rgba(0, 120, 212, 0.3)" },
      { name: "Cosmos DB", glow: "rgba(139, 92, 246, 0.4)" },
      { name: "App Service", glow: "rgba(0, 229, 255, 0.4)" },
      { name: "Key Vault", glow: "rgba(235, 95, 37, 0.4)" },
      { name: "VNet & Networking", glow: "rgba(37, 99, 235, 0.4)" },
      { name: "NSG (Security Groups)", glow: "rgba(220, 38, 38, 0.4)" },
      { name: "Azure Monitor", glow: "rgba(0, 229, 255, 0.3)" },
    ],
    devops: [
      { name: "Docker", glow: "rgba(36, 150, 237, 0.4)" },
      { name: "GitHub Actions", glow: "rgba(255, 255, 255, 0.25)" },
      { name: "Azure DevOps", glow: "rgba(0, 120, 212, 0.4)" },
      { name: "Terraform", glow: "rgba(132, 73, 229, 0.4)" },
      { name: "Kubernetes", glow: "rgba(50, 108, 229, 0.4)" },
      { name: "Microservices", glow: "rgba(0, 229, 255, 0.3)" },
    ],
    programming: [
      { name: "Python", glow: "rgba(55, 118, 171, 0.4)" },
      { name: "JavaScript", glow: "rgba(247, 223, 30, 0.3)" },
      { name: "TypeScript", glow: "rgba(49, 120, 198, 0.4)" },
      { name: "C++", glow: "rgba(0, 89, 156, 0.4)" },
      { name: "Node.js", glow: "rgba(104, 188, 59, 0.3)" },
      { name: "React / React Native", glow: "rgba(97, 218, 251, 0.4)" },
      { name: "Next.js", glow: "rgba(255, 255, 255, 0.25)" },
      { name: "FastAPI", glow: "rgba(5, 153, 137, 0.4)" },
    ],
    ai: [
      { name: "Azure AI", glow: "rgba(0, 229, 255, 0.4)" },
      { name: "Gemini AI", glow: "rgba(37, 99, 235, 0.4)" },
      { name: "Groq", glow: "rgba(245, 158, 11, 0.4)" },
      { name: "NLP (Natural Language)", glow: "rgba(139, 92, 246, 0.4)" },
      { name: "Power BI", glow: "rgba(242, 197, 17, 0.4)" },
    ],
    security: [
      { name: "Zero Trust", glow: "rgba(220, 38, 38, 0.4)" },
      { name: "Entra ID (Azure AD)", glow: "rgba(0, 120, 212, 0.4)" },
      { name: "IAM & Access Control", glow: "rgba(245, 158, 11, 0.3)" },
      { name: "RBAC (Role Based)", glow: "rgba(139, 92, 246, 0.4)" },
      { name: "Conditional Access", glow: "rgba(37, 99, 235, 0.4)" },
      { name: "Defender for Cloud", glow: "rgba(220, 38, 38, 0.3)" },
    ],
    tools: [
      { name: "Git", glow: "rgba(240, 80, 50, 0.4)" },
      { name: "GitHub", glow: "rgba(255, 255, 255, 0.2)" },
      { name: "VS Code", glow: "rgba(0, 122, 204, 0.4)" },
      { name: "Figma", glow: "rgba(242, 78, 30, 0.4)" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="skills"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Competences
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Tech Stack & Capabilities
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      {/* Categories Tab Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide uppercase border transition-all duration-300 ${
                isActive
                  ? "border-accent bg-accent/10 text-accent shadow-md shadow-accent/10"
                  : "border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {skillsData[activeCategory].map((skill) => (
            <motion.div key={skill.name} variants={itemVariants} layout>
              <GlassCard
                className="flex h-24 items-center justify-center text-center p-3"
                glowColor={skill.glow}
              >
                <p className="font-display text-xs font-bold tracking-wider uppercase text-white">
                  {skill.name}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
