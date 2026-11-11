"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { X, ArrowRight, GraduationCap, Sparkles, Layers } from "lucide-react";

const MENU_ITEMS = [
  {
    label: "Home",
    href: "/#home",
    number: "01",
    subtitle: "Portfolio Hero & Overview",
  },
  {
    label: "About Me",
    href: "/#about",
    number: "02",
    subtitle: "Journey & Developer Mindset",
  },
  {
    label: "Education",
    href: "/education",
    number: "03",
    subtitle: "Academic Foundations",
  },
  {
    label: "Experience",
    href: "/#experience",
    number: "04",
    subtitle: "Open to Opportunities",
  },
  {
    label: "Projects",
    href: "/#projects",
    number: "05",
    subtitle: "Selected Builds & Work",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const overlayRef = useRef(null);
  const itemRefs = useRef([]);
  const textRefs = useRef([]);
  const previewRef = useRef(null);

  // Detect prefers-reduced-motion cleanly
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const timer = setTimeout(updatePreference, 0);
    mediaQuery.addEventListener("change", updatePreference);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  // Close overlay on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // GSAP staggered entrance animation when menu opens
  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return;

    const validItems = itemRefs.current.filter(Boolean);
    if (validItems.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        validItems,
        {
          y: 36,
          opacity: 0,
          rotateX: 10,
          transformPerspective: 900,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.12,
          clearProps: "transform",
        }
      );

      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          { opacity: 0, scale: 0.96, y: 16 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen, prefersReducedMotion]);

  // Reset hover and transforms cleanly when closing
  const handleClose = useCallback(() => {
    setHoveredIdx(null);
    textRefs.current.forEach((el) => {
      if (el) {
        gsap.killTweensOf(el);
        gsap.set(el, { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 });
      }
    });
    setIsOpen(false);
  }, []);

  // Magnetic & Subtle 3D Perspective mouse move handler
  const handleItemMouseMove = (e, idx) => {
    if (prefersReducedMotion) return;
    // Skip magnetic hover math on coarse/touch pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = itemRefs.current[idx];
    const target = textRefs.current[idx];
    if (!container || !target) return;

    const rect = container.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(target, {
      x: relX * 22,
      y: relY * 10,
      scale: 1.03,
      rotateY: relX * 5,
      rotateX: -relY * 5,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleItemMouseLeave = (idx) => {
    setHoveredIdx((prev) => (prev === idx ? null : prev));
    const target = textRefs.current[idx];
    if (!target) return;

    gsap.to(target, {
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const activePreviewIdx = hoveredIdx !== null ? hoveredIdx : 0;

  return (
    <>
      {/* Top Minimal Navbar (Preserved Unchanged) */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-[#f4f4f2]/90 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          {/* Top-Left: SOHAG • */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-black font-extrabold tracking-widest text-lg sm:text-xl uppercase transition-opacity hover:opacity-70"
          >
            <span>SOHAG</span>
            <span className="text-black/40 group-hover:text-black transition-colors duration-300">
              •
            </span>
          </Link>

          {/* Top-Right: Rounded outlined pill button labeled Menu + */}
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="rounded-full border border-black px-6 py-2 text-xs font-bold tracking-wider uppercase text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
            aria-label="Open Navigation Menu"
            aria-expanded={isOpen}
          >
            <span className="capitalize">Menu</span>
            <span className="text-xs font-semibold">+</span>
          </button>
        </div>
      </header>

      {/* Pure Black Monochrome 3D Editorial Fullscreen Overlay */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`fixed inset-0 z-50 bg-black text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between overflow-y-auto ${
          isOpen
            ? "opacity-100 pointer-events-auto visible translate-y-0"
            : "opacity-0 pointer-events-none invisible -translate-y-4"
        }`}
      >
        {/* Overlay Top Header */}
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 h-20 shrink-0 flex items-center justify-between border-b border-white/10">
          <Link
            href="/"
            onClick={handleClose}
            className="flex items-center gap-1.5 text-white font-extrabold tracking-widest text-lg sm:text-xl uppercase hover:opacity-75 transition-opacity"
          >
            <span>SOHAG</span>
            <span className="text-white/40">•</span>
          </Link>

          {/* Outlined Pill Close Button */}
          <button
            onClick={handleClose}
            type="button"
            className="rounded-full border border-white/30 px-6 py-2 text-xs font-bold tracking-wider uppercase text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
            aria-label="Close Navigation Menu"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Overlay Main Body: Navigation Links + Live Preview Stage */}
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 py-8 sm:py-10 flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: 5 Interactive Magnetic 3D Menu Items */}
            <nav className="lg:col-span-7 flex flex-col">
              {MENU_ITEMS.map((item, idx) => {
                const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;

                return (
                  <div
                    key={item.label}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseMove={(e) => handleItemMouseMove(e, idx)}
                    onMouseLeave={() => handleItemMouseLeave(idx)}
                    className={`border-b border-white/10 transition-opacity duration-300 ${
                      isDimmed ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="group flex items-center justify-between py-4 sm:py-5 outline-none"
                    >
                      <div
                        ref={(el) => {
                          textRefs.current[idx] = el;
                        }}
                        className="flex items-baseline gap-4 sm:gap-8 will-change-transform"
                      >
                        <span className="text-xs sm:text-sm font-mono text-white/40 group-hover:text-white transition-colors duration-300">
                          {item.number}
                        </span>

                        <div className="flex flex-col">
                          <span className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase text-white flex items-center gap-4">
                            <span>{item.label}</span>
                            <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </span>
                          <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 mt-1 sm:hidden">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-white/30 group-hover:text-white/70 transition-colors">
                        {item.subtitle}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right Column: Minimal Monochrome Visual Preview Stage (Desktop) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div
                ref={previewRef}
                className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl border border-white/15 bg-[#080808] overflow-hidden shadow-2xl"
              >
                {/* Preview 01: Home (Portrait Cutout on Black Canvas) */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activePreviewIdx === 0
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span>01 // HOME</span>
                    <span>PORTFOLIO</span>
                  </div>
                  <div className="relative w-full my-auto rounded-xl bg-[#f4f4f2] border border-white/15 overflow-hidden pt-3 px-2 flex items-end justify-center">
                    <div className="relative w-full aspect-[1024/825]">
                      <Image
                        src="/sohag-cutout.png"
                        alt="Sohag — Portfolio Portrait"
                        width={1024}
                        height={825}
                        priority
                        className="w-full h-full object-contain object-bottom grayscale contrast-[1.06]"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/70 border-t border-white/10 pt-4">
                    EXPLORE MY PORTFOLIO
                  </div>
                </div>

                {/* Preview 02: About Me (Monochrome Portrait & Narrative) */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activePreviewIdx === 1
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span>02 // ABOUT ME</span>
                    <span>BANGLADESH</span>
                  </div>
                  <div className="relative flex-1 my-4 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/sohag.jpg"
                      alt="Sohag — About Portrait"
                      fill
                      sizes="380px"
                      className="object-cover object-top grayscale contrast-[1.15]"
                    />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/70 border-t border-white/10 pt-4">
                    ASPIRING FULL-STACK DEVELOPER
                  </div>
                </div>

                {/* Preview 03: Education (Confirmed Academic Card) */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activePreviewIdx === 2
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span>03 // EDUCATION</span>
                    <GraduationCap className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="space-y-4 my-auto">
                    <div className="border-l border-white/20 pl-4 space-y-1">
                      <span className="text-[10px] font-mono text-white/40">
                        SSC
                      </span>
                      <p className="text-sm font-medium text-white">
                        Bharua Khali Model High School
                      </p>
                    </div>
                    <div className="border-l border-white/20 pl-4 space-y-1">
                      <span className="text-[10px] font-mono text-white/40">
                        HSC
                      </span>
                      <p className="text-sm font-medium text-white">
                        Hajera Taju Degree College
                      </p>
                    </div>
                    <div className="border-l border-white pl-4 space-y-1">
                      <span className="text-[10px] font-mono text-white/60">
                        BSc in Computer Science • Currently Pursuing
                      </span>
                      <p className="text-sm font-semibold text-white">
                        International Islamic University Chittagong (IIUC)
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/70 border-t border-white/10 pt-4">
                    DEDICATED /EDUCATION PAGE
                  </div>
                </div>

                {/* Preview 04: Experience (Open to Opportunities Statement) */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activePreviewIdx === 3
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span>04 // EXPERIENCE</span>
                    <Sparkles className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="space-y-4 my-auto">
                    <span className="inline-block rounded-full border border-white/25 px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-white">
                      Open to Opportunities
                    </span>
                    <p className="text-xl font-light leading-snug text-white">
                      &ldquo;Ready to learn, work hard, and turn your trust into
                      meaningful results.&rdquo;
                    </p>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/70 border-t border-white/10 pt-4">
                    LET&apos;S WORK TOGETHER
                  </div>
                </div>

                {/* Preview 05: Projects (Real Projects Wireframe Index) */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activePreviewIdx === 4
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40">
                    <span>05 // PROJECTS</span>
                    <Layers className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="space-y-4 my-auto">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-sm font-semibold text-white">
                        01. Dev Stack
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        React · Vite
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-sm font-semibold text-white">
                        02. FitLog
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        React · TS
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-sm font-semibold text-white">
                        03. BookNook
                      </span>
                      <span className="text-[10px] font-mono text-white/70 border border-white/25 rounded-full px-2 py-0.5">
                        In Progress
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-sm font-semibold text-white">
                        04. Dor Bazar
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        Live Demo
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/70 border-t border-white/10 pt-4">
                    3D FEATURED ARCHIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Footer Info */}
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 py-6 shrink-0 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] tracking-widest uppercase text-white/45 font-mono">
          <div>
            <span>Based in Bangladesh</span>
          </div>
          <div>
            <span>Aspiring Full-Stack Developer</span>
          </div>
        </div>
      </div>
    </>
  );
}
