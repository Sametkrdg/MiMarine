import { getFormatter } from "next-intl/server";
import type { EventItem } from "@/content";

/**
 * Renders an event's date in the active locale. Multi-day events collapse into
 * a range; past events only need month and year, matching the design.
 */
export async function formatEventDate(
  event: EventItem,
  { compact = false }: { compact?: boolean } = {},
): Promise<string> {
  const format = await getFormatter();
  const start = new Date(event.date);

  if (event.endDate) {
    return format.dateTimeRange(start, new Date(event.endDate), {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return compact
    ? format.dateTime(start, { month: "long", year: "numeric" })
    : format.dateTime(start, { day: "numeric", month: "long", year: "numeric" });
}
