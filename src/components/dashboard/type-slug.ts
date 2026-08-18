/** Lowercase the type name, pluralise ("s"), but special-case URL. */
export function typeSlug(name: string): string {
  if (name === "URL") return "urls";
  return name.toLowerCase() + "s";
}
