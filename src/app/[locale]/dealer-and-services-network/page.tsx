import { getTranslations, setRequestLocale } from "next-intl/server";
import LocationMap from "@/components/site/LocationMap";
import Figure from "@/components/site/Figure";
import PageHeader from "@/components/site/PageHeader";
import {
  dealerRegions,
  getDealerRegionCounts,
  getDealers,
  getMappableDealers,
  getMaps,
  pick,
  type DealerRegion,
  type Locale,
} from "@/content";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";
import { regionHref } from "@/lib/site-nav";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ region?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "nav", "network", "/dealer-and-services-network");
}

function resolveRegion(value: string | undefined): DealerRegion {
  return dealerRegions.includes(value as DealerRegion)
    ? (value as DealerRegion)
    : dealerRegions[0];
}

export default async function NetworkPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The region lives in the URL rather than client state so a filtered view
  // can be linked and shared.
  const active = resolveRegion((await searchParams).region);

  const t = await getTranslations("network");
  const dealers = await getDealers(active);
  const counts = await getDealerRegionCounts();
  const maps = await getMaps();
  const mappable = await getMappableDealers();
  const l = locale as Locale;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="shell pt-[76px]">
        <div className="relative">
          {mappable.length > 0 ? (
            <LocationMap
              markers={mappable.map((d) => ({
                id: d.id,
                lat: d.coordinates!.lat,
                lng: d.coordinates!.lng,
                city: d.city,
                role: t(`roles.${d.type}`),
              }))}
            />
          ) : (
            // No coordinates yet, so an empty world map would say nothing.
            <Figure
              image={maps.network}
              locale={l}
              fallbackLabel={t("mapLabel")}
              className="h-[320px] lg:h-[520px]"
              priority
              sizes="(min-width: 1600px) 1560px, 100vw"
            />
          )}
          <div className="absolute bottom-7 left-7 z-[500] bg-paper/90 px-6 py-[18px] text-[10px] tracking-nav text-body uppercase">
            {t("summary", {
              dealers: counts.dealers,
              services: counts.services,
              regions: counts.regions,
            })}
          </div>
        </div>
      </section>

      <section className="shell pt-16">
        <div className="flex flex-wrap gap-x-9 border-b border-ink">
          {dealerRegions.map((region) => {
            const isActive = region === active;
            return (
              <Link
                key={region}
                href={regionHref(region)}
                aria-current={isActive ? "true" : undefined}
                className={`-mb-px border-b pb-[18px] text-[12px] tracking-[0.2em] uppercase ${
                  isActive
                    ? "border-ink text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {t(`regions.${region}`)}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-px bg-ink lg:grid-cols-3">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="bg-paper pt-11 pr-11 pb-12">
              <div className="text-[10px] tracking-label text-accent uppercase">
                {t(`roles.${dealer.type}`)}
              </div>
              <div className="mt-[14px] text-[24px] font-extralight text-ink">
                {dealer.city}
              </div>
              <div className="mt-3 text-[14px] leading-[1.9] text-body">
                {dealer.company}
                <br />
                {dealer.address}
              </div>
              <div className="mt-[18px] text-[14px] leading-[1.9] text-ink">
                {dealer.phone}
                <br />
                {dealer.email}
              </div>
              <div className="mt-5 border-t border-ink pt-4 text-[11px] tracking-[0.14em] text-muted">
                {pick(dealer.capabilities, l)}
              </div>
            </div>
          ))}
        </div>
        <div className="h-px bg-ink" />
      </section>

      <div className="h-[170px]" />
    </>
  );
}
