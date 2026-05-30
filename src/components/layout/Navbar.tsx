"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/resume";
import { useTheme } from "@/components/providers/ThemeProvider";
import { scrollToId, openResume, cn } from "@/lib/utils";
import { useToast } from "@/components/providers/ToastProvider";
import {
  SunIcon,
  MoonIcon,
  SearchIcon,
  DownloadIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/Icons";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  const handleResume = () => {
    if (!openResume()) toast("Allow pop-ups to view the résumé");
  };

  const iconBtn =
    "mag grid h-9 w-9 place-items-center rounded-[9px] border border-line bg-panel text-ink transition-colors hover:border-lineStrong hover:text-accent";

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[800] flex items-center justify-between border-b border-transparent transition-all duration-400 ease-smooth",
        scrolled
          ? "border-line bg-bg/75 px-[clamp(18px,5vw,48px)] py-[13px] backdrop-blur-[16px] backdrop-saturate-150"
          : "px-[clamp(18px,5vw,48px)] py-5"
      )}
    >
      <button
        onClick={() => handleNav("#hero")}
        className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-[-0.01em]"
      >
        <span className="h-[7px] w-[7px] rounded-full bg-accent" />
        Atul Tiwari
      </button>

      <div
        className={cn(
          "flex items-center gap-0.5 max-[880px]:fixed max-[880px]:inset-0 max-[880px]:z-[799] max-[880px]:flex-col max-[880px]:justify-center max-[880px]:gap-3.5 max-[880px]:bg-bg/95 max-[880px]:backdrop-blur-[18px] max-[880px]:transition-transform max-[880px]:duration-500 max-[880px]:ease-smooth",
          open ? "max-[880px]:translate-x-0" : "max-[880px]:translate-x-full"
        )}
      >
        {navLinks.map((l) => (
          <button
            key={l.href}
            onClick={() => handleNav(l.href)}
            className="rounded-lg px-3 py-2 font-mono text-[12px] text-muted transition-colors hover:bg-panel hover:text-ink max-[880px]:font-display max-[880px]:text-[19px]"
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <button
          className={iconBtn}
          aria-label="Search"
          title="Search (⌘K)"
          onClick={() => window.dispatchEvent(new Event("open-cmdk"))}
        >
          <SearchIcon className="h-4 w-4" />
        </button>
        <button
          className={iconBtn}
          aria-label="Toggle theme"
          title="Toggle theme"
          onClick={toggle}
        >
          {theme === "dark" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={handleResume}
          className="mag flex items-center gap-[7px] rounded-[9px] border border-lineStrong bg-panel px-[15px] py-[9px] font-mono text-[12px] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          <span className="max-[880px]:hidden">Résumé</span>
        </button>
        <button
          className={cn(iconBtn, "hidden max-[880px]:grid")}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        </button>
      </div>

      <span className="sr-only">{profile.name}</span>
    </nav>
  );
}
