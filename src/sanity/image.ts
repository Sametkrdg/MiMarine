import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Absolute CDN URL for a Sanity image, sized for the largest slot the design
 * uses. `next/image` resizes down from here.
 */
export function imageUrl(source: SanityImageSource | undefined, width = 1800): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto("format").quality(75).url();
}
