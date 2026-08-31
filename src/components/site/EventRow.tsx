import { Link } from "@/i18n/navigation";
import { pick, type EventItem, type Locale } from "@/content";
import Figure from "./Figure";

/** Wide list row used for upcoming events. */
export default function EventRow({
  event,
  locale,
  dateLabel,
}: {
  event: EventItem;
  locale: Locale;
  dateLabel: string;
}) {
  return (
    <Link
      href={`/news-and-events/${event.slug}`}
      className="grid grid-cols-1 items-center gap-8 border-b border-rule py-[34px] transition-colors hover:bg-card lg:grid-cols-[300px_minmax(0,1fr)_340px] lg:gap-14"
    >
      <div>
        <div className="text-[11px] tracking-[0.24em] text-accent uppercase">
          {dateLabel}
        </div>
        <div className="mt-2 text-[11px] tracking-[0.14em] text-muted">
          {pick(event.location, locale)}
        </div>
      </div>
      <div>
        <div className="text-[28px] font-extralight text-pretty text-ink">
          {pick(event.title, locale)}
        </div>
        <p className="mt-[10px] max-w-[52ch] text-[15px] leading-[1.9] text-body">
          {pick(event.excerpt, locale)}
        </p>
      </div>
      <Figure
        image={event.cover}
        locale={locale}
        fallbackLabel={pick(event.title, locale)}
        className="h-[180px]"
        sizes="(min-width: 1025px) 340px, 100vw"
      />
    </Link>
  );
}
