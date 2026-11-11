"use client";

import { useState } from "react";
import { skillsAccordionData } from "@/data/portfolioData";
import { Plus, Minus } from "lucide-react";

export default function SkillsAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      id="skills"
      className="relative w-full bg-[#111111] py-20 sm:py-28 px-4 sm:px-8 lg:px-16"
    >
      {/* Clean White Editorial Container matching reference media_1794289100247_e8425db4.png */}
      <div className="max-w-7xl mx-auto rounded-3xl bg-white text-[#111111] p-8 sm:p-14 md:p-20 shadow-2xl">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20 space-y-3">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-black/45 block">
            06 // TECHNICAL SKILLS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            SKILLS &amp; LEARNING AREAS
          </h2>
          <p className="text-xs sm:text-sm text-black/55">
            An honest overview distinguishing technologies applied in built
            projects from backend technologies I am actively learning.
          </p>
        </div>

        {/* Two-Column Editorial Split matching reference media_1794289100247_e8425db4.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column Label */}
          <div className="lg:col-span-3 pt-2">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-black/45 block">
              CORE STACK
            </span>
          </div>

          {/* Right Column Numbered Accordion Rows */}
          <div className="lg:col-span-9 divide-y divide-black/10 border-t border-b border-black/10">
            {skillsAccordionData.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={item.number} className="group py-6 sm:py-8">
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="text-xs font-mono text-black/40 shrink-0">
                        {item.number}
                      </span>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-lg sm:text-2xl font-medium tracking-tight text-black group-hover:text-black/70 transition-colors">
                          {item.title}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                            item.status === "Currently Learning"
                              ? "border border-black/25 text-black/75 bg-black/[0.03]"
                              : "bg-black text-white"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* + / — Toggle Icon matching reference */}
                    <span className="w-8 h-8 flex items-center justify-center text-black/70 shrink-0 transition-transform duration-300">
                      {isOpen ? (
                        <Minus className="w-5 h-5 stroke-[1.5]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[1.5]" />
                      )}
                    </span>
                  </button>

                  {/* Smooth Expandable Content */}
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-10 sm:pl-14 space-y-4">
                      <p className="text-sm sm:text-base text-black/65 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>

                      {/* Skill Pills */}
                      <div className="flex flex-wrap gap-2 pt-1 pb-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-black/15 bg-[#f4f4f2] px-3.5 py-1 text-xs font-mono text-black/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

