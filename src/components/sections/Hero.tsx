"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/resume";
import { scrollToId, copyText } from "@/lib/utils";
import { useToast } from "@/components/providers/ToastProvider";
import { TypingRoles } from "@/components/ui/TypingRoles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRightIcon, CopyIcon } from "@/components/ui/Icons";

export function Hero() {
  const reduced = useReducedMotion();
  const { toast } = useToast();

  const lineVariant = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: 0,
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.1 },
    }),
  };

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center px-[clamp(18px,5vw,48px)] pt-[110px]"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 md:grid-cols-[1.25fr_0.75fr]">
        {/* left */}
        <div>
          <motion.div
            custom={0}
            variants={fade}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11.5px] text-muted"
          >
            <span className="h-1.5 w-1.5 animate-livePulse rounded-full bg-accent" />
            {profile.availability}
          </motion.div>

          <h1 className="mb-1.5 font-display text-[clamp(42px,7.6vw,88px)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <span className="block overflow-hidden">
              <motion.span
                custom={0}
                variants={lineVariant}
                initial={reduced ? false : "hidden"}
                animate="show"
                className="inline-block"
              >
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                custom={1}
                variants={lineVariant}
                initial={reduced ? false : "hidden"}
                animate="show"
                className="inline-block text-accent"
              >
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <div className="my-[18px] h-[1.5em]">
            <TypingRoles roles={profile.roles} />
          </div>

          <motion.p
            custom={1}
            variants={fade}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="mb-[30px] max-w-[44ch] text-[clamp(14.5px,1.6vw,16.5px)] text-muted"
          >
            I build{" "}
            <strong>real-time, distributed and cloud-native systems</strong> — from
            low-latency messaging to cloud-PC streaming. Currently an SDE at
            Neverinstall.
          </motion.p>

          <motion.div
            custom={2}
            variants={fade}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              onClick={() => scrollToId("#projects")}
              className="flex items-center gap-2.5 rounded-[10px] bg-white px-5 py-3 font-mono text-[13px] text-[#08090c]"
            >
              View work <ArrowRightIcon className="h-[15px] w-[15px]" />
            </MagneticButton>
            <MagneticButton
              onClick={async () => {
                await copyText(profile.email);
                toast("Email copied ✓");
              }}
              className="flex items-center gap-2.5 rounded-[10px] border border-lineStrong bg-panel px-5 py-3 font-mono text-[13px] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Copy email <CopyIcon className="h-[15px] w-[15px]" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* right — snapshot card (no tech list, avoids repetition with Skills) */}
        <motion.div
          custom={3}
          variants={fade}
          initial={reduced ? false : "hidden"}
          animate="show"
          className="panel-card max-w-[420px] p-6 backdrop-blur-[6px]"
        >
          {[
            { k: "role", v: "SDE · Full-Stack" },
            { k: "based in", v: profile.location },
            { k: "focus", v: "Real-time & distributed" },
          ].map((row) => (
            <div
              key={row.k}
              className="flex items-center justify-between border-t border-line py-3 text-[13.5px] first:border-t-0 first:pt-0"
            >
              <span className="font-mono text-[11px] tracking-[0.04em] text-faint">
                {row.k}
              </span>
              <span className="text-right text-[13px] text-ink">{row.v}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-line py-3 text-[13.5px]">
            <span className="font-mono text-[11px] tracking-[0.04em] text-faint">
              status
            </span>
            <span className="flex items-center text-[13px] text-ink">
              <span className="mr-1.5 h-[7px] w-[7px] animate-livePulse rounded-full bg-accent" />
              Open to work
            </span>
          </div>
          <div className="mt-4 border-t border-line pt-4 font-mono text-[11.5px] text-muted">
            Currently building <span className="text-accent">cloud-PC streaming</span>{" "}
            at Neverinstall — Android + web, end-to-end.
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-[clamp(18px,5vw,48px)] flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
        <span className="relative h-px w-[34px] overflow-hidden bg-faint">
          <span className="absolute inset-0 w-[40%] animate-slideLine bg-accent" />
        </span>
        Scroll to explore
      </div>
    </section>
  );
}
