import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { fleetTabs } from "@/lib/site-nav";

export default async function FleetTabs({ active }: { active: string }) {
  const t = await getTranslations("fleetTabs");

  return (
    <div className="mt-[82px] flex overflow-x-auto border-b border-ink lg:overflow-x-visible">
      {fleetTabs.map((tab) => {
        const isActive = tab.labelKey === active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px flex shrink-0 items-baseline gap-[10px] border-b pr-[34px] pb-5 text-[12px] tracking-nav whitespace-nowrap uppercase ${
              isActive ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t(tab.labelKey)}
          </Link>
        );
      })}
    </div>
  );
}
