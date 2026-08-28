"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { YachtStatus } from "@/content/types";
import { fleetTabs, mobileLinks, newsSections, primaryRoutes } from "@/lib/site-nav";
import LanguageSwitcher from "./LanguageSwitcher";
import Wordmark from "./Wordmark";

type MenuKey = "fleet" | "news";

function Chevron() {
  return (
    <span
      aria-hidden
      className="block h-[6px] w-[6px] -translate-y-[2px] rotate-45 border-b border-r border-ink"
    />
  );
}

export default function Navbar({
  fleetCounts,
}: {
  /** Yacht count per status, resolved on the server by the layout. */
  fleetCounts: Record<YachtStatus, number>;
}) {
  const t = useTranslations("nav");
  const tFleet = useTranslations("fleetTabs");
  const tNews = useTranslations("newsSections");
  const tCount = useTranslations("fleet");

  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /** Following any link dismisses the dropdown and the mobile drawer. */
  function closeAll() {
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const menus: Record<
    MenuKey,
    { title: string; items: { href: string; label: string; meta?: string }[] }
  > = {
    fleet: {
      title: t("fleet"),
      items: fleetTabs.map((tab) => ({
        href: tab.href,
        label: tFleet(tab.labelKey),
        meta: tCount("count", { count: fleetCounts[tab.status] }),
      })),
    },
    news: {
      title: t("newsAndEvents"),
      items: newsSections.map((s) => ({ href: s.href, label: tNews(s.labelKey) })),
    },
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-ink bg-paper"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* ── Desktop bar ───────────────────────────────────────────────── */}
      <div className="shell hidden h-[86px] grid-cols-[1fr_auto_1fr] items-center gap-6 xl:grid">
        <nav className="flex items-center gap-7 2xl:gap-[38px]">
          <div
            className="flex items-center gap-2 py-2"
            onMouseEnter={() => setOpenMenu("fleet")}
          >
            <Link href={primaryRoutes.fleet} onClick={closeAll} className="nav-link text-ink">
              {t("fleet")}
            </Link>
            <button
              type="button"
              aria-expanded={openMenu === "fleet"}
              aria-label={t("fleet")}
              onClick={() => setOpenMenu(openMenu === "fleet" ? null : "fleet")}
              className="cursor-pointer"
            >
              <Chevron />
            </button>
          </div>

          <Link
            onClick={closeAll}
            href={primaryRoutes.ourWorld}
            className="nav-link py-2"
            onMouseEnter={() => setOpenMenu(null)}
          >
            {t("ourWorld")}
          </Link>

          <div
            className="flex items-center gap-2 py-2"
            onMouseEnter={() => setOpenMenu("news")}
          >
            <Link href={primaryRoutes.news} onClick={closeAll} className="nav-link text-ink">
              {t("newsAndEvents")}
            </Link>
            <button
              type="button"
              aria-expanded={openMenu === "news"}
              aria-label={t("newsAndEvents")}
              onClick={() => setOpenMenu(openMenu === "news" ? null : "news")}
              className="cursor-pointer"
            >
              <Chevron />
            </button>
          </div>
        </nav>

        <Wordmark />

        <nav className="flex items-center justify-end gap-[22px] 2xl:gap-[26px]">
          <LanguageSwitcher />
          <Link
            onClick={closeAll}
            href={primaryRoutes.network}
            className="nav-link"
            onMouseEnter={() => setOpenMenu(null)}
          >
            {t("network")}
          </Link>
          <Link
            onClick={closeAll}
            href={primaryRoutes.contact}
            className="nav-link"
            onMouseEnter={() => setOpenMenu(null)}
          >
            {t("contact")}
          </Link>
          <Link
            onClick={closeAll}
            href={primaryRoutes.preOrder}
            className="nav-link border border-ink px-[22px] py-[11px] transition-colors hover:border-accent hover:bg-accent hover:text-paper"
            onMouseEnter={() => setOpenMenu(null)}
          >
            {t("preOrder")}
          </Link>
        </nav>
      </div>

      {/* ── Mobile bar ────────────────────────────────────────────────── */}
      <div className="xl:hidden">
        <div className="grid h-[70px] grid-cols-[40px_minmax(0,1fr)_62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? t("closeMenu") : t("openMenu")}
            className="flex w-[26px] cursor-pointer flex-col gap-[6px] py-[14px]"
          >
            <span className="block h-px bg-ink" />
            <span className="block h-px bg-ink" />
          </button>
          <Wordmark variant="compact" />
          <div className="flex justify-end">
            <LanguageSwitcher compact />
          </div>
        </div>

        {drawerOpen && (
          <div className="flex flex-col border-t border-ink bg-surface-alt px-6 pt-[14px] pb-[30px]">
            {mobileLinks.map((link) => (
              <Link
                onClick={closeAll}
                key={link.href}
                href={link.href}
                className="border-b border-ink py-[15px] text-[19px] font-light text-ink"
              >
                {link.ns === "fleetTabs" ? tFleet(link.key) : t(link.key)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop dropdown panel ────────────────────────────────────── */}
      {openMenu && (
        <div className="hidden border-t border-ink bg-surface-alt xl:block">
          <div className="shell flex gap-24 pt-[38px] pb-[44px]">
            <div className="eyebrow w-[150px] pt-[6px] tracking-[0.3em]">
              {menus[openMenu].title}
            </div>
            <div className="flex flex-col gap-[2px]">
              {menus[openMenu].items.map((item) => (
                <Link
                  onClick={closeAll}
                  key={item.href}
                  href={item.href}
                  className="flex min-w-[420px] items-baseline justify-between gap-10 border-b border-ink py-[9px] text-[26px] font-extralight text-ink transition-colors hover:text-accent"
                >
                  <span>{item.label}</span>
                  {item.meta && (
                    <span className="text-[11px] tracking-[0.16em] text-muted">
                      {item.meta}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
