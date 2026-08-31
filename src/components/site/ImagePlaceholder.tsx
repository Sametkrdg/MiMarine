type Props = {
  /** What this slot will eventually hold — shown while no image exists. */
  label: string;
  className?: string;
};

/**
 * Stands in for an image until real photography arrives via Sanity.
 * Mirrors the `<image-slot>` boxes in `design/tasarim-prototipi.html`.
 */
export default function ImagePlaceholder({ label, className = "" }: Props) {
  return (
    <div
      className={`flex items-center justify-center bg-media ${className}`}
    >
      <span className="eyebrow max-w-[34ch] px-6 text-center leading-[2]">{label}</span>
    </div>
  );
}
