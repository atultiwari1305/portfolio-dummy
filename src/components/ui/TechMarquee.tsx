"use client";

import { techIcons, type TechIcon } from "@/data/techIcons";

const ROW_ONE = techIcons.slice(0, 9);
const ROW_TWO = techIcons.slice(9);

function Chip({ icon }: { icon: TechIcon }) {
  return (
    <div className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-panel px-4 py-2.5 transition-colors duration-300 hover:border-accent">
      <svg
        viewBox="0 0 24 24"
        className="h-[22px] w-[22px] text-faint transition-colors duration-300 group-hover:text-accent"
        aria-hidden
      >
        {icon.stroke ? (
          <path
            d={icon.path}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path d={icon.path} fill="currentColor" />
        )}
      </svg>
      <span className="font-mono text-[13px] text-muted transition-colors duration-300 group-hover:text-ink">
        {icon.name}
      </span>
    </div>
  );
}

function Row({ items, reverse }: { items: TechIcon[]; reverse?: boolean }) {
  return (
    <div className="marquee-row marquee-mask overflow-hidden py-1.5">
      <div
        className={`marquee-track ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
        aria-hidden
      >
        {items.map((i) => (
          <Chip key={i.name} icon={i} />
        ))}
        {items.map((i) => (
          <Chip key={`${i.name}-dup`} icon={i} />
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div
      role="img"
      aria-label={`Technologies I work with: ${techIcons
        .map((t) => t.name)
        .join(", ")}`}
      className="flex flex-col gap-3"
    >
      <Row items={ROW_ONE} />
      <Row items={ROW_TWO} reverse />
    </div>
  );
}
