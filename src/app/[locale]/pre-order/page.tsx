import { getTranslations, setRequestLocale } from "next-intl/server";
import Figure from "@/components/site/Figure";
import PreOrderForm from "@/components/site/PreOrderForm";
import { getFeaturedYacht, type Locale } from "@/content";
import { brand } from "@/lib/brand";
import { isContactFormConfigured } from "@/lib/integrations";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "preOrder", "/pre-order");
}

export default async function PreOrderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("preOrder");
  const featured = await getFeaturedYacht();
  const l = locale as Locale;

  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-20 lg:px-12">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-[26px] max-w-[18ch] text-[38px] leading-[1.1] font-extralight text-pretty text-ink lg:text-[64px]">
          {t("title")}
        </h1>
        {/* The brief asks for the motto to sit directly under the heading. */}
        <p className="mt-6 text-[13px] tracking-label text-accent uppercase">
          {brand.motto[l]}
        </p>
      </section>

      {featured && (
        <section className="shell pt-16">
          <Figure
            image={featured.cover}
            locale={l}
            fallbackLabel={featured.name}
            className="h-[300px] lg:h-[480px]"
            priority
            sizes="(min-width: 1600px) 1560px, 100vw"
          />
        </section>
      )}

      <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-[180px] lg:px-12">
        <p className="max-w-[62ch] text-[22px] leading-[1.7] font-extralight text-pretty text-ink lg:text-[26px]">
          {t("lede")}
        </p>
        <p className="mt-9 max-w-[62ch] text-[17px] leading-[2] text-pretty text-body">
          {t("body")}
        </p>

        <PreOrderForm enabled={isContactFormConfigured()} />
      </section>
    </>
  );
}
