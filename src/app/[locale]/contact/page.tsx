import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/site/ContactForm";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import PageHeader from "@/components/site/PageHeader";
import { getOffices, pick, type Locale } from "@/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tNetwork = await getTranslations("network");
  const offices = await getOffices();
  const l = locale as Locale;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      <section className="shell grid grid-cols-1 items-start gap-12 pt-[90px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[120px]">
        <ContactForm />

        <div>
          {offices.map((office) => (
            <div key={office.id} className="mb-8 border-b border-ink pb-8">
              <div className="text-[10px] tracking-label text-accent uppercase">
                {pick(office.role, l)}
              </div>
              <div className="mt-3 text-[22px] font-extralight text-ink">
                {office.city}
              </div>
              <address className="mt-[10px] text-[14px] leading-[1.95] text-body not-italic">
                {office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-3 block text-ink">{office.phone}</span>
                <span className="block text-ink">{office.email}</span>
              </address>
            </div>
          ))}
          <ImagePlaceholder label={tNetwork("mapLabel")} className="h-[280px]" />
        </div>
      </section>

      <div className="h-[170px]" />
    </>
  );
}
