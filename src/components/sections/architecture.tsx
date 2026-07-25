"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { 
  Users, 
  Layers, 
  Cpu, 
  Server, 
  Network, 
  Database, 
  FlameKindling, 
  KeyRound, 
  Eye, 
  Activity, 
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface ArchNode {
  id: string;
  name: string;
  category: "Client" | "Compute" | "Database" | "Security" | "Monitor";
  description: string;
  icon: React.ReactNode;
  connections: string[]; // connects to other node IDs
}

export default function Architecture() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: ArchNode[] = [
    {
      id: "user",
      name: "User / Browser",
      category: "Client",
      description: "End-user initiating requests via browser or client application.",
      icon: <Users className="h-5 w-5 text-accent" />,
      connections: ["react"],
    },
    {
      id: "react",
      name: "React (Frontend)",
      category: "Client",
      description: "SPA client codebase containing visual interface layers.",
      icon: <Layers className="h-5 w-5 text-accent" />,
      connections: ["appservice"],
    },
    {
      id: "appservice",
      name: "Azure App Service",
      category: "Compute",
      description: "Hosts web app components and APIs securely with auto-scaling.",
      icon: <Server className="h-5 w-5 text-primary" />,
      connections: ["aks"],
    },
    {
      id: "aks",
      name: "AKS (Kubernetes)",
      category: "Compute",
      description: "Orchestrates Node.js/Python microservices inside isolated pods.",
      icon: <Network className="h-5 w-5 text-primary" />,
      connections: ["sql", "cosmos", "keyvault"],
    },
    {
      id: "sql",
      name: "Azure SQL Database",
      category: "Database",
      description: "Relational persistence tier for transactional records.",
      icon: <Database className="h-5 w-5 text-secondary" />,
      connections: ["monitor"],
    },
    {
      id: "cosmos",
      name: "Azure Cosmos DB",
      category: "Database",
      description: "Multi-model global scale NoSQL engine for catalog items.",
      icon: <Database className="h-5 w-5 text-secondary" />,
      connections: ["monitor"],
    },
    {
      id: "keyvault",
      name: "Azure Key Vault",
      category: "Security",
      description: "Manages database strings, tokens, and SSL certificates.",
      icon: <KeyRound className="h-5 w-5 text-orange-500" />,
      connections: [],
    },
    {
      id: "monitor",
      name: "Azure Monitor",
      category: "Monitor",
      description: "Aggregates logs, traces, and metrics across all systems.",
      icon: <Eye className="h-5 w-5 text-green-400" />,
      connections: ["insights"],
    },
    {
      id: "insights",
      name: "Application Insights",
      category: "Monitor",
      description: "Provides application performance monitoring (APM) and tracing.",
      icon: <Activity className="h-5 w-5 text-green-400" />,
      connections: [],
    },
  ];

  return (
    <section
      id="architecture"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12 overflow-hidden"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Architecture
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Azure Cloud Architecture Flow
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* Left Side: Interactive diagram */}
        <div className="lg:col-span-8 relative flex flex-col items-center justify-center p-6 bg-black/30 border border-white/5 rounded-3xl min-h-[460px]">
          
          {/* Background glowing line canvas or simulation */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            {/* Animated dotted glowing lines representing system backbones */}
            <div className="absolute top-[20%] left-0 w-full h-[2px] bg-gradient-to-r from-accent via-primary to-secondary animate-pulse" />
            <div className="absolute top-[60%] left-0 w-full h-[2px] bg-gradient-to-r from-secondary via-primary to-accent animate-pulse" />
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Column 1: Client Ingress */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-1">Client Ingress</h5>
              {nodes.filter(n => n.category === "Client").map((node) => (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                    hoveredNode === node.id 
                      ? "border-accent bg-accent/5 shadow-lg shadow-accent/5 scale-105" 
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-white/5 p-2">{node.icon}</div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{node.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Compute & Orchestration */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-1">Compute Tier</h5>
              {nodes.filter(n => n.category === "Compute").map((node) => (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                    hoveredNode === node.id 
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 scale-105" 
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-white/5 p-2">{node.icon}</div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{node.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: Persistence & Security */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center border-b border-white/5 pb-1">Data & Security</h5>
              {nodes.filter(n => n.category === "Database" || n.category === "Security").map((node) => (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                    hoveredNode === node.id 
                      ? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/5 scale-105" 
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-white/5 p-2">{node.icon}</div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{node.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Observability (Connected to everything) */}
          <div className="w-full mt-8 border-t border-white/5 pt-6 flex flex-col items-center">
            <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Observability Backbone</h5>
            <div className="flex gap-4">
              {nodes.filter(n => n.category === "Monitor").map((node) => (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer rounded-full border px-5 py-2 transition-all duration-300 ${
                    hoveredNode === node.id 
                      ? "border-green-400 bg-green-400/5 scale-105" 
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {node.icon}
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{node.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Descriptions & Details */}
        <div className="lg:col-span-4">
          <GlassCard glowColor="rgba(0, 229, 255, 0.1)">
            <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              System Telemetry <TrendingUp className="h-5 w-5 text-accent animate-pulse" />
            </h4>
            <p className="text-xs text-gray-400 mt-2">
              Hover over any node in the architecture diagram to inspect its role and runtime routing details.
            </p>

            <div className="mt-6 border-t border-white/5 pt-6">
              {hoveredNode ? (
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded">
                    {nodes.find(n => n.id === hoveredNode)?.category}
                  </span>
                  <h5 className="font-display text-sm font-bold text-white mt-2">
                    {nodes.find(n => n.id === hoveredNode)?.name}
                  </h5>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    {nodes.find(n => n.id === hoveredNode)?.description}
                  </p>
                  
                  {nodes.find(n => n.id === hoveredNode)?.connections.length ? (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest">Active routing endpoints:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {nodes.find(n => n.id === hoveredNode)?.connections.map(connId => (
                          <span key={connId} className="flex items-center gap-1 text-[9px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                            <ArrowRight className="h-2.5 w-2.5 text-accent" />
                            {nodes.find(n => n.id === connId)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-gray-500">
                  Select a node to inspect system pathways...
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
