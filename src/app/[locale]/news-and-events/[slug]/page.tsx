import { getTranslations, setRequestLocale } from "next-intl/server";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import { getAllEventSlugs, getEventOrNotFound, pick, type Locale } from "@/content";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { formatEventDate } from "@/lib/format";
import { primaryRoutes } from "@/lib/site-nav";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const event = await getEventOrNotFound(slug);
  return { title: pick(event.title, locale as Locale) };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("article");
  const event = await getEventOrNotFound(slug);
  const l = locale as Locale;
  const dateLabel = await formatEventDate(event);

  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-20 lg:px-12">
        <Link
          href={primaryRoutes.news}
          className="eyebrow tracking-label transition-colors hover:text-ink"
        >
          ← {t("backToNews")}
        </Link>
        <div className="mt-10 text-[11px] tracking-label text-accent uppercase">
          {dateLabel} · {pick(event.location, l)}
        </div>
        <h1 className="mt-[22px] text-[32px] leading-[1.25] font-extralight text-pretty text-ink lg:text-[46px]">
          {pick(event.title, l)}
        </h1>
      </section>

      <section className="shell pt-[72px]">
        <ImagePlaceholder label={event.coverLabel} className="h-[360px] lg:h-[600px]" />
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-[86px] pb-[180px] lg:px-12">
        <p className="text-[22px] leading-[1.7] font-extralight text-pretty text-ink lg:text-[26px]">
          {pick(event.excerpt, l)}
        </p>
        {pick(event.body, l).map((paragraph, i) => (
          <p
            key={i}
            className="mt-[34px] text-[17px] leading-[2.05] text-pretty text-body"
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-[70px] flex flex-wrap gap-9 border-t border-ink pt-[34px] text-[11px] tracking-[0.2em] text-muted uppercase">
          <span>{t("share")}</span>
          <span className="text-ink">LinkedIn</span>
          <span className="text-ink">Instagram</span>
          <span className="text-ink">{t("copyLink")}</span>
        </div>
      </section>
    </>
  );
}
