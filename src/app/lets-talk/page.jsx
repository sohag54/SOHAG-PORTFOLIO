"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Video,
  Globe,
  CalendarDays,
  Info,
} from "lucide-react";
import { contactConfig } from "@/config/contact";
import { WhatsAppIcon, TelegramIcon } from "@/components/SocialIcons";

export default function LetsTalkPage() {
  const { booking, channels, socials } = contactConfig;

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-[#111111] selection:bg-black selection:text-[#f4f4f2] flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#f4f4f2]/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          {/* Back to Portfolio Link */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-black hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>SOHAG • PORTFOLIO</span>
          </Link>

          {/* Top-Right Resume Button */}
          <a
            href={socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/25 px-5 py-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-1.5 active:scale-95"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-20 flex-1">
        {/* Editorial Hero Intro */}
        <div className="max-w-3xl space-y-5 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/[0.1] bg-white text-xs font-mono tracking-wider uppercase text-black/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{booking.subtitle}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-black leading-[0.95]">
            LET&apos;S TALK
          </h1>

          <p className="text-base sm:text-xl text-black/70 leading-relaxed font-normal">
            {booking.description}
          </p>
        </div>

        {/* Main Content Grid: Book a Meeting (7 cols) & Direct Contact Channels (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Prominent Book a Meeting Section + Honest Form Status (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Prominent Book a Meeting Card */}
            <section
              aria-labelledby="book-meeting-heading"
              className="rounded-3xl border border-black/[0.1] bg-white p-8 sm:p-10 md:p-12 shadow-sm space-y-8"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-black/50">
                    <Calendar className="w-4 h-4 text-black" />
                    <span>GOOGLE CALENDAR APPOINTMENT SCHEDULE</span>
                  </div>
                  <h2
                    id="book-meeting-heading"
                    className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black"
                  >
                    {booking.title}
                  </h2>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-[#f4f4f2] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-black">
                  <Video className="w-3.5 h-3.5" />
                  <span>{booking.platform}</span>
                </span>
              </div>

              {/* Confirmed Availability & Session Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-black/[0.06] bg-[#f4f4f2]/70 p-4 space-y-1">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Meeting Duration</span>
                  </span>
                  <p className="text-sm sm:text-base font-bold text-black">
                    {booking.duration}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-[#f4f4f2]/70 p-4 space-y-1">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/50">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Available Days</span>
                  </span>
                  <p className="text-sm sm:text-base font-bold text-black">
                    {booking.availableDays}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-[#f4f4f2]/70 p-4 space-y-1">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Available Time</span>
                  </span>
                  <p className="text-sm sm:text-base font-bold text-black">
                    {booking.availableTime}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-[#f4f4f2]/70 p-4 space-y-1">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/50">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Time Zone</span>
                  </span>
                  <p className="text-sm sm:text-base font-bold text-black">
                    {booking.timezone}
                  </p>
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-black/[0.06] bg-[#f4f4f2]/70 p-4 flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/50">
                    <Video className="w-3.5 h-3.5" />
                    <span>Platform</span>
                  </span>
                  <p className="text-sm sm:text-base font-bold text-black">
                    {booking.platform}
                  </p>
                </div>
              </div>

              {/* Prominent Google Calendar Booking CTA */}
              <div className="pt-2">
                <a
                  href={booking.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-black text-white px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase hover:bg-black/85 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-md"
                >
                  <span>{booking.ctaLabel}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
                    →
                  </span>
                </a>
              </div>
            </section>

            {/* Honest Notice Regarding Direct Web Form Availability */}
            <section
              aria-label="Contact Form Status"
              className="rounded-3xl border border-black/[0.08] bg-white/60 p-6 sm:p-8 space-y-3"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-black/70 font-semibold">
                <Info className="w-4 h-4 text-black/60 shrink-0" />
                <span>Direct Web Form Status</span>
              </div>
              <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                A built-in contact form backend is not yet connected, so
                on-page form submissions are disabled to avoid lost messages.
                Please use{" "}
                <strong className="text-black">Book a Meeting</strong> above or
                reach out directly via{" "}
                <strong className="text-black">WhatsApp</strong> or{" "}
                <strong className="text-black">Telegram</strong> for immediate
                communication.
              </p>
            </section>
          </div>

          {/* Right Column: Direct Contact Options (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-xs font-mono tracking-[0.25em] uppercase text-black/50">
              {"// Direct Contact Methods"}
            </h2>

            {/* 1. WhatsApp Card (High-Contrast Dark Editorial Style) */}
            <a
              href={channels.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border border-black bg-[#111111] text-white p-6 sm:p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl border border-white/15 bg-white/10 flex items-center justify-center text-white">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/80">
                  <span>Direct Chat</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  {channels.whatsapp.label}
                </h3>
                <p className="text-xs font-mono text-white/60">
                  {channels.whatsapp.note}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold tracking-widest uppercase text-white">
                <span>{channels.whatsapp.cta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                  →
                </span>
              </div>
            </a>

            {/* 2. Telegram Card (Crisp White Outlined Editorial Style) */}
            <a
              href={channels.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border border-black/[0.12] bg-white text-black p-6 sm:p-8 shadow-sm hover:border-black hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl border border-black/10 bg-[#f4f4f2] flex items-center justify-center text-black">
                  <TelegramIcon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black/70">
                  <span>Instant</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
                  {channels.telegram.label}
                </h3>
                <p className="text-xs font-mono text-black/60">
                  {channels.telegram.note}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.08] flex items-center justify-between text-xs font-bold tracking-widest uppercase text-black">
                <span>{channels.telegram.cta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                  →
                </span>
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.08] py-8 text-center text-xs font-mono text-black/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="hover:text-black transition-colors uppercase"
          >
            ← Back to Home
          </Link>
          <span>© {new Date().getFullYear()} SOHAG • ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
}
