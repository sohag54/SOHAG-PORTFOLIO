"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceData } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".exp-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#0a0b10] text-white py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Subtle Ambient Radial Light */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[450px] bg-white/[0.03] rounded-full blur-[130px]" />

      {/* Oversized Faded Background Typography */}
      <div className="pointer-events-none absolute inset-x-0 top-12 select-none opacity-[0.025] leading-none text-center">
        <span className="text-[17vw] font-black uppercase tracking-tighter text-white">
          {experienceData.heading}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Label, Heading & Primary CTA */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            {/* Small Label: OPEN TO OPPORTUNITIES */}
            <div className="exp-reveal flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/60">
                {experienceData.label}
              </span>
            </div>

            {/* Main Heading: EXPERIENCE */}
            <h2 className="exp-reveal text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.92]">
              {experienceData.heading}
            </h2>

            {/* Minimal Architectural Divider */}
            <div className="exp-reveal w-14 h-[1.5px] bg-white/30" />

            {/* CTA: LET'S WORK TOGETHER → */}
            <div className="exp-reveal pt-2">
              <Link
                href={experienceData.ctaHref}
                className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg"
              >
                <span>{experienceData.ctaText}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Personal Statement Card */}
          <div className="lg:col-span-7">
            <div className="exp-reveal rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 backdrop-blur-xs space-y-6">
              {experienceData.paragraphs.map((paragraph, index) => {
                const isFirst = index === 0;
                const isLast = index === experienceData.paragraphs.length - 1;

                if (isFirst) {
                  return (
                    <p
                      key={index}
                      className="text-lg sm:text-2xl font-medium text-white leading-snug tracking-tight"
                    >
                      {paragraph}
                    </p>
                  );
                }

                if (isLast) {
                  return (
                    <p
                      key={index}
                      className="text-base sm:text-xl font-semibold text-white/95 leading-relaxed pt-6 border-t border-white/10"
                    >
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-base sm:text-lg text-white/65 leading-relaxed font-normal"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
