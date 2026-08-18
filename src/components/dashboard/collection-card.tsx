import { icons, Star } from "lucide-react";
import {
  type MockCollection,
  type MockItemType,
  mockItems,
  mockItemTypes,
} from "@/lib/mock-data";

interface CollectionCardProps {
  collection: MockCollection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const items = mockItems.filter((i) => i.collectionId === collection.id);
  const uniqueTypeIds = [...new Set(items.map((i) => i.typeId))];
  const types = uniqueTypeIds
    .map((id) => mockItemTypes.find((t) => t.id === id))
    .filter(Boolean) as MockItemType[];
  const accentColor = types.length === 1 ? types[0].color : undefined;
  const itemCount = items.length;

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent/50"
      style={
        accentColor
          ? { borderLeftColor: accentColor, borderLeftWidth: "3px" }
          : undefined
      }
    >
      {/* Header: title + star */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {collection.name}
        </h3>
        {collection.isFavorite && (
          <Star className="size-4 shrink-0 fill-amber-400 text-amber-400" />
        )}
      </div>

      {/* Item count */}
      <p className="text-xs text-muted-foreground">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      {/* Description */}
      {collection.description && (
        <p className="line-clamp-2 text-xs text-muted-foreground/80">
          {collection.description}
        </p>
      )}

      {/* Type icons row */}
      {types.length > 0 && (
        <div className="mt-auto flex items-center gap-1.5 pt-2">
          {types.map((type) => {
            const Icon = icons[type.icon as keyof typeof icons];
            return (
              <div
                key={type.id}
                className="flex size-6 items-center justify-center rounded"
                style={{ backgroundColor: `${type.color}18` }}
              >
                {Icon && (
                  <Icon className="size-3.5" style={{ color: type.color }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
