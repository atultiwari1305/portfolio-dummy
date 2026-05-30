import { Reveal } from "./Reveal";

interface Props {
  index: string;
  eyebrow: string;
  title: string;
  sub?: string;
}

export function SectionHeading({ index, eyebrow, title, sub }: Props) {
  return (
    <>
      <Reveal>
        <div className="eyebrow mb-[18px]">
          <span className="text-faint">{index}</span> {eyebrow}
        </div>
      </Reveal>
      <Reveal>
        <h2 className="mb-3.5 max-w-[18ch] font-display text-[clamp(28px,4.6vw,48px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal>
          <p className="mb-[46px] max-w-[58ch] text-[clamp(14.5px,1.5vw,16px)] text-muted">
            {sub}
          </p>
        </Reveal>
      )}
    </>
  );
}
