export function formatDate(
  isoString: string | null | undefined,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }
): string {
  if (!isoString) return "—";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString(locale, options);
}
