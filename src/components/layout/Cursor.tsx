"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/useMediaQuery";

export function Cursor() {
  const fine = usePointerFine();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hot = t.closest("a, button, .mag, input, textarea");
      ring.dataset.hover = hot ? "true" : "false";
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 transition-[width,height,background-color,border-color] duration-200 ease-smooth data-[hover=true]:h-[46px] data-[hover=true]:w-[46px] data-[hover=true]:border-transparent data-[hover=true]:bg-accentSoft"
      />
    </>
  );
}
