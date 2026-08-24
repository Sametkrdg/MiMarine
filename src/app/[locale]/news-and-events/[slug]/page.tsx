import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/site/PageHeader";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={slug} />
      <section className="shell pt-16">
        <p className="eyebrow">{tCommon("placeholderNotice")}</p>
      </section>
      <div className="h-[170px]" />
    </>
  );
}
