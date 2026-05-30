"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { usePointerFine } from "@/hooks/useMediaQuery";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  target,
  rel,
  ariaLabel,
  strength = 0.3,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const fine = usePointerFine();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: MouseEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * (strength + 0.1));
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: sx, y: sy },
    className,
    "aria-label": ariaLabel,
    onClick,
  };

  if (href) {
    return (
      <motion.a {...shared} href={href} target={target} rel={rel}>
        {children}
      </motion.a>
    );
  }
  return <motion.button {...shared}>{children}</motion.button>;
}
