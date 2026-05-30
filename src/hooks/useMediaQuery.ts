"use client";

import { useEffect, useState } from "react";

/** Subscribe to a media query and re-render on change. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
