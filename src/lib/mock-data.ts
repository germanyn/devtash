export interface MockUser {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

export interface MockItem {
  id: string;
  title: string;
  contentType: "text" | "file";
  content: string;
  url: string;
  description: string;
  isFavorite: boolean;
  isPinned: boolean;
  language: string;
  typeId: string;
  collectionId: string;
  tags: string[];
  createdAt: string;
}

export const mockUser: MockUser = {
  id: "user_1",
  name: "Germán Álvarez",
  email: "german@devstash.dev",
  isPro: true,
};

export const mockItemTypes: MockItemType[] = [
  { id: "type_snippet", name: "Snippet", icon: "Code", color: "#22d3ee", isSystem: true },
  { id: "type_prompt", name: "Prompt", icon: "Sparkles", color: "#a78bfa", isSystem: true },
  { id: "type_note", name: "Note", icon: "StickyNote", color: "#fbbf24", isSystem: true },
  { id: "type_command", name: "Command", icon: "Terminal", color: "#34d399", isSystem: true },
  { id: "type_file", name: "File", icon: "FileText", color: "#f472b6", isSystem: true },
  { id: "type_image", name: "Image", icon: "Image", color: "#60a5fa", isSystem: true },
  { id: "type_url", name: "URL", icon: "Link", color: "#fb923c", isSystem: true },
];

export const mockCollections: MockCollection[] = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Reusable React components and hooks",
    isFavorite: true,
  },
  {
    id: "col_2",
    name: "AI Prompts",
    description: "Prompts for coding assistants and image tools",
    isFavorite: true,
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AGENTS.md and context snippets for projects",
    isFavorite: false,
  },
  {
    id: "col_4",
    name: "Python Snippets",
    description: "Scripts and helpers for Python",
    isFavorite: false,
  },
  {
    id: "col_5",
    name: "Design Systems",
    description: "Tailwind tokens, color palettes and UI notes",
    isFavorite: false,
  },
];

export const mockItems: MockItem[] = [
  {
    id: "item_1",
    title: "useDebounce hook",
    contentType: "text",
    content: "export function useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}",
    url: "",
    description: "Delay updating a value until the user stops typing",
    isFavorite: true,
    isPinned: true,
    language: "typescript",
    typeId: "type_snippet",
    collectionId: "col_1",
    tags: ["react", "hooks", "debounce"],
    createdAt: "2026-07-28T14:32:00Z",
  },
  {
    id: "item_2",
    title: "Refactor legacy code review prompt",
    contentType: "text",
    content: "Act as a senior engineer. Review the following code for bugs, performance issues and readability. Suggest concrete fixes...",
    url: "",
    description: "Generic prompt for reviewing legacy code",
    isFavorite: true,
    isPinned: false,
    language: "",
    typeId: "type_prompt",
    collectionId: "col_2",
    tags: ["ai", "code-review", "prompt"],
    createdAt: "2026-07-26T10:15:00Z",
  },
  {
    id: "item_3",
    title: "shadcn button component",
    contentType: "text",
    content: "<Button>\n  <Plus className=\"h-4 w-4\" />\n  New Item\n</Button>",
    url: "",
    description: "Usage example for the shadcn Button component",
    isFavorite: false,
    isPinned: false,
    language: "tsx",
    typeId: "type_snippet",
    collectionId: "col_5",
    tags: ["shadcn", "ui", "tailwind"],
    createdAt: "2026-07-22T09:00:00Z",
  },
  {
    id: "item_4",
    title: "Wait for file to be readable",
    contentType: "text",
    content: "while [[ ! -r /var/run/file.lock ]]; do sleep 1; done",
    url: "",
    description: "Block until a file is readable",
    isFavorite: false,
    isPinned: false,
    language: "bash",
    typeId: "type_command",
    collectionId: "",
    tags: ["bash", "scripting"],
    createdAt: "2026-07-18T18:45:00Z",
  },
  {
    id: "item_5",
    title: "Prisma docs - relations",
    contentType: "text",
    content: "https://www.prisma.io/docs/concepts/components/prisma-schema/relations",
    url: "https://www.prisma.io/docs/concepts/components/prisma-schema/relations",
    description: "Official guide to Prisma relations",
    isFavorite: false,
    isPinned: false,
    language: "",
    typeId: "type_url",
    collectionId: "col_3",
    tags: ["prisma", "database", "docs"],
    createdAt: "2026-07-12T11:20:00Z",
  },
  {
    id: "item_6",
    title: "Logo concepts.png",
    contentType: "file",
    content: "",
    url: "",
    description: "Logo variants for the DevStash brand",
    isFavorite: false,
    isPinned: false,
    language: "",
    typeId: "type_image",
    collectionId: "",
    tags: ["branding", "design"],
    createdAt: "2026-07-05T15:00:00Z",
  },
  {
    id: "item_7",
    title: "Meeting notes - Q3 planning",
    contentType: "text",
    content: "Priorities for Q3:\n1. Ship MVP\n2. Pro tier billing\n3. AI features",
    url: "",
    description: "Notes from the quarterly planning session",
    isFavorite: false,
    isPinned: false,
    language: "markdown",
    typeId: "type_note",
    collectionId: "",
    tags: ["notes", "planning"],
    createdAt: "2026-06-30T08:30:00Z",
  },
  {
    id: "item_8",
    title: "Zod schema for item form",
    contentType: "text",
    content: "const itemSchema = z.object({\n  title: z.string().min(1),\n  typeId: z.string(),\n  content: z.string().optional(),\n});",
    url: "",
    description: "Validation schema for creating an item",
    isFavorite: false,
    isPinned: false,
    language: "typescript",
    typeId: "type_snippet",
    collectionId: "col_3",
    tags: ["zod", "validation", "typescript"],
    createdAt: "2026-06-21T13:10:00Z",
  },
];
