"use client";

import { projects } from "@/data/resume";
import type { Project, ProjectLink } from "@/types";
import { scrollToId, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ChatMock } from "@/components/ui/ChatMock";
import {
  GithubIcon,
  ChartIcon,
  ExternalIcon,
  PlusCircleIcon,
} from "@/components/ui/Icons";

function LinkIcon({ icon }: { icon: ProjectLink["icon"] }) {
  const cls = "h-[13px] w-[13px]";
  if (icon === "code") return <GithubIcon className={cls} />;
  if (icon === "chart") return <ChartIcon className={cls} />;
  if (icon === "plus") return <PlusCircleIcon className={cls} />;
  return <ExternalIcon className={cls} />;
}

const DSA_BARS = [45, 72, 38, 90, 58, 78, 32, 85, 52, 68, 42, 80];

function Visual({ project }: { project: Project }) {
  if (project.visual === "chat") {
    return (
      <div className="flex h-[230px] items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-bg2 to-panel">
        <ChatMock />
      </div>
    );
  }
  if (project.visual === "bars") {
    return (
      <div className="relative h-[200px] overflow-hidden border-b border-line bg-gradient-to-br from-bg2 to-panel">
        <div className="absolute inset-0 flex items-end justify-center gap-[5px] px-7 pb-[26px] pt-8">
          {DSA_BARS.map((h, i) => (
            <div
              key={i}
              className="w-[15px] animate-dsaPulse rounded-t-[3px] bg-accent/80"
              style={{ height: `${h}%`, animationDelay: `${i * 0.13}s` }}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-[200px] overflow-hidden border-b border-line bg-gradient-to-br from-bg2 to-panel">
      <div className="absolute inset-0 grid place-items-center text-center font-mono text-[12px] tracking-[0.18em] text-faint">
        <div>
          <b className="mb-2 block text-[26px] font-normal text-accent">{"{ … }"}</b>
          NEXT BUILD
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-[clamp(18px,5vw,48px)] py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content">
        <SectionHeading index="04" eyebrow="Projects" title="Things I shipped." />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 2) * 0.06}
              className={cn(p.featured && "md:col-span-2")}
            >
              <TiltCard className="overflow-hidden rounded-[18px] border border-line bg-panel transition-colors hover:border-lineStrong">
                <Visual project={p} />
                <div className="px-[26px] py-6">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
                    {p.tag}
                  </span>
                  <h3 className="mb-3 mt-[7px] font-display text-[23px] font-semibold tracking-[-0.02em]">
                    {p.name}
                  </h3>
                  <p className="mb-4 max-w-[64ch] text-[14px] text-muted">
                    {p.description}
                  </p>
                  <div className="mb-[18px] flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-bg2 px-[9px] py-1 font-mono text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2.5">
                    {p.links.map((l) =>
                      l.href.startsWith("#") ? (
                        <button
                          key={l.label}
                          onClick={() => scrollToId(l.href)}
                          className="mag inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg2 px-[13px] py-2 font-mono text-[11.5px] text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          <LinkIcon icon={l.icon} /> {l.label}
                        </button>
                      ) : (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mag inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg2 px-[13px] py-2 font-mono text-[11.5px] text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          <LinkIcon icon={l.icon} /> {l.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
