"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import {
  FacebookIcon,
  WhatsAppIcon,
  TelegramIcon,
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
  ResumeIcon,
} from "./SocialIcons";
import { contactConfig } from "@/config/contact";

export default function Hero() {
  const socials = [
    {
      name: "Facebook",
      href: contactConfig.socials.facebook,
      icon: FacebookIcon,
      ariaLabel: "Facebook Profile",
    },
    {
      name: "WhatsApp",
      href: contactConfig.socials.whatsapp,
      icon: WhatsAppIcon,
      ariaLabel: "WhatsApp Direct",
    },
    {
      name: "Telegram",
      href: contactConfig.socials.telegram,
      icon: TelegramIcon,
      ariaLabel: "Telegram Contact",
    },
    {
      name: "Instagram",
      href: contactConfig.socials.instagram,
      icon: InstagramIcon,
      ariaLabel: "Instagram Profile",
    },
    {
      name: "LinkedIn",
      href: contactConfig.socials.linkedin,
      icon: LinkedInIcon,
      ariaLabel: "LinkedIn Profile",
    },
    {
      name: "GitHub",
      href: contactConfig.socials.github,
      icon: GitHubIcon,
      ariaLabel: "GitHub Profile",
    },
    {
      name: "Resume",
      href: contactConfig.socials.resume,
      icon: ResumeIcon,
      ariaLabel: "Download Resume",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[1080px] bg-[#f4f4f2] text-[#111111] pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Paper / Grain Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Two-Line Heading with Exactly Layered Centered Portrait Cutout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto text-center select-none pt-2 sm:pt-4">
        {/* Line 1: Completely visible, sits in front, zero overlap */}
        <h1 className="relative z-10 text-[12.8vw] sm:text-[11.8vw] lg:text-[10.6vw] font-black tracking-tighter leading-[0.82] uppercase text-black">
          EXPLORE MY
        </h1>

        {/* Line 2 Container: PORTFOLIO with vertical fade, partially overlapped in center by hair */}
        <div className="relative z-10">
          <h2 className="text-[12.8vw] sm:text-[11.8vw] lg:text-[10.6vw] font-black tracking-tighter leading-[0.82] uppercase bg-gradient-to-b from-black via-black/45 to-transparent bg-clip-text text-transparent">
            PORTFOLIO
          </h2>

          {/* Portrait Cutout: Sized at ~42-45% desktop, positioned so hair starts in lower half of PORTFOLIO */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[22%] sm:top-[20%] lg:top-[18%] z-20 pointer-events-none w-[270px] sm:w-[370px] md:w-[450px] lg:w-[520px] xl:w-[580px] max-w-[88vw] aspect-[1024/825] [mask-image:linear-gradient(to_bottom,black_65%,transparent_96%)]">
            <Image
              src="/sohag-cutout.png"
              alt="Sohag — Personal Developer Portrait"
              fill
              priority
              sizes="(max-width: 640px) 270px, (max-width: 1024px) 450px, 580px"
              className="object-contain object-top grayscale contrast-[1.08] brightness-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Middle Grid: Left Scroll Guide & Right Developer Narrative */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pointer-events-auto pb-4">
        {/* Left Side: Exact Reference Capsule Track + SCROLL DOWN Label + Circular Arrow */}
        <div className="hidden lg:flex lg:col-span-3 flex-col items-start space-y-3 pb-2">
          {/* Tall slender hollow capsule track from reference */}
          <div className="w-5 h-36 border-x border-b border-black rounded-b-full relative overflow-hidden flex justify-center py-2">
            <div className="w-[1.5px] h-12 bg-black/60 animate-pulse rounded-full" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-black font-semibold">
            SCROLL DOWN
          </span>

          {/* Circular outlined arrow button */}
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 active:scale-95"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Center Space Reserved for Portrait on Desktop (6 cols) */}
        <div className="hidden lg:block lg:col-span-6 h-48 pointer-events-none" />

        {/* Right Side: Horizontal rule, 3-line intro, BANGLADESH 🇧🇩, and LET'S TALK → */}
        <div className="lg:col-span-3 flex flex-col justify-end space-y-5 lg:pl-6 text-left pb-2">
          {/* Short Horizontal Line */}
          <div className="w-11 h-[1.5px] bg-black" />

          {/* Intro Text */}
          <p className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black leading-relaxed">
            ASPIRING FULL-STACK DEVELOPER
            <br />
            TURNING IDEAS INTO REALITY
            <br />
            ONE LINE AT A TIME.
          </p>

          {/* Location with Pin icon and "BANGLADESH 🇧🇩" */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold tracking-wider uppercase text-black">
            <MapPin className="w-3.5 h-3.5 fill-black text-black shrink-0" />
            <span>BANGLADESH 🇧🇩</span>
          </div>

          {/* CTA: LET'S TALK → */}
          <div className="pt-1">
            <Link
              href="/lets-talk"
              className="group inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-all duration-300"
            >
              <span>LET&apos;S TALK</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
                →
              </span>
            </Link>
          </div>

          {/* Mobile scroll indicator fallback */}
          <div className="flex lg:hidden items-center gap-2 pt-2 text-black/60">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[10px] font-mono tracking-widest uppercase">
              Scroll down to explore
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Seven Outlined Social Buttons on Bottom-Left & Label on Bottom-Right */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Seven small rounded-square outlined buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {socials.map((social) => {
            const Icon = social.icon;
            const isExternal = !social.href.startsWith("#");
            return (
              <a
                key={social.name}
                href={social.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={social.ariaLabel}
                title={social.name}
                className="group w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-black bg-transparent text-black hover:bg-black hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center"
              >
                <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            );
          })}
        </div>

        {/* Bottom Right Minimal Label */}
        <div className="text-[10px] font-mono tracking-widest uppercase text-black/40">
          SOHAG • DEVELOPER PORTFOLIO
        </div>
      </div>
    </section>
  );
}
