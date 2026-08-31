"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  // Locale-stripped path with the dynamic segments already resolved, so the
  // switch stays on the current page instead of falling back to the root.
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: (typeof routing.locales)[number]) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={`flex items-center text-[11px] ${
        compact ? "gap-[9px] tracking-[0.14em]" : "gap-[9px] tracking-[0.18em]"
      } ${isPending ? "opacity-60" : ""}`}
    >
      {routing.locales.map((code, i) => (
        <span key={code} className="flex items-center gap-[9px]">
          {i > 0 && <span className="h-[11px] w-px bg-ink/30" aria-hidden />}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={code === locale ? "true" : undefined}
            className={`cursor-pointer uppercase transition-colors ${
              code === locale ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
