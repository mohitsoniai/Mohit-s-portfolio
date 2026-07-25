"use client";

import React, { useState, useEffect } from "react";
import { motion as motionFramer, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Download, Menu, X } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, playHover, playClick } = useSoundEffects();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Architecture", href: "#architecture" },
    { label: "Credentials", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.href.slice(1));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.href.slice(1));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motionFramer.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 z-40 w-[95%] max-w-6xl -translate-x-1/2 rounded-full border transition-all duration-300 ${
        isScrolled
          ? "border-white/10 bg-gray-950/70 py-3 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "border-transparent bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          onMouseEnter={playHover}
          className="group relative flex items-center space-x-1 font-display text-xl font-bold tracking-tight text-white"
        >
          <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent group-hover:glow-text">
            MS
          </span>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={playHover}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-gray-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motionFramer.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 -z-10 rounded-full bg-white/5 border border-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleMute();
              playClick();
            }}
            onMouseEnter={playHover}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-300 transition-colors hover:border-accent hover:text-accent"
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* CMD+K Guide */}
          <button
            onClick={() => {
              playClick();
              // dispatch Ctrl+K keyboard event to toggle Command Palette
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
              );
            }}
            onMouseEnter={playHover}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-[10px] text-gray-400 hover:border-accent hover:text-white transition-colors"
          >
            <span>Search</span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[9px]">Ctrl+K</kbd>
          </button>

          {/* Resume button */}
          <a
            href="#"
            onMouseEnter={playHover}
            onClick={() => playClick()}
            className="flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="h-3 w-3" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Controls (Menu Trigger & Audio) */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={() => {
              toggleMute();
              playClick();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-300 hover:text-accent"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motionFramer.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/5 bg-gray-950/95 mt-3 rounded-2xl overflow-hidden px-6 py-4 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block py-2 text-sm font-semibold tracking-wide uppercase ${
                      isActive ? "text-accent" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            
            <div className="border-t border-white/5 pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                  );
                }}
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2.5 text-xs text-gray-300 hover:bg-white/10"
              >
                <span>Command Palette</span>
                <span className="font-mono text-[9px] bg-white/10 px-1.5 py-0.5 rounded">Ctrl+K</span>
              </button>
              
              <a
                href="#"
                onClick={() => playClick()}
                className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary py-2.5 text-xs font-semibold text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume</span>
              </a>
            </div>
          </motionFramer.div>
        )}
      </AnimatePresence>
    </motionFramer.nav>
  );
}
