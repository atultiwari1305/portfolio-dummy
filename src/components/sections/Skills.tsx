import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechMarquee } from "@/components/ui/TechMarquee";

const ALSO = [
  "SQL",
  "REST APIs",
  "System Design",
  "Distributed Systems",
  "Microservices",
];

export function Skills() {
  return (
    <section id="skills" className="py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content px-[clamp(18px,5vw,48px)]">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The stack I build with."
          sub="A living snapshot of the tools I reach for. Hover to pause the marquee — hover a chip to light it up."
        />
      </div>

      <Reveal className="my-2">
        <TechMarquee />
      </Reveal>

      <div className="mx-auto w-full max-w-content px-[clamp(18px,5vw,48px)]">
        <p className="mt-9 text-center font-mono text-[12px] text-faint">
          <span className="text-muted">plus&nbsp;&nbsp;</span>
          {ALSO.join("\u00a0\u00a0·\u00a0\u00a0")}
        </p>
      </div>
    </section>
  );
}
