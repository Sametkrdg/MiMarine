import { Link } from "@/i18n/navigation";
import { pick, type Locale, type Yacht } from "@/content";
import ImagePlaceholder from "./ImagePlaceholder";

export default function YachtCard({
  yacht,
  locale,
}: {
  yacht: Yacht;
  locale: Locale;
}) {
  return (
    <Link href={`/fleet/${yacht.slug}`} className="group block">
      <ImagePlaceholder label={yacht.coverLabel} className="h-[340px]" />
      <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-ink pb-4">
        <div>
          <div className="text-[24px] font-extralight text-ink transition-colors group-hover:text-accent">
            {yacht.name}
          </div>
          <div className="mt-[9px] text-[12px] tracking-[0.14em] text-muted">
            {pick(yacht.subtitle, locale)}
          </div>
        </div>
        <div className="shrink-0 text-[12px] tracking-[0.16em] text-accent">
          {yacht.loa}
        </div>
      </div>
    </Link>
  );
}
