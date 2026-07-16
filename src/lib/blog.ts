export const categoryEmoji: Record<string, string> = {
  "Emagrecimento": "⚖️",
  "Saúde Intestinal": "🌿",
  "Comportamento Alimentar": "🧠",
  "Nutrição": "🌅",
};

export function estimateReadTime(content: string | null): string {
  const words = (content || "")
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
