// A fixed, muted palette in the site's editorial register (no primary/neon
// hues). Any tag string always maps to the same colour, here or anywhere
// else this is reused, since the mapping is a pure hash of the text itself.
const PALETTE = [
  "#3f6b52", // forest
  "#3d5a80", // slate blue
  "#9c6b2f", // ochre
  "#6b4a73", // plum
  "#2f6f78", // teal
  "#7a4a3d", // rust
  "#55597a", // indigo slate
];

export function getTechColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i += 1) {
    hash = (hash + tag.charCodeAt(i)) % PALETTE.length;
  }
  return PALETTE[hash];
}
