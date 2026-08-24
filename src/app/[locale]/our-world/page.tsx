import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/site/PageHeader";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "ourWorld");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ourWorld");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}

      />
      <section className="shell pt-16">
        <p className="eyebrow">{tCommon("placeholderNotice")}</p>
      </section>
      <div className="h-[170px]" />
    </>
  );
}
