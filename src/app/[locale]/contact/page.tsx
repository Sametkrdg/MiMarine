import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/site/ContactForm";
import Figure from "@/components/site/Figure";
import LocationMap from "@/components/site/LocationMap";
import PageHeader from "@/components/site/PageHeader";
import { getMaps, getOffices, pick, type Locale } from "@/content";
import { isContactFormConfigured } from "@/lib/integrations";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "contact", "/contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tNetwork = await getTranslations("network");
  const offices = await getOffices();
  const maps = await getMaps();
  // The yard has a confirmed coordinate; other offices may not.
  const located = offices.filter((o) => o.coordinates);
  const l = locale as Locale;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      <section className="shell grid grid-cols-1 items-start gap-12 pt-[90px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[120px]">
        <ContactForm enabled={isContactFormConfigured()} />

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
          {located.length > 0 ? (
            <LocationMap
              className="h-[280px]"
              zoom={14}
              markers={located.map((o) => ({
                id: o.id,
                lat: o.coordinates!.lat,
                lng: o.coordinates!.lng,
                city: o.city,
                role: pick(o.role, l),
              }))}
            />
          ) : (
            <Figure
              image={maps.contact}
              locale={l}
              fallbackLabel={tNetwork("mapLabel")}
              className="h-[280px]"
              sizes="(min-width: 1025px) 40vw, 100vw"
            />
          )}
        </div>
      </section>

      <div className="h-[170px]" />
    </>
  );
}
