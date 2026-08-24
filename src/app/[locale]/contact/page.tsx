import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/site/ContactForm";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import PageHeader from "@/components/site/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { placeholderContact } from "@/lib/placeholder";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      <section className="shell grid grid-cols-1 items-start gap-8 pt-[90px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[120px]">
        <ContactForm />

        <div>
          <div className="mb-8 border-b border-ink pb-8">
            <address className="text-[14px] leading-[1.95] text-body not-italic">
              {placeholderContact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-3 block text-ink">{placeholderContact.phone}</span>
              <span className="block text-ink">{placeholderContact.email}</span>
            </address>
          </div>
          <ImagePlaceholder label="Map" className="h-[280px]" />
        </div>
      </section>

      <div className="h-[170px]" />
    </>
  );
}
