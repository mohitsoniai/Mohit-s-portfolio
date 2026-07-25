"use client";

import React from "react";
import { ArrowUp, Cloud } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export default function Footer() {
  const { playHover, playClick } = useSoundEffects();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/5 bg-gray-950/40 py-12 px-6 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Quote */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center space-x-2 text-accent">
            <Cloud className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Azure & DevOps Architecture</span>
          </div>
          <p className="text-sm font-semibold text-white tracking-wide">
            &ldquo;Building Intelligent Cloud Solutions for Tomorrow.&rdquo;
          </p>
        </div>

        {/* Socials & Back to top */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex space-x-3">
            <a
              href="https://github.com/mohitsoniai"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={() => playClick()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 hover:border-accent hover:text-accent transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="h-4.5 w-4.5" />
            </a>

            <a
              href="https://linkedin.com/in/mohitswarnkar"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={() => playClick()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 hover:border-accent hover:text-accent transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4.5 w-4.5" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              onClick={() => playClick()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 hover:border-accent hover:text-accent transition-all"
              aria-label="Twitter"
            >
              <FaTwitter className="h-4.5 w-4.5" />
            </a>

            <a
              href="#home"
              onClick={scrollToTop}
              onMouseEnter={playHover}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 hover:border-accent hover:text-accent transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4.5 w-4.5" />
            </a>
          </div>

          <p className="text-[10px] text-gray-500 font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} Mohit Soni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
