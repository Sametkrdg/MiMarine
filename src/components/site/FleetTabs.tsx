import { getTranslations } from "next-intl/server";
import { getYachtCounts, type YachtStatus } from "@/content";
import { Link } from "@/i18n/navigation";
import { fleetTabs } from "@/lib/site-nav";

export default async function FleetTabs({ active }: { active: YachtStatus }) {
  const t = await getTranslations("fleetTabs");
  const counts = await getYachtCounts();

  return (
    <div className="mt-[82px] flex overflow-x-auto border-b border-rule lg:overflow-x-visible">
      {fleetTabs.map((tab) => {
        const isActive = tab.status === active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px flex shrink-0 items-baseline gap-[10px] border-b pr-[34px] pb-5 text-[12px] tracking-nav whitespace-nowrap uppercase ${
              isActive
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <span>{t(tab.labelKey)}</span>
            <span className="text-[10px] text-muted">{counts[tab.status]}</span>
          </Link>
        );
      })}
    </div>
  );
}
