import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderPlus, Layers, Plus, Search } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar — full-height left column */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-border">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
            <Layers className="size-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            DevStash
          </span>
        </div>

        {/* Sidebar placeholder */}
        <div className="flex-1 px-4">
          <h2 className="text-lg font-semibold">Sidebar</h2>
        </div>
      </aside>

      {/* Right column: toolbar + main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
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
          <h2 className="text-lg font-semibold">Main</h2>
        </main>
      </div>
    </div>
  );
}
