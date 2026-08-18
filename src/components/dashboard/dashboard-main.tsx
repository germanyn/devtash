import { mockItems, mockCollections } from "@/lib/mock-data";
import { StatsCards } from "./stats-cards";
import { CollectionCard } from "./collection-card";
import { ItemRow } from "./item-row";

export function DashboardMain() {
  const pinnedItems = mockItems.filter((i) => i.isPinned);

  const recentItems = [...mockItems]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  return (
    <div className="space-y-10">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your developer knowledge hub
        </p>
      </div>

      {/* Stat cards */}
      <StatsCards />

      {/* Collections */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Collections</h2>
          <a
            href="/collections"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Pinned items */}
      {pinnedItems.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Pinned Items
            </h2>
          </div>
          <div className="space-y-1">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Recent items */}
      {recentItems.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Items
            </h2>
            <a
              href="/items"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
            </a>
          </div>
          <div className="space-y-1">
            {recentItems.map((item) => (
              <ItemRow key={item.id} item={item} showDate />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
