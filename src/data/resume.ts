import type {
  Profile,
  NavLink,
  Stat,
  SkillCategory,
  ExperienceItem,
  Project,
  CredentialItem,
  SocialLink,
} from "@/types";

export const profile: Profile = {
  name: "Atul Kumar Tiwari",
  firstName: "Atul Kumar",
  lastName: "Tiwari",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Android Developer",
    "Systems Engineer",
    "Platform Engineer",
  ],
  tagline:
    "I build real-time, distributed and cloud-native systems — from low-latency messaging to cloud-PC streaming. Currently an SDE at Neverinstall.",
  email: "atulrajtiwari098@gmail.com",
  phone: "+919336980842",
  github: "github.com/atultiwari1305",
  githubUrl: "https://github.com/atultiwari1305",
  linkedin: "linkedin.com/in/atultiwari1305",
  linkedinUrl: "https://linkedin.com/in/atultiwari1305",
  location: "Mau / Bengaluru, India",
  availability: "Available for SDE roles · Bengaluru / Remote",
  currentlyBuilding:
    "cloud-PC streaming at Neverinstall — Android + web, end-to-end.",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "technologies used" },
  { value: 2, label: "professional roles" },
  { value: 8.63, decimals: 1, label: "CGPA / 10" },
  { value: 500, suffix: "+", label: "DSA problems solved" },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 88 },
      { name: "Kotlin", level: 80 },
      { name: "C++", level: 76 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 78 },
    ],
  },
  {
    title: "Frameworks & Data",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Node", level: 85 },
      { name: "Express", level: 84 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "Redis", level: 84 },
      { name: "Socket.io", level: 85 },
    ],
  },
  {
    title: "Cloud · Concepts · Mobile",
    skills: [
      { name: "AWS", level: 78 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 72 },
      { name: "Microservices", level: 78 },
      { name: "System Design", level: 82 },
      { name: "Distributed", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "Android", level: 80 },
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Neverinstall",
    role: "SDE Intern",
    location: "Bengaluru, India",
    period: "Jan 2026 — Present",
    current: true,
    bullets: [
      "Built the complete UI/UX for the Android APK and client web platform of a real-time cloud-PC streaming system (Kotlin, Java, Next.js).",
      "Shipped frontend & backend features — support portal, API integrations, production bug fixes and streaming workflows.",
      "Developed SEO-focused static pages; led end-to-end feature delivery, testing and client integration across teams.",
    ],
    tags: ["Kotlin", "Java", "Next.js", "Cloud Streaming", "API Integration"],
  },
  {
    company: "Outlier",
    role: "AI Model Trainer",
    location: "Remote",
    period: "Oct 2024 — Mar 2025",
    bullets: [
      "Trained AI models across Java, Python, C++ and JavaScript via complex coding, debugging and reasoning tasks.",
      "Improved model response quality through prompt engineering, algorithmic problem-solving and code-correctness evaluation.",
      "Worked on functional-programming tasks and structured data-annotation pipelines for large-scale model improvement.",
    ],
    tags: ["Prompt Engineering", "Python", "C++", "Code Evaluation"],
  },
];

export const projects: Project[] = [
  {
    name: "Coon — Real-Time Messaging Platform",
    tag: "Flagship · Real-time",
    description:
      "A scalable real-time messaging platform with anonymous identity and persistent chat history. WebSocket communication over Socket.io is backed by Redis caching and MongoDB persistence for low-latency delivery — with dynamic channels, role-based permissions and admin moderation. (Tip: type `architecture` in the terminal below to see how it works.)",
    tech: ["React", "Node", "Express", "MongoDB", "Socket.io", "Redis"],
    visual: "chat",
    featured: true,
    links: [
      { label: "Code", href: "https://github.com/atultiwari1305", icon: "code" },
      { label: "Live demo", href: "https://github.com/atultiwari1305", icon: "external" },
    ],
  },
  {
    name: "DSA Visualizer",
    tag: "Desktop · Visualization",
    description:
      "An interactive JavaFX desktop app that visualizes data structures and algorithms in real time — animated sorting, searching, BST, AVL, heap, queue and stack on a modular architecture.",
    tech: ["Java", "JavaFX", "Algorithms"],
    visual: "bars",
    links: [
      { label: "Code", href: "https://github.com/atultiwari1305", icon: "code" },
    ],
  },
  {
    name: "Distributed Systems Lab",
    tag: "In progress",
    description:
      "Turning system-design theory into runnable services — consensus, sharded caches and event-driven microservices. More soon.",
    tech: ["Go / Node", "Kafka", "Docker", "K8s"],
    visual: "soon",
    links: [
      { label: "Follow", href: "https://github.com/atultiwari1305", icon: "plus" },
    ],
  },
];

export const education: CredentialItem[] = [
  {
    name: "Lovely Professional University",
    sub: "B.Tech — Computer Science · CGPA 8.63",
    meta: "2022 — now",
  },
  {
    name: "Dalimss Sunbeam School",
    sub: "XII — PCM · 80%",
    meta: "2020 — 21",
  },
  {
    name: "Chandra Public School",
    sub: "X — Science · 94.2%",
    meta: "2018 — 19",
  },
];

export const certifications: CredentialItem[] = [
  {
    name: "Generative AI with LLMs",
    sub: "Coursera · DeepLearning.AI",
    meta: "Apr 2024",
  },
  {
    name: "Ethical Hacking",
    sub: "NPTEL",
    meta: "Oct 2024",
  },
];

export const socials: SocialLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail",
    copy: profile.email,
  },
  {
    label: "GitHub",
    value: profile.github,
    href: profile.githubUrl,
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: profile.linkedin,
    href: profile.linkedinUrl,
    icon: "linkedin",
  },
  {
    label: "Phone",
    value: "+91 93369 80842",
    href: `tel:${profile.phone}`,
    icon: "phone",
    copy: profile.phone,
  },
];
