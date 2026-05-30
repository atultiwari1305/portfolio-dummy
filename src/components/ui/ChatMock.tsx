"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Line =
  | { kind: "msg"; side: "me" | "them"; text: string }
  | { kind: "typing" };

const SCRIPT: Line[] = [
  { kind: "msg", side: "them", text: "anyone on the new build? 👀" },
  { kind: "msg", side: "me", text: "pushing it live now" },
  { kind: "typing" },
  { kind: "msg", side: "them", text: "latency looks insane — sub-50ms 🔥" },
  { kind: "msg", side: "me", text: "redis pub/sub doing the work" },
];

export function ChatMock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.3 });
  const [visible, setVisible] = useState<Line[]>([]);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    setVisible([]);

    const next = () => {
      if (i >= SCRIPT.length) {
        timer = setTimeout(() => {
          i = 0;
          setVisible([]);
          timer = setTimeout(next, 400);
        }, 2400);
        return;
      }
      const line = SCRIPT[i++];
      if (line.kind === "typing") {
        setVisible((v) => [...v, line]);
        timer = setTimeout(() => {
          setVisible((v) => v.filter((l) => l.kind !== "typing"));
          next();
        }, 900);
      } else {
        setVisible((v) => [...v.filter((l) => l.kind !== "typing"), line]);
        timer = setTimeout(next, 750);
      }
    };

    timer = setTimeout(next, 400);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div
      ref={wrapRef}
      className="w-[min(420px,86%)] overflow-hidden rounded-[14px] border border-lineStrong bg-bg shadow-[0_20px_50px_-28px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5 font-mono text-[11px] text-muted">
        <span className="h-2 w-2 rounded-full bg-accent" /> #general
        <span className="ml-auto text-[9px] text-accent">● live</span>
      </div>
      <div className="flex min-h-[128px] flex-col gap-2.5 p-3.5">
        {visible.map((line, idx) =>
          line.kind === "typing" ? (
            <div
              key={`typing-${idx}`}
              className="flex w-fit gap-1 rounded-xl rounded-bl-[3px] border border-line bg-panel2 px-3 py-2.5"
            >
              <span className="h-[5px] w-[5px] animate-typeDot rounded-full bg-faint" />
              <span className="h-[5px] w-[5px] animate-typeDot rounded-full bg-faint [animation-delay:0.2s]" />
              <span className="h-[5px] w-[5px] animate-typeDot rounded-full bg-faint [animation-delay:0.4s]" />
            </div>
          ) : (
            <div
              key={`${idx}-${line.text}`}
              className={
                line.side === "me"
                  ? "max-w-[78%] self-end rounded-xl rounded-br-[3px] bg-accent px-3 py-2 text-[12.5px] text-onAccent"
                  : "max-w-[78%] self-start rounded-xl rounded-bl-[3px] border border-line bg-panel2 px-3 py-2 text-[12.5px]"
              }
              style={{ animation: "bubIn 0.4s cubic-bezier(0.22,1,0.36,1)" }}
            >
              {line.text}
            </div>
          )
        )}
      </div>
      <style jsx>{`
        @keyframes bubIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
