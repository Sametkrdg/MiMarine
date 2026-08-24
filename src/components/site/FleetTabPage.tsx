import { getTranslations, setRequestLocale } from "next-intl/server";
import FleetTabs from "@/components/site/FleetTabs";
import PageHeader from "@/components/site/PageHeader";

type TabKey = "delivered" | "readyForDelivery" | "inProduction";

/**
 * Shared body for the three Fleet routes. They are separate routes (not a
 * client-side tab state) so each is indexable and linkable — see PROJE_PLANI.md.
 */
export default async function FleetTabPage({
  locale,
  tab,
}: {
  locale: string;
  tab: TabKey;
}) {
  setRequestLocale(locale);
  const t = await getTranslations("fleet");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t(`${tab}.title`)}
        intro={t(`${tab}.intro`)}
      >
        <FleetTabs active={tab} />
      </PageHeader>

      <section className="shell pt-[72px]">
        <p className="eyebrow">{tCommon("placeholderNotice")}</p>
      </section>

      <div className="h-[150px]" />
    </>
  );
}
