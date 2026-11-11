/**
 * Personal Developer Portfolio Content Data
 * Truthful, non-fabricated milestones and learning areas.
 */

export const aboutData = {
  sectionNumber: "02",
  tag: "ABOUT ME",
  heading: "A LITTLE ABOUT ME",
  lead: "I am an aspiring full-stack developer based in Bangladesh, currently dedicated to learning, building, and refining modern web applications step by step.",
  paragraphs: [
    "My journey into web development began with curiosity about how interactive experiences on the web are engineered. What started with understanding HTML and CSS structure soon grew into writing JavaScript and discovering the power of component-driven architectures.",
    "I believe in deliberate practice, building hands-on projects, and writing clean, understandable code. Rather than rushing through frameworks, I take the time to understand core web fundamentals, accessibility, and modern developer tooling.",
    "My goal is to continually develop my capabilities, contribute to real-world projects, and collaborate with teams where I can learn, grow, and solve meaningful problems.",
  ],
  traits: [
    {
      title: "Continuous Learner",
      desc: "Dedicated daily study habits, absorbing modern standards and best practices.",
    },
    {
      title: "Clean Code Mindset",
      desc: "Focusing on readability, modular component structure, and maintainability.",
    },
    {
      title: "Practical Builder",
      desc: "Transforming concepts into functional web applications through regular project work.",
    },
  ],
};

export const educationData = {
  sectionNumber: "03",
  tag: "ACADEMIC BACKGROUND",
  heading: "EDUCATION",
  description:
    "Academic milestones and ongoing university studies.",
  items: [
    {
      shortCode: "SSC",
      degree: "Secondary School Certificate (SSC)",
      institution: "Bharua Khali Model High School",
      status: "Completed",
    },
    {
      shortCode: "HSC",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Hajera Taju Degree College",
      status: "Completed",
    },
    {
      shortCode: "BSc",
      degree: "BSc in Computer Science",
      institution: "International Islamic University Chittagong (IIUC)",
      status: "Currently Pursuing",
    },
  ],
};

export const experienceData = {
  sectionNumber: "03",
  label: "OPEN TO OPPORTUNITIES",
  heading: "EXPERIENCE",
  paragraphs: [
    "I haven't had the opportunity to work with real clients yet, but I've been building my skills through personal projects and hands-on development.",
    "Each project has helped me improve my problem-solving abilities, explore new technologies, and turn ideas into working applications.",
    "I'm now looking for an opportunity to work on real-world projects, contribute my skills, learn from practical experience, and prove what I can do.",
    "I may be at the beginning of my professional journey, but I'm ready to learn, work hard, and deliver my best.",
    "If you give me an opportunity, I'll do my best to turn your trust into meaningful results.",
  ],
  ctaText: "LET'S WORK TOGETHER",
  ctaHref: "/lets-talk",
};

/**
 * Numbered Accordion Data for Section 06
 * Clearly distinguishes technologies applied in projects vs. currently learning.
 */
export const skillsAccordionData = [
  {
    number: "01",
    title: "Frontend Frameworks & UI",
    category: "React, Next.js & Tailwind CSS",
    status: "Used in Projects",
    description:
      "Building interactive, responsive interfaces with React hooks, Next.js App Router architecture, and utility-first Tailwind CSS styling across Dev Stack, FitLog, and BookNook.",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Core Languages & Web Standards",
    category: "HTML5, CSS3, JavaScript & TypeScript",
    status: "Used in Projects",
    description:
      "Writing semantic HTML5, modern Flexbox/Grid layouts, responsive mobile-first CSS, ES6+ JavaScript, and strongly-typed TypeScript components.",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Responsive Web Design"],
  },
  {
    number: "03",
    title: "Backend & Databases",
    category: "Node.js, Express.js & MongoDB",
    status: "Currently Learning",
    description:
      "Developing backend understanding by building REST APIs with Express.js and modeling document data in MongoDB as part of the ongoing BookNook project.",
    skills: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    number: "04",
    title: "Version Control & Workflow",
    category: "Git & GitHub",
    status: "Used in Projects",
    description:
      "Tracking code changes cleanly with Git branches, managing repositories on GitHub, and deploying frontend builds seamlessly.",
    skills: ["Git", "GitHub"],
  },
];
