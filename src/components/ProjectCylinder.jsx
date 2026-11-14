"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { projectsData, showcaseCardsData } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MoveHorizontal,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function ProjectCylinder() {
  const ringRef = useRef(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastHoverRotateRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);
  const [radius, setRadius] = useState(395);

  const cards = showcaseCardsData;
  const total = cards.length;
  const angleStep = 360 / total;

  const projectMap = useMemo(
    () => Object.fromEntries(projectsData.map((p) => [p.id, p])),
    []
  );

  // Adjust cylinder radius responsively
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(275);
      } else if (w < 768) {
        setRadius(345);
      } else if (w < 1024) {
        setRadius(415); // Tablet (768px - 1023px): visually separated and balanced
      } else {
        setRadius(455); // Desktop (1024px+): preserved exactly
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Compute front-most active card from current rotation angle
  const syncActiveCard = useCallback(
    (deg) => {
      const normalized = ((-deg % 360) + 360) % 360;
      const index = Math.round(normalized / angleStep) % total;
      setActiveIdx(index);
    },
    [angleStep, total]
  );

  // Rotate cylinder with GSAP smoothly
  const rotateToAngle = useCallback(
    (targetAngle, duration = 0.8) => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const actualDuration = prefersReducedMotion ? 0 : duration;

      rotationRef.current = targetAngle;
      syncActiveCard(targetAngle);
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotateY: targetAngle,
          duration: actualDuration,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    },
    [syncActiveCard]
  );

  // Shortest-path angular rotation toward card index i
  const focusCard = useCallback(
    (index, viaHover = false) => {
      if (isDraggingRef.current) return;
      if (viaHover) {
        const now = Date.now();
        if (now - lastHoverRotateRef.current < 420) return;
        lastHoverRotateRef.current = now;
      }

      const current = rotationRef.current;
      const targetBase = -index * angleStep;
      const diff = ((((targetBase - current) % 360) + 540) % 360) - 180;
      rotateToAngle(current + diff, 0.8);
    },
    [angleStep, rotateToAngle]
  );

  const stepRotation = (dir) => {
    const nextAngle =
      Math.round(rotationRef.current / angleStep) * angleStep + dir * angleStep;
    rotateToAngle(nextAngle, 0.75);
  };

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = deltaX;

    rotationRef.current += deltaX * 0.35;
    syncActiveCard(rotationRef.current);

    if (ringRef.current) {
      gsap.set(ringRef.current, { rotateY: rotationRef.current });
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Brief cooldown so releasing drag doesn't cause instant hover-rotation
    lastHoverRotateRef.current = Date.now() + 250;

    // Inertia + snap to nearest card slot
    const projected = rotationRef.current + velocityRef.current * 2.2;
    const snapped = Math.round(projected / angleStep) * angleStep;
    rotateToAngle(snapped, 0.9);
  };

  // Smooth mouse hover focus handler
  const handleCardHover = useCallback(
    (index) => {
      // Check if device supports hover
      if (typeof window !== "undefined") {
        const canHover = window.matchMedia("(hover: hover)").matches;
        if (!canHover) return;
      }
      if (isDraggingRef.current) return;
      if (index === activeIdx) return;

      const diff = Math.abs((((index - activeIdx) % total) + total) % total);
      const distance = Math.min(diff, total - diff);
      if (distance <= 2) {
        focusCard(index, true);
      }
    },
    [activeIdx, total, focusCard]
  );

  const activeCard = cards[activeIdx];
  const activeProject = projectMap[activeCard.projectId] || projectsData[0];

  return (
    <section
      id="projects"
      className="relative w-full bg-[#f4f4f2] text-[#111111] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Preserved FEATURED WORK Section Heading & Editorial Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-600 block">
              04 {"//"} PORTFOLIO ARCHIVE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
              FEATURED WORK
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 max-w-xl leading-relaxed">
              Interactive 3D project showcase — drag, swipe, or hover over cards
              to explore built applications and live deployments.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600 shrink-0">
            <MoveHorizontal className="w-4 h-4 text-black" />
            <span>Drag or Hover</span>
          </div>
        </div>

        {/* 3D Cylindrical Stage */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") stepRotation(1);
            if (e.key === "ArrowRight") stepRotation(-1);
          }}
          tabIndex={0}
          aria-label="Interactive 3D project ring. Use left or right arrow keys or drag to rotate."
          className="relative w-full h-[350px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none outline-none touch-pan-y"
          style={{ perspective: "1350px" }}
        >
          {/* Rotating 3D Ring */}
          <div
            ref={ringRef}
            className="relative w-[215px] sm:w-[260px] md:w-[285px] lg:w-[345px] h-[230px] sm:h-[270px] md:h-[295px] lg:h-[320px] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cards.map((card, i) => {
              const angle = i * angleStep;
              const isFront = i === activeIdx;
              const proj = projectMap[card.projectId] || projectsData[0];

              const diff = Math.abs((((i - activeIdx) % total) + total) % total);
              const distance = Math.min(diff, total - diff);
              const isFacingFront = distance <= 2;
              const zIndex = isFront ? 30 : Math.max(1, 25 - distance * 5);

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => handleCardHover(i)}
                  onMouseMove={() => {
                    if (i !== activeIdx) handleCardHover(i);
                  }}
                  onClick={() => focusCard(i, false)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      focusCard(i, false);
                    }
                  }}
                  aria-label={`Preview ${proj.title}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                    zIndex,
                    pointerEvents: isFacingFront ? "auto" : "none",
                  }}
                  className={`group absolute inset-0 rounded-2xl border p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-black ${
                    isFront
                      ? "bg-white border-black/35 opacity-100 shadow-2xl hover:border-black/60"
                      : "bg-[#f4f4f2] border-black/15 opacity-95 shadow-md hover:border-black/35"
                  }`}
                >
                  {/* Minimal Top Label Row */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-600 font-semibold shrink-0">
                    <span className="truncate pr-2">
                      {proj.number} · {proj.category}
                    </span>
                    {proj.status === "In Progress" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black text-white px-2 py-0.5 text-[9px] shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        <span>WIP</span>
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                    )}
                  </div>

                  {/* Large Clear Project Screenshot Focus Area */}
                  <div className="relative flex-1 my-2.5 w-full rounded-xl overflow-hidden border border-black/10 bg-[#fafaf8]">
                    <Image
                      src={proj.image}
                      alt={`${proj.title} screenshot`}
                      fill
                      sizes="(max-width: 640px) 215px, (max-width: 1024px) 285px, 345px"
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Clean Bottom Footer: Bold Title + Live Demo External-Link Button */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/10 shrink-0">
                    <h3 className="text-base sm:text-xl font-black uppercase tracking-tight text-black leading-none truncate">
                      {proj.title}
                    </h3>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open ${proj.title} Live Demo`}
                      className="w-8 h-8 rounded-full border border-black bg-black text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered Active Card Spotlight & Readable Case Details Panel */}
        <div className="mt-12 flex flex-col items-center space-y-6">
          {/* Cylinder Rotation Controls + Active Header */}
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              type="button"
              onClick={() => stepRotation(1)}
              aria-label="Rotate cylinder left"
              className="w-11 h-11 rounded-full border border-black/25 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-[200px] sm:min-w-[260px] text-center space-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-600 font-semibold block">
                {activeProject.number} / {activeProject.category} ·{" "}
                {activeProject.year}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                {activeProject.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => stepRotation(-1)}
              aria-label="Rotate cylinder right"
              className="w-11 h-11 rounded-full border border-black/25 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* High-Contrast Monochrome Spotlight Details Panel */}
          <div className="w-full max-w-4xl rounded-3xl border border-black/15 bg-white p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-black/10 pb-6">
              <p className="text-base sm:text-lg text-[#1a1a1a] leading-relaxed font-normal max-w-2xl">
                {activeProject.description}
              </p>

              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full border border-black bg-black text-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 active:scale-95"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* 3 Genuine Key Features */}
              <div className="md:col-span-8 space-y-3">
                <span className="text-xs font-mono tracking-[0.22em] uppercase text-neutral-600 font-bold block">
                  KEY FEATURES
                </span>
                <ul className="space-y-3">
                  {activeProject.features.slice(0, 3).map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#1f1f1f] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="md:col-span-4 space-y-3">
                <span className="text-xs font-mono tracking-[0.22em] uppercase text-neutral-600 font-bold block">
                  TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/15 bg-[#f4f4f2] px-3.5 py-1.5 text-xs font-mono font-semibold text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
