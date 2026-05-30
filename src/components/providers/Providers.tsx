"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SmoothScroll } from "./SmoothScroll";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ToastProvider>
    </ThemeProvider>
  );
}
