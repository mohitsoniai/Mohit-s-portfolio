"use client";

import React from "react";
import GlassCard from "../ui/glass-card";
import { GitPullRequest, Star, GitFork, BookOpen, BarChart3 } from "lucide-react";

export default function GitHubSection() {
  // Mock contribution graph - grid of 7 rows x 24 columns for a clean card visual
  const rows = 7;
  const cols = 36;
  const contributionGrid: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => {
      const rand = Math.random();
      if (rand < 0.4) return 0; // zero commits
      if (rand < 0.7) return 1; // 1-2 commits
      if (rand < 0.9) return 2; // 3-4 commits
      return 3; // 5+ commits
    })
  );

  const getColColor = (val: number) => {
    switch (val) {
      case 1: return "bg-emerald-950 border-emerald-900";
      case 2: return "bg-emerald-700 border-emerald-600";
      case 3: return "bg-accent border-accent/80"; // Glowing cyan accent
      default: return "bg-white/[0.02] border-white/5";
    }
  };

  const pinnedRepos = [
    {
      name: "wise-phishing-detection",
      desc: "AI-powered browser extension built with FastAPI, Gemini, and Groq to detect phishing vectors in real-time.",
      lang: "Python",
      langColor: "bg-[#3572A5]",
      stars: 42,
      forks: 11,
    },
    {
      name: "azure-iac-terraform",
      desc: "Declarative infrastructure as code templates mapping VNet, AKS, Key Vault, and Application Insights routing topologies.",
      lang: "HCL / Terraform",
      langColor: "bg-[#7B42BC]",
      stars: 68,
      forks: 18,
    },
  ];

  return (
    <section
      id="github"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Open Source
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          GitHub telemetry & metrics
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: Stats and Repos */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Pinned Repos Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {pinnedRepos.map((repo) => (
              <GlassCard key={repo.name} glowColor="rgba(0, 229, 255, 0.08)" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-3 text-accent">
                    <BookOpen className="h-4 w-4" />
                    <a
                      href="https://github.com/mohitsoniai"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-white hover:text-accent tracking-wide uppercase transition-colors"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex items-center space-x-1">
                    <span className={`h-2.5 w-2.5 rounded-full ${repo.langColor}`} />
                    <span className="text-[10px] text-gray-500 font-semibold">{repo.lang}</span>
                  </div>
                  <div className="flex space-x-3 text-gray-500">
                    <span className="flex items-center gap-0.5 text-[10px]">
                      <Star className="h-3 w-3 text-yellow-500/80" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px]">
                      <GitFork className="h-3 w-3" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Custom Contribution Graph */}
          <GlassCard glowColor="rgba(139, 92, 246, 0.08)">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Contribution activity (last 12 months)
              </span>
              <span className="text-[10px] text-gray-500 font-semibold">
                842 contributions
              </span>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <div className="min-w-[620px] flex flex-col gap-[3px]">
                {contributionGrid.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-[3px]">
                    {row.map((val, cIdx) => (
                      <div
                        key={cIdx}
                        className={`h-[11px] w-[11px] rounded-[2px] border ${getColColor(val)} transition-all duration-300 hover:scale-125`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-[9px] text-gray-600 font-semibold">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
              <div className="flex items-center gap-1.5 ml-auto">
                <span>Less</span>
                <span className="h-2.5 w-2.5 rounded-[1px] bg-white/[0.02] border border-white/5" />
                <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-950 border-emerald-900" />
                <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-700 border-emerald-600" />
                <span className="h-2.5 w-2.5 rounded-[1px] bg-accent border-accent/80" />
                <span>More</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Language and commit statistics summary */}
        <div className="lg:col-span-4">
          <GlassCard glowColor="rgba(37, 99, 235, 0.08)" className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Telemetry Metrics
                </h4>
              </div>

              <div className="space-y-4">
                {/* Python */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-gray-300 mb-1">
                    <span>Python</span>
                    <span>45%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3572A5] rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>

                {/* TypeScript */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-gray-300 mb-1">
                    <span>TypeScript / React</span>
                    <span>30%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>

                {/* Terraform */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-gray-300 mb-1">
                    <span>HCL / Terraform</span>
                    <span>15%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7B42BC] rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>

                {/* Bash / Shell */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-gray-300 mb-1">
                    <span>Bash / Shell</span>
                    <span>10%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "10%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-6 grid grid-cols-2 gap-4">
              <div className="bg-white/[0.01] border border-white/5 p-3 rounded-2xl text-center">
                <span className="text-xl font-black text-white">420+</span>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">Commits</p>
              </div>
              <div className="bg-white/[0.01] border border-white/5 p-3 rounded-2xl text-center">
                <span className="text-xl font-black text-accent flex justify-center items-center gap-0.5">
                  <GitPullRequest className="h-4 w-4" /> 45
                </span>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">PRs Merged</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
