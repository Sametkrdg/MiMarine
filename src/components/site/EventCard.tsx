import { Link } from "@/i18n/navigation";
import { pick, type EventItem, type Locale } from "@/content";
import ImagePlaceholder from "./ImagePlaceholder";

/** Grid card used for past events. */
export default function EventCard({
  event,
  locale,
  dateLabel,
}: {
  event: EventItem;
  locale: Locale;
  dateLabel: string;
}) {
  return (
    <Link href={`/news-and-events/${event.slug}`} className="group block">
      <ImagePlaceholder label={event.coverLabel} className="h-[300px]" />
      <div className="mt-6 text-[10px] tracking-label text-accent uppercase">
        {dateLabel} · {pick(event.location, locale)}
      </div>
      <div className="mt-3 text-[22px] font-extralight text-pretty text-ink transition-colors group-hover:text-accent">
        {pick(event.title, locale)}
      </div>
      <p className="mt-[10px] text-[15px] leading-[1.9] text-body">
        {pick(event.excerpt, locale)}
      </p>
    </Link>
  );
}
