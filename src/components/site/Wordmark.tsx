import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";

type Props = {
  /** `header` is the centred two-line lockup, `compact` the mobile one. */
  variant?: "header" | "compact" | "footer";
};

export default function Wordmark({ variant = "header" }: Props) {
  if (variant === "footer") {
    return (
      <div className="text-[18px] font-extralight tracking-wordmark text-paper">
        {brand.wordmark}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Link href="/" className="block text-center">
        <span className="text-[16px] font-extralight tracking-[0.38em] indent-[0.38em] text-ink">
          {brand.wordmark}
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="block px-5 text-center">
      <span className="block text-[22px] font-extralight tracking-wordmark indent-[0.46em] text-ink">
        {brand.wordmark}
      </span>
      <span className="mt-[5px] block text-[8px] font-light tracking-[0.42em] indent-[0.42em] text-muted">
        {brand.wordmarkSub}
      </span>
    </Link>
  );
}
