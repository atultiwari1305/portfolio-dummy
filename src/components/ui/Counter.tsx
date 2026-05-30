"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  to: number;
  suffix?: string;
  decimals?: number;
}

export function Counter({ to, suffix = "", decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {decimals ? val.toFixed(decimals) : Math.floor(val)}
      {suffix}
    </span>
  );
}
