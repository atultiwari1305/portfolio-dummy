import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-line px-[clamp(18px,5vw,48px)] py-[42px] text-center">
      <div className="mb-2 font-display text-[18px] font-semibold">
        {profile.name}
      </div>
      <p className="font-mono text-[11px] text-faint">
        Software Development Engineer · {profile.location} · © 2026
      </p>
    </footer>
  );
}
