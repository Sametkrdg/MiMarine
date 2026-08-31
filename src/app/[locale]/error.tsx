"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Surfaced in the Vercel function logs; the digest is the only handle a
    // user can quote back to us.
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-32">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="mt-[26px] max-w-[20ch] text-[34px] font-extralight text-pretty text-ink lg:text-[56px]">
        {t("title")}
      </h1>
      <p className="mt-7 max-w-[48ch] text-[17px] leading-[2] text-body">{t("body")}</p>
      {error.digest && (
        <p className="mt-4 text-[12px] tracking-[0.16em] text-muted">
          {t("reference")}: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-12 w-fit cursor-pointer border border-ink/38 px-10 py-4 text-[11px] tracking-label text-ink uppercase transition-colors hover:border-accent hover:bg-accent hover:text-deep"
      >
        {t("retry")}
      </button>
    </section>
  );
}
