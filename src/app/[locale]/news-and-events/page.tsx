import { getTranslations, setRequestLocale } from "next-intl/server";
import EventCard from "@/components/site/EventCard";
import EventRow from "@/components/site/EventRow";
import PageHeader from "@/components/site/PageHeader";
import { getEvents, type Locale } from "@/content";
import { formatEventDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "newsAndEvents", "/news-and-events");
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const tSections = await getTranslations("newsSections");
  const { upcoming, past } = await getEvents();
  const l = locale as Locale;

  // Dates are formatted on the server so the list rows stay static HTML.
  const upcomingDates = await Promise.all(upcoming.map((e) => formatEventDate(e)));
  const pastDates = await Promise.all(
    past.map((e) => formatEventDate(e, { compact: true })),
  );

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      {/* ── Upcoming ──────────────────────────────────────────────────── */}
      <section id="upcoming" className="shell scroll-mt-[110px] pt-24">
        <div className="flex items-baseline justify-between gap-6 border-b border-rule pb-5">
          <h2 className="text-[13px] font-light tracking-[0.28em] text-ink uppercase">
            {tSections("upcoming")}
          </h2>
          <span className="shrink-0 text-[11px] tracking-[0.16em] text-muted">
            {t("upcomingCount", { count: upcoming.length })}
          </span>
        </div>
        {upcoming.map((event, i) => (
          <EventRow
            key={event.slug}
            event={event}
            locale={l}
            dateLabel={upcomingDates[i]}
          />
        ))}
      </section>

      {/* ── Past ──────────────────────────────────────────────────────── */}
      <section id="past" className="shell scroll-mt-[110px] pt-[120px]">
        <div className="flex items-baseline justify-between gap-6 border-b border-rule pb-5">
          <h2 className="text-[13px] font-light tracking-[0.28em] text-ink uppercase">
            {tSections("past")}
          </h2>
          <span className="shrink-0 text-[11px] tracking-[0.16em] text-muted">
            {t("archive")}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-13 pt-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-13">
          {past.map((event, i) => (
            <EventCard
              key={event.slug}
              event={event}
              locale={l}
              dateLabel={pastDates[i]}
            />
          ))}
        </div>
      </section>

      <div className="h-[170px]" />
    </>
  );
}
