"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 68%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="work" className="px-[clamp(18px,5vw,48px)] py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where the work happened."
          sub="Hover a card to expand the detail."
        />

        <div ref={timelineRef} className="relative">
          <div className="absolute bottom-1.5 left-[11px] top-1.5 w-[1.5px] bg-line">
            <motion.span
              style={{ height }}
              className="absolute left-0 top-0 block w-full bg-accent"
            />
          </div>

          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05} className="group relative pb-[38px] pl-[46px] last:pb-0">
              <span className="absolute left-1 top-[5px] z-[2] h-4 w-4 rounded-full border-[1.5px] border-accent bg-bg shadow-[0_0_0_4px_var(--accent-soft)] transition-all duration-400 ease-smooth" />
              <div className="rounded-[14px] border border-line bg-panel px-6 py-[22px] transition-all duration-300 ease-smooth hover:translate-x-1 hover:border-lineStrong">
                <div className="flex flex-wrap items-baseline justify-between gap-3.5">
                  <div className="font-display text-[18px] font-semibold tracking-[-0.01em]">
                    <span className="text-accent">{exp.company}</span> · {exp.role}
                  </div>
                  <div className="whitespace-nowrap font-mono text-[11px] text-faint">
                    {exp.period}
                  </div>
                </div>
                <div className="mb-3.5 mt-1 font-mono text-[11px] text-muted">
                  {exp.location}
                </div>
                <ul className="flex max-h-0 flex-col gap-2 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 ease-smooth group-hover:max-h-[280px] group-hover:opacity-100 group-focus-within:max-h-[280px] group-focus-within:opacity-100 max-[860px]:max-h-[280px] max-[860px]:opacity-100">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="relative pl-[18px] text-[14px] text-muted">
                      <span className="absolute left-0 top-[9px] h-[5px] w-[5px] rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-bg2 px-[9px] py-1 font-mono text-[10px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
