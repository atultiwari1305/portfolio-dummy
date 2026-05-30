import { stats } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function About() {
  return (
    <section id="about" className="px-[clamp(18px,5vw,48px)] py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Engineer at the seam of systems and experience."
        />

        <div className="grid grid-cols-1 items-start gap-[54px] md:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <p className="mb-[22px] font-display text-[clamp(19px,2.3vw,26px)] font-medium leading-[1.4] tracking-[-0.01em]">
                A <em className="not-italic text-accent">Software Development Engineer</em>{" "}
                who works best in the messy middle — where{" "}
                <em className="not-italic text-accent">real-time data</em>,{" "}
                <em className="not-italic text-accent">distributed workflows</em> and a
                clean interface all have to agree.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mb-4 text-[15.5px] text-muted">
                At <strong>Neverinstall</strong> I own the UI/UX for an Android APK and
                the client-facing web platform of a real-time cloud-PC streaming system —
                shipping streaming workflows, API integrations, production fixes and SEO
                pages end-to-end across cross-functional teams.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[15.5px] text-muted">
                Before that I trained large language models at <strong>Outlier</strong>{" "}
                across Java, Python, C++ and JavaScript, improving response quality
                through algorithmic problem-solving and code-correctness evaluation. I&apos;m
                a B.Tech CSE student at LPU who learns fastest by shipping.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-bg2 p-5 transition-colors hover:bg-panel2"
                >
                  <b className="block font-display text-[clamp(30px,4vw,40px)] font-semibold leading-none">
                    <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </b>
                  <div className="mt-[7px] font-mono text-[11px] tracking-[0.02em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
