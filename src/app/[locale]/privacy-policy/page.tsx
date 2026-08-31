import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { getPrivacyPolicy, pick, type Locale } from "@/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "footer", "privacy", "/privacy-policy");
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const format = await getFormatter();
  const doc = await getPrivacyPolicy();
  const l = locale as Locale;

  return (
    <>
      <div className="mx-auto max-w-[820px] px-6 pt-20 lg:px-12">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-[26px] text-[30px] leading-tight font-extralight text-pretty text-ink lg:text-[44px]">
          {pick(doc.title, l)}
        </h1>
      </div>

      <div className="mx-auto max-w-[820px] px-6 pt-12 lg:px-12">
        <p className="text-[11px] tracking-[0.16em] text-muted uppercase">
          {t("lastUpdated")}:{" "}
          {format.dateTime(new Date(doc.lastUpdated), {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="mt-8 text-[18px] leading-[1.9] text-pretty text-ink">
          {pick(doc.intro, l)}
        </p>

        {doc.sections.map((section, i) => (
          <section key={i} className="mt-14 border-t border-rule pt-10">
            <h2 className="text-[22px] font-extralight text-ink lg:text-[26px]">
              {pick(section.heading, l)}
            </h2>
            {pick(section.body, l).map((paragraph, j) => (
              <p
                key={j}
                className="mt-5 text-[16px] leading-[2] text-pretty text-body"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="h-[170px]" />
    </>
  );
}
