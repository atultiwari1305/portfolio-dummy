"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/resume";
import { scrollToId, openResume, copyText, cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";

interface Action {
  icon: string;
  label: string;
  hint?: string;
  run: () => void;
}

export function CommandPalette() {
  const { toggle } = useTheme();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(
    () => [
      { icon: "›", label: "About", hint: "01", run: () => scrollToId("#about") },
      { icon: "›", label: "Skills", hint: "02", run: () => scrollToId("#skills") },
      { icon: "›", label: "Experience", hint: "03", run: () => scrollToId("#work") },
      { icon: "›", label: "Projects", hint: "04", run: () => scrollToId("#projects") },
      { icon: "›", label: "Terminal", hint: "05", run: () => scrollToId("#terminal") },
      { icon: "›", label: "Contact", hint: "07", run: () => scrollToId("#contact") },
      { icon: "◐", label: "Toggle theme", run: toggle },
      {
        icon: "↓",
        label: "Download résumé",
        run: () => {
          if (!openResume()) toast("Allow pop-ups to view the résumé");
        },
      },
      {
        icon: "@",
        label: "Copy email",
        run: async () => {
          await copyText(profile.email);
          toast("Email copied ✓");
        },
      },
      { icon: "", label: "Open GitHub", run: () => window.open(profile.githubUrl, "_blank") },
      { icon: "in", label: "Open LinkedIn", run: () => window.open(profile.linkedinUrl, "_blank") },
    ],
    [toggle, toast]
  );

  const filtered = useMemo(
    () => actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase())),
    [actions, query]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9500] flex items-start justify-center bg-black/45 pt-[15vh] backdrop-blur-[5px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(520px,92vw)] overflow-hidden rounded-[14px] border border-lineStrong bg-bg2 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onListKey}
              placeholder="Search or jump to…"
              className="w-full border-b border-line bg-transparent px-[18px] py-4 font-mono text-[14px] text-ink outline-none"
            />
            <div className="max-h-[300px] overflow-y-auto p-1.5">
              {filtered.map((a, i) => (
                <button
                  key={a.label}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    a.run();
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-[9px] px-3.5 py-3 text-left text-[13.5px]",
                    i === active
                      ? "bg-panel2 shadow-[inset_2px_0_0_var(--accent)]"
                      : "hover:bg-panel2"
                  )}
                >
                  <span className="w-[18px] text-center font-mono text-[12px] text-accent">
                    {a.icon}
                  </span>
                  <span>{a.label}</span>
                  {a.hint && (
                    <span className="ml-auto rounded-[5px] border border-line px-[7px] py-0.5 font-mono text-[9.5px] text-faint">
                      {a.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-4 border-t border-line px-[15px] py-2.5 font-mono text-[10px] text-faint">
              <span>↑↓ nav</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
