import { education, certifications } from "@/data/resume";
import type { CredentialItem } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Column({ title, items }: { title: string; items: CredentialItem[] }) {
  return (
    <Reveal>
      <h4 className="mb-[18px] font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
        {title}
      </h4>
      {items.map((it) => (
        <div
          key={it.name}
          className="flex justify-between gap-4 border-t border-line py-[15px] first:border-t-0"
        >
          <div>
            <div className="text-[14.5px] text-ink">{it.name}</div>
            <div className="mt-0.5 font-mono text-[11px] text-faint">{it.sub}</div>
          </div>
          <div className="whitespace-nowrap text-right font-mono text-[11px] text-accent">
            {it.meta}
          </div>
        </div>
      ))}
    </Reveal>
  );
}

export function Credentials() {
  return (
    <section id="credentials" className="px-[clamp(18px,5vw,48px)] py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content">
        <SectionHeading
          index="06"
          eyebrow="Credentials"
          title="Education & certifications."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Column title="Education" items={education} />
          <Column title="Certifications" items={certifications} />
        </div>
      </div>
    </section>
  );
}
