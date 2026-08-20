import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Connecting to database...");

  const [users, items, itemTypes, collections, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.itemType.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);

  console.log("Connection OK");
  console.log(`users: ${users}, items: ${items}, itemTypes: ${itemTypes}, collections: ${collections}, tags: ${tags}`);

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });
  console.log(
    `system item types (${systemTypes.length}):`,
    systemTypes.map((t) => t.name).join(", ")
  );
}

main()
  .catch((e) => {
    console.error("Database test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
