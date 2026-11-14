/**
 * Centralized Contact, Social & Booking Configuration
 * Single source of truth for all profile links across Hero and /lets-talk.
 */

const socialLinks = {
  facebook: "https://www.facebook.com/share/1LvbRBLoXv/",
  whatsapp: "https://wa.me/8801848475454",
  telegram: "https://t.me/NOSAD5",
  instagram: "https://www.instagram.com/shoo_hag",
  linkedin: "https://www.linkedin.com/in/nosadsattarsohag/",
  github: "https://github.com/sohag54",
  resume: "/Sohag_Resume.pdf",
};

export const contactConfig = {
  name: "Sohag",
  location: "Bangladesh",
  locationDetailed: "Dhaka, Bangladesh",
  timezone: "Bangladesh Standard Time (GMT+6)",
  role: "Aspiring Full-Stack Developer",

  // Official Meeting Booking Details
  booking: {
    title: "Book a Meeting",
    subtitle: "Free 30-min Consultation",
    duration: "30 minutes",
    availableDays: "Sunday – Saturday",
    availableTime: "9:00 AM – 11:30 PM",
    timezone: "Bangladesh Standard Time (GMT+6)",
    platform: "Google Meet",
    description:
      "A 30-minute conversation to explore your ideas, requirements, and potential projects. We'll discuss your vision, goals, and timeline.",
    googleCalendarUrl: "https://calendar.app.google/ay5RJLRKUvG7NXio6",
    ctaLabel: "BOOK A MEETING",
  },

  // Direct Communication Channels (Reuses single socialLinks source, no visible numbers/handles)
  channels: {
    whatsapp: {
      label: "WhatsApp",
      url: socialLinks.whatsapp,
      note: "Quick messages & direct chat",
      cta: "Chat on WhatsApp",
    },
    telegram: {
      label: "Telegram",
      url: socialLinks.telegram,
      note: "Instant direct messaging",
      cta: "Message on Telegram",
    },
  },

  // Global Social Links
  socials: socialLinks,
};
