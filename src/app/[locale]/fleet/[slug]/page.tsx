import { getTranslations, setRequestLocale } from "next-intl/server";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import {
  getAllYachtSlugs,
  getYachtOrNotFound,
  pick,
  type Locale,
  type YachtStatus,
} from "@/content";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { fleetTabs, primaryRoutes } from "@/lib/site-nav";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllYachtSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const yacht = await getYachtOrNotFound(slug);
  return { title: yacht.name };
}

/** Route back to the tab this yacht belongs to. */
function tabHref(status: YachtStatus): string {
  return fleetTabs.find((t) => t.status === status)?.href ?? primaryRoutes.fleet;
}

/**
 * Yacht detail. Static `/fleet/delivered` style segments take precedence over
 * this dynamic one, so the three tab routes are unaffected.
 */
export default async function YachtDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("yacht");
  const tTabs = await getTranslations("fleetTabs");
  const yacht = await getYachtOrNotFound(slug);
  const l = locale as Locale;

  const statusLabelKey = fleetTabs.find((tab) => tab.status === yacht.status)?.labelKey;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[560px] lg:h-[78vh]">
        <ImagePlaceholder label={yacht.coverLabel} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-ink/45" />
        <div className="absolute inset-x-0 bottom-0 pb-14">
          <div className="shell">
            <Link
              href={tabHref(yacht.status)}
              className="text-[10px] tracking-label text-paper/70 uppercase transition-colors hover:text-paper"
            >
              ← {t("backToFleet")}
              {statusLabelKey ? ` · ${tTabs(statusLabelKey)}` : ""}
            </Link>
            <h1 className="mt-[22px] text-[38px] font-extralight tracking-[0.02em] text-paper lg:text-[60px]">
              {yacht.name}
            </h1>
            <div className="mt-4 text-[12px] tracking-nav text-paper/75 uppercase">
              {pick(yacht.subtitle, l)} · {yacht.loa}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brief ─────────────────────────────────────────────────────── */}
      <section className="shell grid grid-cols-1 items-start gap-8 pt-[130px] lg:grid-cols-2 lg:gap-[120px]">
        <p className="eyebrow tracking-[0.3em]">{t("brief")}</p>
        <div>
          <p className="text-[24px] leading-[1.65] font-extralight text-pretty text-ink lg:text-[28px]">
            {pick(yacht.lede, l)}
          </p>
          {pick(yacht.body, l).map((paragraph, i) => (
            <p
              key={i}
              className="mt-10 max-w-[52ch] text-[16px] leading-[2] text-pretty text-body"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ── Specifications ────────────────────────────────────────────── */}
      <section className="shell pt-[120px]">
        <p className="eyebrow mb-8 tracking-[0.3em]">{t("specifications")}</p>
        <div className="h-px bg-ink" />
        <div className="grid grid-cols-2 gap-px bg-ink lg:grid-cols-4">
          {yacht.specs.map((spec, i) => (
            <div key={i} className="bg-paper pt-[34px] pr-[30px] pb-[38px]">
              <div className="text-[10px] tracking-[0.24em] text-muted uppercase">
                {pick(spec.key, l)}
              </div>
              <div className="mt-3 text-[22px] font-extralight text-ink">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
        <div className="h-px bg-ink" />
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section className="shell pt-[130px]">
        <p className="eyebrow mb-11 tracking-[0.3em]">{t("gallery")}</p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {yacht.galleryLabels.map((label, i) => (
            <ImagePlaceholder
              key={label}
              label={label}
              className={
                i === 0 ? "h-[360px] lg:col-span-2 lg:h-[560px]" : "h-[300px] lg:h-[400px]"
              }
            />
          ))}
        </div>
      </section>

      {/* ── Enquiry ───────────────────────────────────────────────────── */}
      <section className="shell pt-[130px] pb-[180px]">
        <div className="flex flex-col items-start gap-8 border-t border-ink pt-[52px] lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <p className="max-w-[26ch] text-[24px] leading-[1.5] font-extralight text-pretty text-ink lg:text-[28px]">
            {t("closing")}
          </p>
          <Link
            href={primaryRoutes.contact}
            className="shrink-0 border border-ink px-10 py-4 text-[11px] tracking-label whitespace-nowrap uppercase transition-colors hover:border-accent hover:bg-accent hover:text-paper"
          >
            {t("enquire")}
          </Link>
        </div>
      </section>
    </>
  );
}
