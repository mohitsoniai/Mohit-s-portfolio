"use client";

import { useEffect } from "react";

interface ShortcutOptions {
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: ShortcutOptions = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchKey = event.key.toLowerCase() === key.toLowerCase();
      const matchCtrl = !options.ctrl || event.ctrlKey;
      const matchMeta = !options.meta || event.metaKey;
      const matchShift = !options.shift || event.shiftKey;
      const matchAlt = !options.alt || event.altKey;

      if (matchKey && matchCtrl && matchMeta && matchShift && matchAlt) {
        if (options.preventDefault !== false) {
          event.preventDefault();
        }
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, options]);
}

// Custom hook to detect typed words (e.g. typing "confetti" anywhere on the screen)
export function useSecretCode(targetCode: string, callback: () => void) {
  useEffect(() => {
    let typed = "";
    const handleKeyPress = (e: KeyboardEvent) => {
      // Append key, keeping only last N characters where N is targetCode length
      typed += e.key.toLowerCase();
      if (typed.length > targetCode.length) {
        typed = typed.slice(-targetCode.length);
      }
      if (typed === targetCode.toLowerCase()) {
        callback();
        typed = ""; // Reset after trigger
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [targetCode, callback]);
}
