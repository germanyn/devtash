import {
  Package,
  FolderOpen,
  Star,
  Bookmark,
} from "lucide-react";
import { mockItems, mockCollections } from "@/lib/mock-data";

const stats = [
  {
    label: "Items",
    value: mockItems.length,
    icon: Package,
    color: "#22d3ee",
  },
  {
    label: "Collections",
    value: mockCollections.length,
    icon: FolderOpen,
    color: "#34d399",
  },
  {
    label: "Favorite Items",
    value: mockItems.filter((i) => i.isFavorite).length,
    icon: Star,
    color: "#fbbf24",
  },
  {
    label: "Favorite Collections",
    value: mockCollections.filter((c) => c.isFavorite).length,
    icon: Bookmark,
    color: "#a78bfa",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
          >
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${stat.color}18` }}
            >
              <Icon className="size-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
