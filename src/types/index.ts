export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
}

export type ProjectVisual = "chat" | "bars" | "soon";

export interface ProjectLink {
  label: string;
  href: string;
  /** lucide-style icon key handled inside the component */
  icon: "code" | "chart" | "external" | "plus";
}

export interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
  featured?: boolean;
}

export interface CredentialItem {
  name: string;
  sub: string;
  meta: string;
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "github" | "linkedin" | "phone";
  copy?: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tagline: string;
  email: string;
  phone: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  location: string;
  availability: string;
  currentlyBuilding: string;
}
