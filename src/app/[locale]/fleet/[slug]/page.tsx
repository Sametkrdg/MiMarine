import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/site/PageHeader";

type Props = { params: Promise<{ locale: string; slug: string }> };

/**
 * Yacht detail. Static `/fleet/delivered` style segments take precedence over
 * this dynamic one, so the three tab routes are unaffected.
 */
export default async function YachtDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("fleet");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={slug} />
      <section className="shell pt-16">
        <p className="eyebrow">{tCommon("placeholderNotice")}</p>
      </section>
      <div className="h-[150px]" />
    </>
  );
}
