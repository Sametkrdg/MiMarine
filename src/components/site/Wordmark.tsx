import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";

type Props = {
  /** `header` is the centred lockup, `compact` the mobile one. */
  variant?: "header" | "compact" | "footer";
};

export default function Wordmark({ variant = "header" }: Props) {
  if (variant === "footer") {
    return (
      <div className="text-[18px] font-extralight tracking-[0.3em] text-paper">
        {brand.wordmark}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Link href="/" className="block text-center">
        <span className="text-[14px] font-extralight tracking-[0.2em] indent-[0.2em] text-ink">
          {brand.wordmark}
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="block px-5 text-center">
      <span className="block text-[20px] font-extralight tracking-[0.34em] indent-[0.34em] whitespace-nowrap text-ink">
        {brand.wordmark}
      </span>
    </Link>
  );
}
