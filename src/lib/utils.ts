import type { Artist, Artwork, CommissionDraft } from "@/types";
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
export const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
export const searchMatches = (
  query: string,
  ...values: (string | string[])[]
) =>
  query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .every((term) => values.flat().join(" ").toLowerCase().includes(term));
export function filterArtworks(
  items: Artwork[],
  filters: {
    query: string;
    category: string;
    medium: string;
    style: string;
    price: number;
    size: string;
    sort: string;
  },
) {
  const result = items.filter(
    (a) =>
      searchMatches(filters.query, a.title, a.tags, a.category, a.medium) &&
      (!filters.category || a.category === filters.category) &&
      (!filters.medium || a.medium === filters.medium) &&
      (!filters.style || a.style === filters.style) &&
      a.price <= filters.price &&
      (!filters.size ||
        (filters.size === "Small"
          ? a.width <= 16
          : filters.size === "Medium"
            ? a.width > 16 && a.width <= 24
            : a.width > 24)),
  );
  return result.sort((a, b) =>
    filters.sort === "Price: low to high"
      ? a.price - b.price
      : filters.sort === "Price: high to low"
        ? b.price - a.price
        : filters.sort === "Title: A–Z"
          ? a.title.localeCompare(b.title)
          : Number(!!b.featured) - Number(!!a.featured),
  );
}
export function matchArtists(artists: Artist[], draft: CommissionDraft) {
  return artists
    .filter(
      (a) =>
        a.available && a.minimum !== undefined && a.minimum <= draft.budget,
    )
    .map((a) => ({
      artist: a,
      score:
        (a.specialties.includes(draft.subject) ? 5 : 0) +
        (a.mediums.includes(draft.medium) ? 4 : 0) +
        (a.styles.includes(draft.style) ? 3 : 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (a.artist.minimum ?? Infinity) - (b.artist.minimum ?? Infinity),
    )
    .map((x) => x.artist);
}
export function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2);
