import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Education from "@/components/Education";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Education — Sohag Portfolio",
  description:
    "Academic milestones of Sohag: SSC, HSC, and ongoing BSc in Computer Science.",
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f2] text-[#111111] selection:bg-black selection:text-[#f4f4f2] flex flex-col justify-between">
      {/* Global Minimal Navbar */}
      <Navbar />

      <main className="pt-20 flex-1">
        {/* Top Breadcrumb Strip on Warm Off-White Canvas */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-black/70 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-black/45">
            03 // EDUCATION
          </span>
        </div>

        {/* Dedicated Education Section */}
        <Education />
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

            <Link
              href="/"
              className="text-black/60 hover:text-black transition-colors"
            >
              Back to Home ↑
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

