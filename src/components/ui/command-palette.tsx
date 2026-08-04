"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Home, 
  User, 
  Briefcase, 
  FolderGit2, 
  Code, 
  Award, 
  Network, 
  Mail, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Download
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import confetti from "canvas-confetti";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMuted, toggleMute, playClick } = useSoundEffects();

  // Listen for Ctrl+K / Cmd+K
  useKeyboardShortcut("k", () => setIsOpen((prev) => !prev), { ctrl: true });
  useKeyboardShortcut("k", () => setIsOpen((prev) => !prev), { meta: true });

  const commands = [
    { id: "home", title: "Go to Home", category: "Navigation", icon: Home, action: () => scrollToSection("home") },
    { id: "about", title: "Go to About", category: "Navigation", icon: User, action: () => scrollToSection("about") },
    { id: "experience", title: "Go to Experience", category: "Navigation", icon: Briefcase, action: () => scrollToSection("experience") },
    { id: "projects", title: "Go to Projects", category: "Navigation", icon: FolderGit2, action: () => scrollToSection("projects") },
    { id: "skills", title: "Go to Skills", category: "Navigation", icon: Code, action: () => scrollToSection("skills") },
    { id: "architecture", title: "Go to Cloud Architecture Flow", category: "Navigation", icon: Network, action: () => scrollToSection("architecture") },
    { id: "certifications", title: "Go to Certifications", category: "Navigation", icon: Award, action: () => scrollToSection("certifications") },
    { id: "contact", title: "Go to Contact", category: "Navigation", icon: Mail, action: () => scrollToSection("contact") },
    { id: "mute", title: isMuted ? "Unmute Sound Effects" : "Mute Sound Effects", category: "System", icon: isMuted ? Volume2 : VolumeX, action: () => { toggleMute(); playClick(); } },
    { id: "confetti", title: "Trigger Confetti Rain (Easter Egg)", category: "Easter Egg", icon: Sparkles, action: () => triggerConfetti() },
    { id: "resume", title: "Download PDF Resume", category: "Resources", icon: Download, action: () => openResume() },
    { id: "github", title: "Visit GitHub Profile", category: "Resources", icon: FaGithub, action: () => window.open("https://github.com/mohitsoniai", "_blank") },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
      setSearch("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#00E5FF", "#8B5CF6"]
    });
  };

  const openResume = () => {
    window.open("#", "_blank"); // Fallback / placeholder link
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-gray-950/80 p-0 text-white shadow-2xl backdrop-blur-xl"
            >
              {/* Search input wrapper */}
              <div className="flex items-center border-b border-white/5 px-4 py-3">
                <Search className="mr-3 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] text-gray-400">
                  ESC
                </kbd>
              </div>

              {/* Suggestions List */}
              <div className="max-h-[320px] overflow-y-auto p-2 no-scrollbar">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-500">
                    No results found for &ldquo;{search}&rdquo;
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, idx) => {
                      const Icon = cmd.icon;
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                            isSelected
                              ? "bg-white/10 text-white"
                              : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-4 w-4 ${isSelected ? "text-accent" : "text-gray-400"}`} />
                            <span className="text-sm font-medium">{cmd.title}</span>
                          </div>
                          <span className="text-xs font-semibold text-gray-600 bg-white/5 px-2 py-0.5 rounded uppercase">
                            {cmd.category}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Footer hint */}
              <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-4 py-2 text-[10px] text-gray-500">
                <div className="flex gap-2">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <span>Press Ctrl+K / Cmd+K to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
