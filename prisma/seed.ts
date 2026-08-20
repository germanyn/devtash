import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const SYSTEM_ITEM_TYPES = [
  { name: "Snippet", icon: "Code", color: "#22c55e" },
  { name: "Prompt", icon: "Sparkles", color: "#a855f7" },
  { name: "Note", icon: "StickyNote", color: "#eab308" },
  { name: "Command", icon: "Terminal", color: "#3b82f6" },
  { name: "File", icon: "FileText", color: "#f97316" },
  { name: "Image", icon: "Image", color: "#ec4899" },
  { name: "URL", icon: "Link", color: "#06b6d4" },
] as const;

async function main() {
  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null },
    });
    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color, isSystem: true },
      });
    } else {
      await prisma.itemType.create({
        data: { ...type, isSystem: true, userId: null },
      });
    }
  }
  console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types`);
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
