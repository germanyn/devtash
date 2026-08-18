import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarLink({
  href,
  icon: Icon,
  label,
  iconColor,
  collapsed,
  active,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  iconColor?: string;
  collapsed?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors",
        "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        active && "bg-sidebar-accent text-sidebar-foreground",
        collapsed && "justify-center px-0 py-2"
      )}
      title={collapsed ? label : undefined}
    >
      <Icon
        className="size-4 shrink-0"
        style={iconColor ? { color: iconColor } : undefined}
      />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
