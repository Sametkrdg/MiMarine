import { getTranslations, setRequestLocale } from "next-intl/server";
import FleetTabs from "@/components/site/FleetTabs";
import PageHeader from "@/components/site/PageHeader";
import YachtCard from "@/components/site/YachtCard";
import { getYachts, type Locale, type YachtStatus } from "@/content";
import { Link } from "@/i18n/navigation";
import { primaryRoutes } from "@/lib/site-nav";

/** Maps a route segment to the message key used for its copy. */
const messageKey: Record<YachtStatus, string> = {
  delivered: "delivered",
  "ready-for-delivery": "readyForDelivery",
  "in-production": "inProduction",
};

/**
 * Shared body for the three Fleet routes. They are separate routes (not a
 * client-side tab state) so each is indexable and linkable — see PROJE_PLANI.md.
 */
export default async function FleetTabPage({
  locale,
  status,
}: {
  locale: string;
  status: YachtStatus;
}) {
  setRequestLocale(locale);
  const t = await getTranslations("fleet");
  const tNav = await getTranslations("nav");
  const yachts = await getYachts(status);
  const key = messageKey[status];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t(`${key}.title`)}
        intro={t(`${key}.intro`)}
      >
        <FleetTabs active={status} />
      </PageHeader>

      {yachts.length === 0 ? (
        <section className="shell pt-[72px] pb-10">
          <div className="border border-ink bg-surface-alt px-8 py-16 text-center lg:px-16">
            <p className="text-[20px] leading-[1.6] font-extralight text-pretty text-ink lg:text-[24px]">
              {t("empty")}
            </p>
            <Link
              href={primaryRoutes.preOrder}
              className="mt-9 inline-block border border-ink px-10 py-4 text-[11px] tracking-label uppercase transition-colors hover:border-accent hover:bg-accent hover:text-paper"
            >
              {tNav("preOrder")}
            </Link>
          </div>
        </section>
      ) : (
        <section className="shell grid grid-cols-1 gap-14 pt-[72px] pb-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
          {yachts.map((yacht) => (
            <YachtCard key={yacht.slug} yacht={yacht} locale={locale as Locale} />
          ))}
        </section>
      )}

      <div className="h-[150px]" />
    </>
  );
}
