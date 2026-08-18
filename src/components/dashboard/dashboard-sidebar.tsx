"use client";

import { useEffect, useMemo, useRef } from "react";
import { icons } from "lucide-react";
import { Layers, Star, Settings, Folder, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser, mockItemTypes, mockCollections } from "@/lib/mock-data";
import { typeSlug } from "./type-slug";
import { CollapsibleSection } from "./section-heading";
import { SidebarLink } from "./sidebar-link";

interface DashboardSidebarProps {
  /** Whether the mobile drawer is open. */
  isOpen: boolean;
  /** Call to close the mobile drawer (backdrop click, Esc). */
  onClose: () => void;
  /** Desktop collapsed rail mode. */
  collapsed: boolean;
}

export function DashboardSidebar({
  isOpen,
  onClose,
  collapsed,
}: DashboardSidebarProps) {
  /* ---- Derived data ---- */
  const favoriteCollections = useMemo(
    () => mockCollections.filter((c) => c.isFavorite),
    []
  );
  const recentCollections = useMemo(
    () => mockCollections.filter((c) => !c.isFavorite),
    []
  );

  /* ---- Initials ---- */
  const initials = mockUser.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const rail = collapsed;

  /* ---- Lock body scroll while mobile drawer is open ---- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ---- Focus the drawer when it opens ---- */
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  /* ---- Sidebar content (shared between mobile drawer & desktop column) ---- */
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4",
          rail && "justify-center px-0"
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
          <Layers className="size-4" />
        </div>
        {!rail && (
          <span className="text-base font-semibold tracking-tight">
            DevStash
          </span>
        )}
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-4">
        {/* Types */}
        <CollapsibleSection label="Types" collapsed={rail}>
          {mockItemTypes.map((t) => {
            const Icon = icons[t.icon as keyof typeof icons];
            return (
              <SidebarLink
                key={t.id}
                href={`/items/${typeSlug(t.name)}`}
                icon={Icon ?? Layers}
                label={t.name}
                iconColor={t.color}
                collapsed={rail}
              />
            );
          })}
        </CollapsibleSection>

        {/* Favorites */}
        {favoriteCollections.length > 0 && (
          <CollapsibleSection label="Favorites" collapsed={rail}>
            {favoriteCollections.map((col) => (
              <SidebarLink
                key={col.id}
                href={`/collections/${col.id}`}
                icon={Star}
                label={col.name}
                collapsed={rail}
              />
            ))}
          </CollapsibleSection>
        )}

        {/* Recent */}
        {recentCollections.length > 0 && (
          <CollapsibleSection label="Recent" collapsed={rail}>
            {recentCollections.map((col) => (
              <SidebarLink
                key={col.id}
                href={`/collections/${col.id}`}
                icon={Folder}
                label={col.name}
                collapsed={rail}
              />
            ))}
          </CollapsibleSection>
        )}
      </nav>

      {/* User area */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-t border-sidebar-border px-4 py-3",
          rail && "justify-center px-0"
        )}
      >
        {/* Avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
          {initials}
        </div>
        {!rail && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium leading-tight text-sidebar-foreground">
                {mockUser.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {mockUser.email}
              </p>
            </div>
            <button
              type="button"
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label="Settings"
            >
              <Settings className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar (md+) */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-in-out md:flex",
          rail ? "w-[60px]" : "w-[272px]"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer (< md) — always mounted, toggled via CSS classes */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />
        {/* Drawer panel */}
        <aside
          ref={drawerRef}
          tabIndex={-1}
          className={cn(
            "absolute inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-sidebar shadow-xl outline-none transition-transform duration-200 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-3 z-10 flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </button>
          {sidebarContent}
        </aside>
      </div>
    </>
  );
}
