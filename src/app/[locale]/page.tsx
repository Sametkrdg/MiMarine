import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternates } from "@/lib/metadata";
import Figure from "@/components/site/Figure";
import { getFeaturedYacht, getHomeContent, pick, type Locale } from "@/content";
import { Link } from "@/i18n/navigation";
import { primaryRoutes } from "@/lib/site-nav";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return { alternates: alternates(locale, "/") };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const home = await getHomeContent();
  const featured = await getFeaturedYacht();
  const l = locale as Locale;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[620px] overflow-hidden lg:h-[calc(100vh-86px)]">
        <Figure
          image={home.heroImage}
          locale={l}
          fallbackLabel="Hero"
          className="absolute inset-0"
          priority
          sizes="100vw"
        />
        <div className="hero-veil pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-[68px]">
          <div className="shell">
            <p className="text-[10px] tracking-[0.34em] text-ink/70 uppercase">
              {pick(home.heroEyebrow, l)}
            </p>
            <h1 className="mt-[26px] max-w-[16ch] text-[38px] leading-[1.08] font-extralight text-pretty text-ink lg:text-[64px]">
              {pick(home.heroTitle, l)}
            </h1>
            <div className="pointer-events-auto mt-[38px] flex flex-wrap items-center gap-7">
              <Link
                href={primaryRoutes.fleet}
                className="border-b border-ink/50 pb-2 text-[11px] tracking-label text-ink uppercase"
              >
                {t("exploreFleet")}
              </Link>
              <Link
                href={primaryRoutes.ourWorld}
                className="text-[11px] tracking-label text-ink/70 uppercase transition-colors hover:text-ink"
              >
                {tNav("ourWorld")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statement ─────────────────────────────────────────────────── */}
      <section className="shell grid grid-cols-1 items-start gap-8 pt-[150px] pb-10 lg:grid-cols-2 lg:gap-[120px]">
        <p className="eyebrow tracking-[0.3em]">{t("sectionHouse")}</p>
        <div>
          <p className="text-[26px] leading-[1.6] font-extralight text-pretty text-ink lg:text-[32px]">
            {pick(home.statement, l)}
          </p>
          <p className="mt-11 max-w-[52ch] text-[16px] leading-[2] text-pretty text-body">
            {pick(home.statementBody, l)}
          </p>
        </div>
      </section>

      {/* ── Figures ───────────────────────────────────────────────────── */}
      <section className="shell pt-20">
        <div className="h-px bg-rule" />
        <div className="grid grid-cols-1 gap-px bg-rule-soft lg:grid-cols-3">
          {home.figures.map((figure, i) => (
            <div key={i} className="bg-card px-10 pt-[52px] pb-[58px]">
              <div className="text-[52px] font-extralight text-ink">{figure.value}</div>
              <div className="mt-[14px] text-[12px] tracking-[0.16em] text-accent uppercase">
                {pick(figure.label, l)}
              </div>
              <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.9] text-body">
                {pick(figure.note, l)}
              </p>
            </div>
          ))}
        </div>
        <div className="h-px bg-rule" />
      </section>

      {/* ── Featured yacht ────────────────────────────────────────────── */}
      {featured && (
        <section className="shell pt-[150px]">
          <div className="mb-14 flex items-baseline justify-between gap-6">
            <h2 className="eyebrow tracking-[0.3em]">{t("sectionFeatured")}</h2>
            <Link
              href={primaryRoutes.fleet}
              className="shrink-0 border-b border-ink/34 pb-[6px] text-[11px] tracking-nav text-ink uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {t("allModels")}
            </Link>
          </div>
          <Link href={`/fleet/${featured.slug}`} className="group block">
            <Figure
              image={featured.cover}
              locale={l}
              fallbackLabel={featured.name}
              className="h-[420px] lg:h-[640px]"
              sizes="(min-width: 1600px) 1560px, 100vw"
            />
            <div className="grid grid-cols-1 gap-8 pt-[38px] lg:grid-cols-2 lg:gap-[120px]">
              <div>
                <div className="text-[30px] font-extralight text-ink transition-colors group-hover:text-accent lg:text-[38px]">
                  {featured.name}
                </div>
                <div className="mt-3 text-[12px] tracking-[0.2em] text-muted uppercase">
                  {pick(featured.loa, l)} · {pick(featured.subtitle, l)}
                </div>
              </div>
              <p className="max-w-[50ch] text-[16px] leading-[2] text-pretty text-body">
                {pick(featured.lede, l)}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* ── Tiles ─────────────────────────────────────────────────────── */}
      <section className="shell grid grid-cols-1 gap-8 pt-[150px] pb-[30px] lg:grid-cols-3 lg:gap-12">
        {home.tiles.map((tile) => (
          <Link key={tile.title.en} href={tile.href} className="group block">
            <Figure
              image={tile.image}
              locale={l}
              fallbackLabel={pick(tile.title, l)}
              className="h-[380px]"
              sizes="(min-width: 1025px) 33vw, 100vw"
            />
            <div className="mt-[26px] text-[10px] tracking-label text-accent uppercase">
              {pick(tile.kicker, l)}
            </div>
            <div className="mt-3 text-[24px] font-extralight text-ink transition-colors group-hover:text-accent">
              {pick(tile.title, l)}
            </div>
            <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.9] text-body">
              {pick(tile.body, l)}
            </p>
          </Link>
        ))}
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1100px] px-6 pt-[170px] pb-[190px] text-center lg:px-12">
        <p className="eyebrow">{t("enquiries")}</p>
        <p className="mt-8 text-[28px] leading-[1.5] font-extralight text-pretty text-ink lg:text-[36px]">
          {pick(home.closing, l)}
        </p>
        <Link
          href={primaryRoutes.preOrder}
          className="mt-[46px] inline-block border border-ink/38 px-10 py-4 text-[11px] tracking-label text-ink uppercase transition-colors hover:border-accent hover:bg-accent hover:text-deep"
        >
          {tNav("preOrder")}
        </Link>
      </section>
    </>
  );
}
