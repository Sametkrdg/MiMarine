import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { primaryRoutes } from "@/lib/site-nav";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-[26px] max-w-[20ch] text-[34px] font-extralight text-pretty text-ink lg:text-[56px]">
        {t("title")}
      </h1>
      <p className="mt-7 max-w-[48ch] text-[17px] leading-[2] text-body">{t("body")}</p>
      <div className="mt-12 flex flex-wrap gap-8">
        <Link
          href={primaryRoutes.home}
          className="border border-ink px-10 py-4 text-[11px] tracking-label uppercase transition-colors hover:border-accent hover:bg-accent hover:text-paper"
        >
          {t("home")}
        </Link>
        <Link
          href={primaryRoutes.fleet}
          className="self-center border-b border-ink pb-[6px] text-[11px] tracking-label uppercase"
        >
          {t("fleet")}
        </Link>
      </div>
    </section>
  );
}
