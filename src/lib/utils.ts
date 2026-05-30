/** Tiny classnames joiner (clsx-lite). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Smooth-scroll to an element id, using Lenis when available. */
export function scrollToId(id: string): void {
  const el = document.querySelector(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -10 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** Copy text to clipboard with a graceful fallback. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* noop */
    }
    ta.remove();
    return true;
  }
}

/** Open a print-ready résumé generated from the resume data. */
export function openResume(): boolean {
  return window.open("/resume.pdf", "_blank", "noopener") !== null;
}
