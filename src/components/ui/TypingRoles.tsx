"use client";

import { useEffect, useRef, useState } from "react";

export function TypingRoles({ roles }: { roles: string[] }) {
  const [text, setText] = useState("");
  const state = useRef({ roleIndex: 0, charIndex: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      const s = state.current;
      const word = roles[s.roleIndex];
      setText(word.substring(0, s.charIndex));

      if (!s.deleting) {
        s.charIndex++;
        if (s.charIndex > word.length) {
          s.deleting = true;
          timer = setTimeout(loop, 1500);
          return;
        }
      } else {
        s.charIndex--;
        if (s.charIndex < 0) {
          s.deleting = false;
          s.roleIndex = (s.roleIndex + 1) % roles.length;
          s.charIndex = 0;
        }
      }
      timer = setTimeout(loop, s.deleting ? 40 : 85);
    };

    timer = setTimeout(loop, 600);
    return () => clearTimeout(timer);
  }, [roles]);

  return (
    <span className="font-mono text-[clamp(14px,2vw,18px)] text-muted">
      <span className="text-accent">{"›"}</span>{" "}
      <span className="text-ink">{text}</span>
      <span className="ml-[3px] inline-block h-[1em] w-[8px] translate-y-[2px] animate-blink bg-accent align-middle" />
    </span>
  );
}
