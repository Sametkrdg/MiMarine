import Image from "next/image";
import { pick, type Locale, type SiteImage } from "@/content";
import ImagePlaceholder from "./ImagePlaceholder";

type Props = {
  image?: SiteImage;
  locale: Locale;
  /** Shown when no image exists yet — keeps the layout legible in Sanity gaps. */
  fallbackLabel: string;
  className?: string;
  /** Set on the LCP image only. */
  priority?: boolean;
  /** Layout hint for the image optimiser. */
  sizes?: string;
};

/**
 * One image slot. Renders the picture when content supplies one, and the
 * labelled placeholder box when it does not, so a missing Sanity image degrades
 * to something readable rather than a blank frame.
 */
export default function Figure({
  image,
  locale,
  fallbackLabel,
  className = "",
  priority = false,
  sizes = "100vw",
}: Props) {
  if (!image) {
    return <ImagePlaceholder label={fallbackLabel} className={className} />;
  }

  // `fill` needs a positioned box. Callers that place the figure themselves
  // pass their own position class (e.g. a full-bleed hero uses `absolute
  // inset-0`); adding `relative` on top of that would win in the cascade and
  // collapse the box to zero height, so only add it when unpositioned.
  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className);

  return (
    <div
      className={`${positioned ? "" : "relative"} overflow-hidden bg-media ${className}`}
    >
      <Image
        src={image.src}
        alt={pick(image.alt, locale)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
