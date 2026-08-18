"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PanelLeft, Search, FolderPlus, Plus } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardPage() {
  /* ------------------------------------------------------------------ */
  /*  State                                                              */
  /* ------------------------------------------------------------------ */

  /** Mobile drawer open / close. */
  const [mobileOpen, setMobileOpen] = useState(false);

  /** Desktop collapsed rail. */
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  /* ------------------------------------------------------------------ */
  /*  Keyboard shortcut: Escape closes the mobile drawer                */
  /* ------------------------------------------------------------------ */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ------------------------------------------------------------------ */
  /*  Toggle handlers                                                    */
  /* ------------------------------------------------------------------ */

  /** Called by the top-bar drawer button. On mobile toggles the drawer;
   *  on desktop toggles the rail. */
  function toggleSidebar() {
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setDesktopCollapsed((prev) => !prev);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={desktopCollapsed}
      />

      {/* Right column: toolbar + main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
          {/* Drawer toggle — always visible */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="size-4" />
          </Button>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-9"
            />
          </div>

          {/* Actions — pushed to the right */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline">
              <FolderPlus className="size-4" />
              New Collection
            </Button>
            <Button variant="outline">
              <Plus className="size-4" />
              New Item
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your developer knowledge hub
          </p>
        </main>
      </div>
    </div>
  );
}
