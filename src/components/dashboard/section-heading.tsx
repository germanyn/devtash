"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  label: string;
  /** Whether the section list starts visible. Defaults to true. */
  defaultExpanded?: boolean;
  /** Rail mode: hide the header entirely, always show children. */
  collapsed?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  label,
  defaultExpanded = true,
  collapsed = false,
  children,
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  /* In rail mode the header is hidden and links are always visible
     (icon-only, no text). Just render children directly. */
  if (collapsed) {
    return <div className="space-y-0.5">{children}</div>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md px-3 py-1.5",
          "text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground/60",
          "transition-colors hover:bg-sidebar-accent hover:text-muted-foreground"
        )}
      >
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown
          className={cn(
            "size-3 shrink-0 transition-transform duration-150",
            !expanded && "-rotate-90"
          )}
        />
      </button>
      {expanded && <div className="mt-0.5 space-y-0.5">{children}</div>}
    </div>
  );
}
