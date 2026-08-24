import { getTranslations, setRequestLocale } from "next-intl/server";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import { Link } from "@/i18n/navigation";
import { primaryRoutes } from "@/lib/site-nav";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden lg:h-[calc(100vh-86px)]">
        <ImagePlaceholder label="Hero" className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-ink/45" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-[68px]">
          <div className="shell">
            <p className="text-[10px] tracking-[0.34em] text-paper/70 uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-[26px] max-w-[16ch] text-[38px] leading-[1.08] font-extralight text-pretty text-paper lg:text-[64px]">
              {t("title")}
            </h1>
            <div className="pointer-events-auto mt-[38px] flex items-center gap-7">
              <Link
                href={primaryRoutes.fleet}
                className="border-b border-paper/50 pb-2 text-[11px] tracking-label text-paper uppercase"
              >
                {tNav("fleet")}
              </Link>
              <Link
                href={primaryRoutes.ourWorld}
                className="text-[11px] tracking-label text-paper/70 uppercase"
              >
                {tNav("ourWorld")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[150px]" />
    </>
  );
}
