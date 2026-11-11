"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respect reduced-motion user preference immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const skipTimer = setTimeout(() => setIsVisible(false), 0);
      return () => clearTimeout(skipTimer);
    }

    // Lock scroll briefly during lightweight intro
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const duration = 950; // Lightweight ~0.95s reveal

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(1, elapsed / duration);
      const eased = Math.round(
        ratio === 1 ? 100 : Math.sin((ratio * Math.PI) / 2) * 100
      );

      setProgress(eased);

      if (ratio >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            document.body.style.overflow = "unset";
            setIsVisible(false);
          }, 650);
        }, 120);
      }
    }, 20);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#08080a] text-white p-8 sm:p-12 md:p-16 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      {/* Top Meta Row */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.3em] uppercase text-white/45">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>PORTFOLIO</span>
        </span>
        <span>BANGLADESH</span>
      </div>

      {/* Center Minimal Branding */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <div className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white flex items-center justify-center gap-3">
          <span>SOHAG</span>
          <span className="text-white/40">•</span>
        </div>
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white/50">
          ASPIRING FULL-STACK DEVELOPER
        </p>
      </div>

      {/* Bottom Counter & Progress Line */}
      <div className="space-y-3">
        <div className="flex items-end justify-between font-mono">
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
            INITIALIZING
          </span>
          <span className="text-xl sm:text-3xl font-bold tracking-tight text-white">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>
        <div className="w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
