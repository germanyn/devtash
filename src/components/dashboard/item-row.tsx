import { icons, Pin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type MockItem, mockItemTypes } from "@/lib/mock-data";

interface ItemRowProps {
  item: MockItem;
  showDate?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ItemRow({ item, showDate }: ItemRowProps) {
  const type = mockItemTypes.find((t) => t.id === item.typeId);
  const TypeIcon = type ? icons[type.icon as keyof typeof icons] : undefined;
  const color = type?.color ?? "#888";

  return (
    <div className="flex items-start gap-3 rounded-lg border border-transparent px-3 py-3 transition-colors hover:bg-accent/50">
      {/* Type icon */}
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}18` }}
      >
        {TypeIcon && <TypeIcon className="size-5" style={{ color }} />}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Title row */}
        <div className="flex items-center gap-2">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {item.title}
          </h4>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-transparent bg-muted/50 text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Date (recent items only) */}
      {showDate && (
        <span className="shrink-0 text-xs text-muted-foreground">
          {formatDate(item.createdAt)}
        </span>
      )}
    </div>
  );
}
