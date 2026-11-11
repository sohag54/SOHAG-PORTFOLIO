"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationData } from "@/data/portfolioData";
import { GraduationCap, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".edu-card", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full bg-[#0a0b10] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Oversized Faded Background Typography */}
      <div className="pointer-events-none absolute -top-4 right-0 select-none opacity-[0.025] leading-none text-right">
        <span className="text-[18vw] font-black uppercase tracking-tighter text-white">
          ACADEMIC
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
              {educationData.sectionNumber} {"//"} {educationData.tag}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              {educationData.heading}
            </h2>
            <p className="max-w-md text-xs sm:text-sm text-white/50 font-mono tracking-wider uppercase">
              {educationData.description}
            </p>
          </div>
        </div>

        {/* Academic Milestones Timeline Grid */}
        <div className="space-y-6">
          {educationData.items.map((item, index) => {
            const isPursuing = item.status === "Currently Pursuing";

            return (
              <div
                key={item.degree}
                className="edu-card group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                      <span>0{index + 1}</span>
                      <span>•</span>
                      <span className="text-white/75 tracking-widest uppercase">
                        {item.shortCode}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {item.degree}
                    </h3>

                    <p className="text-base sm:text-lg text-white/70 font-normal">
                      {item.institution}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    {isPursuing ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white text-black px-4 py-1.5 text-xs font-mono uppercase tracking-widest font-semibold">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{item.status}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white/80">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{item.status}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
