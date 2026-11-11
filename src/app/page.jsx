import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ProjectCylinder from "@/components/ProjectCylinder";
import SkillsAccordion from "@/components/SkillsAccordion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactConfig } from "@/config/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4f2] text-[#111111] selection:bg-black selection:text-[#f4f4f2]">
      {/* Section 01: Lightweight Cinematic Preloader */}
      <Preloader />

      {/* Global Minimal Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectCylinder />
        <SkillsAccordion />
      </main>

      {/* Editorial Page Footer */}
      <footer className="border-t border-black/[0.08] bg-[#f4f4f2] py-16 px-6 sm:px-10 lg:px-16 text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              SOHAG •
            </span>
            <p className="text-xs font-mono text-black/50 tracking-wider uppercase">
              Aspiring Full-Stack Developer • Based in Bangladesh
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-widest uppercase">
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-1.5 font-bold text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity"
            >
              <span>Book a Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={contactConfig.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-black transition-colors"
            >
              Resume
            </a>

            <a
              href="#home"
              className="text-black/60 hover:text-black transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-black/40 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} SOHAG. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED WITH PRECISION &amp; MODERN ARCHITECTURE</span>
        </div>
      </footer>
    </div>
  );
}
