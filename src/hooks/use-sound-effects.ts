"use client";

import { useEffect, useRef, useState } from "react";

// Simple client-side audio state that persists across components
let globalAudioMuted = false;
const listeners = new Set<(muted: boolean) => void>();

export function setGlobalMuted(muted: boolean) {
  globalAudioMuted = muted;
  listeners.forEach((listener) => listener(muted));
}

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(globalAudioMuted);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handleMuteChange = (muted: boolean) => {
      setIsMuted(muted);
    };
    listeners.add(handleMuteChange);
    return () => {
      listeners.delete(handleMuteChange);
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playHover = () => {
    if (isMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const playClick = () => {
    if (isMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const playSuccess = () => {
    if (isMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // Two rising tones
      const now = ctx.currentTime;
      [
        { freq: 523.25, start: 0, duration: 0.1 }, // C5
        { freq: 659.25, start: 0.08, duration: 0.1 }, // E5
        { freq: 783.99, start: 0.16, duration: 0.2 }, // G5
      ].forEach((tone) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(tone.freq, now + tone.start);

        gain.gain.setValueAtTime(0.03, now + tone.start);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.start + tone.duration);

        osc.start(now + tone.start);
        osc.stop(now + tone.start + tone.duration);
      });
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const toggleMute = () => {
    setGlobalMuted(!isMuted);
  };

  return { playHover, playClick, playSuccess, isMuted, toggleMute };
}
