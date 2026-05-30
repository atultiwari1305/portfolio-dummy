"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { useInView } from "framer-motion";
import {
  profile,
  skillCategories,
  projects,
  experiences,
  education,
  socials,
} from "@/data/resume";
import { scrollToId, openResume } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";

interface Entry {
  id: number;
  kind: "in" | "out";
  content: ReactNode;
}

const CHIPS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "architecture",
  "contact",
  "theme",
  "clear",
];

const SECTION_MAP: Record<string, string> = {
  about: "#about",
  skills: "#skills",
  experience: "#work",
  work: "#work",
  projects: "#projects",
  terminal: "#terminal",
  credentials: "#credentials",
  contact: "#contact",
};

export function Terminal() {
  const { toggle } = useTheme();
  const { toast } = useToast();
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });

  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const idRef = useRef(0);
  const booted = useRef(false);
  const reactId = useId();

  const nextId = () => ++idRef.current;
  const push = (kind: Entry["kind"], content: ReactNode) =>
    setEntries((e) => [...e, { id: nextId(), kind, content }]);

  // Boot sequence
  useEffect(() => {
    if (!inView || booted.current) return;
    booted.current = true;
    push(
      "out",
      <span>
        <span className="text-accent">{profile.name}</span> — interactive shell. Type{" "}
        <span className="text-accent">help</span> to see what I can do.
      </span>
    );
  }, [inView]);

  // Autoscroll
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [entries]);

  const run = (raw: string) => {
    const line = raw.trim();
    push(
      "in",
      <span>
        <span className="text-accent">guest@atul</span>
        <span className="text-faint">:~$</span> {line}
      </span>
    );
    if (!line) return;

    setHistory((h) => [...h, line]);
    setHistIdx(-1);

    const [cmd, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        push(
          "out",
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {[
              ["whoami", "who I am"],
              ["skills", "my stack"],
              ["projects", "what I built"],
              ["experience", "work history"],
              ["education", "where I studied"],
              ["architecture", "how Coon works"],
              ["contact", "reach me"],
              ["socials", "find me online"],
              ["resume", "open my résumé"],
              ["theme", "toggle light/dark"],
              ["goto <sec>", "jump to a section"],
              ["clear", "clear the screen"],
            ].map(([c, d]) => (
              <span key={c}>
                <span className="text-accent">{c}</span>
                <span className="text-faint"> — {d}</span>
              </span>
            ))}
          </div>
        );
        break;

      case "whoami":
        push(
          "out",
          <span>
            {profile.name} — Software Development Engineer based in {profile.location}.
            I build real-time, distributed and cloud-native systems. Currently shipping
            cloud-PC streaming at Neverinstall.
          </span>
        );
        break;

      case "skills":
        push(
          "out",
          <div className="flex flex-col gap-1.5">
            {skillCategories.map((c) => (
              <div key={c.title}>
                <span className="text-accent">{c.title}: </span>
                <span className="text-muted">
                  {c.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        push(
          "out",
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <div key={p.name}>
                <span className="text-accent">▸ {p.name}</span>
                <div className="text-faint">{p.tech.join(" · ")}</div>
              </div>
            ))}
            <span className="text-faint">try: goto projects</span>
          </div>
        );
        break;

      case "experience":
      case "work":
        push(
          "out",
          <div className="flex flex-col gap-1.5">
            {experiences.map((e) => (
              <div key={e.company}>
                <span className="text-accent">{e.company}</span>
                <span className="text-muted"> — {e.role} </span>
                <span className="text-faint">({e.period})</span>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        push(
          "out",
          <div className="flex flex-col gap-1">
            {education.map((e) => (
              <div key={e.name}>
                <span className="text-ink">{e.name}</span>{" "}
                <span className="text-faint">— {e.sub}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        push(
          "out",
          <div className="flex flex-col gap-1">
            <span>
              <span className="text-faint">email </span>
              <a className="text-accent underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </span>
            <span>
              <span className="text-faint">phone </span>
              <span className="text-ink">+91 93369 80842</span>
            </span>
          </div>
        );
        break;

      case "socials":
        push(
          "out",
          <div className="flex flex-col gap-1">
            {socials
              .filter((s) => s.href.startsWith("http"))
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  {s.label}: {s.value}
                </a>
              ))}
          </div>
        );
        break;

      case "architecture":
      case "arch":
        push(
          "out",
          <div>
            <div className="mb-2 text-faint">
              Coon — a message from one client to another:
            </div>
            <div className="rounded-lg border border-line bg-bg2 p-3">
              <ArchitectureDiagram />
            </div>
          </div>
        );
        break;

      case "resume":
      case "cv":
        if (!openResume()) toast("Allow pop-ups to view the résumé");
        push("out", <span className="text-muted">opening résumé in a new tab…</span>);
        break;

      case "theme":
        toggle();
        push("out", <span className="text-muted">theme toggled.</span>);
        break;

      case "goto": {
        const target = SECTION_MAP[arg.toLowerCase()];
        if (target) {
          scrollToId(target);
          push("out", <span className="text-muted">navigating to {arg}…</span>);
        } else {
          push(
            "out",
            <span className="text-muted">
              unknown section. try: about, skills, projects, contact
            </span>
          );
        }
        break;
      }

      case "ls":
        push(
          "out",
          <span className="text-muted">
            about &nbsp; skills &nbsp; experience &nbsp; projects &nbsp; credentials
            &nbsp; contact
          </span>
        );
        break;

      case "echo":
        push("out", <span className="text-ink">{arg}</span>);
        break;

      case "sudo":
        push("out", <span className="text-muted">permission denied: nice try 😏</span>);
        break;

      case "coffee":
        push("out", <span className="text-muted">☕ brewing… done. now we can talk systems.</span>);
        break;

      case "clear":
        setEntries([]);
        break;

      default:
        push(
          "out",
          <span className="text-muted">
            command not found: {cmd}. type <span className="text-accent">help</span>.
          </span>
        );
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setValue(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setValue("");
      } else {
        setHistIdx(idx);
        setValue(history[idx]);
      }
    }
  };

  return (
    <section id="terminal" className="px-[clamp(18px,5vw,48px)] py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content">
        <SectionHeading
          index="05"
          eyebrow="Terminal"
          title="Poke around the shell."
          sub="A real interactive terminal — type a command or tap a chip. Try `architecture` to see how my messaging platform routes a packet end-to-end."
        />

        <Reveal>
          <div
            ref={wrapRef}
            onClick={() => inputRef.current?.focus()}
            className="overflow-hidden rounded-[14px] border border-lineStrong bg-bg2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
          >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-faint/60" />
              <span className="h-3 w-3 rounded-full bg-faint/40" />
              <span className="h-3 w-3 rounded-full bg-accent" />
              <span className="ml-2 font-mono text-[11.5px] text-muted">
                guest@atul: ~/portfolio
              </span>
              <span className="ml-auto font-mono text-[10px] text-accent">● live</span>
            </div>

            {/* body */}
            <div
              ref={bodyRef}
              className="h-[360px] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed"
            >
              {entries.map((e) => (
                <div
                  key={e.id}
                  className={e.kind === "out" ? "mb-3 text-muted" : "mb-1 text-ink"}
                >
                  {e.content}
                </div>
              ))}

              {/* input line */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-[12.5px]">
                  <span className="text-accent">guest@atul</span>
                  <span className="text-faint">:~$</span>
                </span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(ev) => setValue(ev.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                  aria-describedby={reactId}
                  className="flex-1 bg-transparent font-mono text-[12.5px] text-ink caret-transparent outline-none"
                />
                <span className="pointer-events-none -ml-2 inline-block h-[1.05em] w-[8px] animate-blink bg-accent" />
              </div>
            </div>

            {/* chips */}
            <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
              <span id={reactId} className="sr-only">
                Quick commands
              </span>
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    run(c);
                    inputRef.current?.focus();
                  }}
                  className="rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-[10.5px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
