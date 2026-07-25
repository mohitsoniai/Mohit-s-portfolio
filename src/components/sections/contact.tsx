"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { Mail, Phone, MapPin, Send, CheckCircle, Globe2 } from "lucide-react";

interface Hub {
  name: string;
  x: number; // percentage
  y: number; // percentage
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  const { playClick, playSuccess } = useSoundEffects();

  const hubs: Hub[] = [
    { name: "US West (Seattle)", x: 22, y: 35 },
    { name: "Europe West (Dublin)", x: 48, y: 30 },
    { name: "India Central (Pune/Mumbai)", x: 69, y: 55 },
    { name: "Asia Southeast (Singapore)", x: 77, y: 64 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    playClick();

    // Simulate sending API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccess();
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success banner after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-6xl mx-auto px-6 py-24 md:px-12"
    >
      {/* Title */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
          Connection
        </h2>
        <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Get in Touch
        </h3>
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto" />
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Contact Form */}
        <div className="lg:col-span-6">
          <GlassCard glowColor="rgba(0, 229, 255, 0.1)">
            <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-6">
              Send a Secure Message
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your project details or inquiries here..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white placeholder-gray-600 outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-primary to-secondary py-3 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:scale-102 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Banner */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center space-x-2 rounded-lg border border-green-500/20 bg-green-950/30 p-3 text-xs text-green-400"
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Telemetry received. Mohit will reply shortly!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Interactive Map & Info */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* SVG Map Card */}
          <GlassCard glowColor="rgba(139, 92, 246, 0.1)" className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-accent" /> Cloud Deployments Map
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-green-400 bg-green-950/30 px-2 py-0.5 rounded animate-pulse">
                  All Systems Operational
                </span>
              </div>

              {/* Minimal SVG World Outline Map */}
              <div className="relative w-full h-[180px] bg-black/40 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                {/* SVG outline of landmasses (very simplified visual representation) */}
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-35 select-none pointer-events-none">
                  {/* Simplified USA landmass */}
                  <path d="M40,50 L110,50 L120,70 L90,110 L40,80 Z" fill="rgba(255,255,255,0.06)" />
                  {/* Simplified South America */}
                  <path d="M85,115 L105,120 L95,175 L75,145 Z" fill="rgba(255,255,255,0.06)" />
                  {/* Simplified Europe/Africa */}
                  <path d="M170,40 L210,40 L200,90 L220,130 L170,160 L160,90 Z" fill="rgba(255,255,255,0.06)" />
                  {/* Simplified Asia/Australia */}
                  <path d="M220,40 L320,30 L360,70 L300,120 L270,100 L320,170 L290,180 L250,110 Z" fill="rgba(255,255,255,0.06)" />
                </svg>

                {/* Pulsing Azure DC Hubs */}
                {hubs.map((hub) => (
                  <button
                    key={hub.name}
                    onMouseEnter={() => setHoveredHub(hub.name)}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    aria-label={`Hub: ${hub.name}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-accent opacity-75 animate-ping" />
                    <span className="absolute inset-0.5 rounded-full bg-accent border border-white shadow" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hover description */}
            <div className="mt-4 border-t border-white/5 pt-3 h-8 flex items-center justify-center">
              {hoveredHub ? (
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                  Active Azure Gateway: {hoveredHub}
                </span>
              ) : (
                <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                  Hover over pulsing hubs to inspect Cloud nodes
                </span>
              )}
            </div>
          </GlassCard>

          {/* Details Card */}
          <GlassCard glowColor="rgba(37, 99, 235, 0.1)">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/5 p-2.5 text-accent">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Email</h5>
                  <p className="text-[11px] font-semibold text-white mt-0.5 truncate">mohitswarnkar0@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/5 p-2.5 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Telemetry</h5>
                  <p className="text-[11px] font-semibold text-white mt-0.5">+91 70002 91522</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/5 p-2.5 text-secondary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Location</h5>
                  <p className="text-[11px] font-semibold text-white mt-0.5">Vadodara, India</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
