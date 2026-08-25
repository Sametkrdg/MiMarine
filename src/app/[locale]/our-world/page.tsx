import { getTranslations, setRequestLocale } from "next-intl/server";
import Figure from "@/components/site/Figure";
import PageHeader from "@/components/site/PageHeader";
import { getOurWorldContent, pick, type Locale } from "@/content";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "ourWorld", "/our-world");
}

export default async function OurWorldPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ourWorld");
  const tCommon = await getTranslations("common");
  const content = await getOurWorldContent();
  const l = locale as Locale;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={pick(content.title, l)} />

      <section className="shell pt-20">
        <Figure
          image={content.heroImage}
          locale={l}
          fallbackLabel="Yard interior"
          className="h-[380px] lg:h-[620px]"
          priority
          sizes="(min-width: 1600px) 1560px, 100vw"
        />
      </section>

      {/* ── Statement ─────────────────────────────────────────────────── */}
      <section className="shell grid grid-cols-1 items-start gap-8 pt-20 lg:grid-cols-2 lg:gap-[120px]">
        <p className="eyebrow tracking-[0.3em]">{t("yardLabel")}</p>
        <div>
          <p className="text-[26px] leading-[1.6] font-extralight text-pretty text-ink lg:text-[30px]">
            {pick(content.statement, l)}
          </p>
          <p className="mt-10 max-w-[52ch] text-[16px] leading-[2] text-pretty text-body">
            {pick(content.statementBody, l)}
          </p>
        </div>
      </section>

      {/* ── Pillars ───────────────────────────────────────────────────── */}
      <section className="shell grid grid-cols-1 gap-8 pt-[130px] lg:grid-cols-3 lg:gap-12">
        {content.pillars.map((pillar) => {
          const inner = (
            <>
              <Figure
                image={pillar.image}
                locale={l}
                fallbackLabel={pick(pillar.title, l)}
                className="mb-7 h-[320px] lg:h-[420px]"
                sizes="(min-width: 1025px) 33vw, 100vw"
              />
              <div className="text-[10px] tracking-label text-accent uppercase">
                {pillar.kicker}
              </div>
              <div className="mt-[14px] text-[26px] font-extralight text-ink">
                {pick(pillar.title, l)}
              </div>
              <p className="mt-[14px] max-w-[36ch] text-[15px] leading-[1.95] text-body">
                {pick(pillar.body, l)}
              </p>
              {pillar.href && (
                <span className="mt-6 inline-block border-b border-ink pb-[6px] text-[10px] tracking-label text-ink uppercase">
                  {tCommon("readMore")}
                </span>
              )}
            </>
          );

          return pillar.href ? (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="block border-t border-ink pt-[30px]"
            >
              {inner}
            </Link>
          ) : (
            <div key={pillar.id} className="border-t border-ink pt-[30px]">
              {inner}
            </div>
          );
        })}
      </section>

      {/* ── Commitments ───────────────────────────────────────────────── */}
      <section className="shell pt-[150px]">
        <p className="eyebrow mb-[52px] tracking-[0.3em]">{t("commitments")}</p>
        {content.commitments.map((commitment) => (
          <div
            key={commitment.no}
            className="grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-x-8 gap-y-4 border-t border-ink py-9 lg:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-14"
          >
            <div className="text-[12px] tracking-[0.16em] text-accent">
              {commitment.no}
            </div>
            <div className="text-[22px] font-extralight text-ink lg:text-[26px]">
              {pick(commitment.title, l)}
            </div>
            <p className="col-start-2 max-w-[50ch] text-[15px] leading-[1.95] text-body lg:col-start-3">
              {pick(commitment.body, l)}
            </p>
          </div>
        ))}
        <div className="h-px bg-ink" />
      </section>

      <div className="h-[170px]" />
    </>
  );
}
