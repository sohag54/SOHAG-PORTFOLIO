"use client";

import { useRef, useState } from "react";
import { aboutData } from "@/data/portfolioData";
import { ArrowUpRight, Compass, Code2 } from "lucide-react";
import { contactConfig } from "@/config/contact";

export default function About() {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (
      !cardRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#07080d] text-white py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden flex flex-col justify-center"
    >
      {/* Starry Night Sky Background with Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Atmospheric Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />

        {/* Subtle Starfield */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 120px 80px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 240px 180px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 380px 120px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 480px 240px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 620px 90px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 780px 280px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 920px 160px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 1040px 60px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 1200px 220px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: "800px 400px",
          }}
        />

        {/* Minimal Architectural Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Massive Editorial Faded ABOUT / ME Typography */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center select-none opacity-[0.035] leading-none text-center">
        <span className="text-[20vw] font-black uppercase tracking-tighter text-white">
          ABOUT
        </span>
        <span className="text-[20vw] font-black uppercase tracking-tighter text-white -mt-[6vw]">
          ME
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="w-2 h-2 rounded-full bg-white motion-safe:animate-pulse" />
          <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/50">
            {aboutData.sectionNumber} {"//"} {aboutData.tag}
          </span>
        </div>

        {/* Two-Column Editorial Layout with Central Interactive Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Honest Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              CRAFTING CODE <br />
              <span className="text-white/40">FROM CURIOSITY</span> <br />
              TO IMPACT.
            </h2>

            <p className="text-lg sm:text-xl font-medium text-white/90 leading-relaxed">
              {aboutData.lead}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-white/60 leading-relaxed font-normal">
              {aboutData.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Preserved Resume Link */}
            <div className="pt-2">
              <a
                href={contactConfig.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 backdrop-blur-sm"
              >
                <span>View Full Resume</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Tilt Glass Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => {
                setIsHovered(false);
                setMousePos({ x: 0, y: 0 });
              }}
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateY(${mousePos.x * 16}deg) rotateX(${-mousePos.y * 16}deg) scale3d(1.02, 1.02, 1.02)`
                  : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
                transition: isHovered
                  ? "none"
                  : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className="relative w-full max-w-[440px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Dynamic Mouse Spotlight inside Card */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-3xl"
                style={{
                  opacity: isHovered ? 0.35 : 0,
                  background: `radial-gradient(400px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.4), transparent 60%)`,
                }}
              />

              {/* Card Header Icon & Label */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                  MINDSET & FOCUS
                </span>
              </div>

              {/* Trait Blocks */}
              <div className="space-y-6">
                {aboutData.traits.map((trait, index) => (
                  <div
                    key={trait.title}
                    className="border-t border-white/10 pt-4 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                        {trait.title}
                      </h3>
                      <span className="text-[10px] font-mono text-white/30">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-normal">
                      {trait.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Card Bottom Meta */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-white/60" />
                  <span>FULL-STACK LEARNER</span>
                </span>
                <span>BANGLADESH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
