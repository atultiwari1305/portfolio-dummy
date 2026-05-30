"use client";

import { useState, type MouseEvent } from "react";
import { copyText } from "@/lib/utils";
import { useToast } from "@/components/providers/ToastProvider";

interface Props {
  value: string;
  label?: string;
  toastMessage?: string;
  className?: string;
  inline?: boolean;
}

export function CopyButton({
  value,
  label = "copy",
  toastMessage,
  className,
  inline,
}: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copyText(value);
    setCopied(true);
    if (toastMessage) toast(toastMessage);
    setTimeout(() => setCopied(false), 1400);
  };

  if (inline) {
    return (
      <button
        onClick={handleClick}
        className={
          className ??
          "rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-faint transition-colors hover:border-accent hover:text-accent"
        }
      >
        {copied ? "copied ✓" : label}
      </button>
    );
  }

  return (
    <button onClick={handleClick} className={className}>
      {copied ? "copied ✓" : label}
    </button>
  );
}
