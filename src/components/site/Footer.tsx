import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brand } from "@/lib/brand";
import { placeholderContact } from "@/lib/placeholder";
import { fleetTabs, primaryRoutes } from "@/lib/site-nav";
import Wordmark from "./Wordmark";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tFleet = await getTranslations("fleetTabs");

  const columns = [
    {
      title: t("fleet"),
      links: fleetTabs.map((tab) => ({ href: tab.href, label: tFleet(tab.labelKey) })),
    },
    {
      title: t("company"),
      links: [
        { href: primaryRoutes.ourWorld, label: tNav("ourWorld") },
        { href: primaryRoutes.news, label: tNav("newsAndEvents") },
        { href: primaryRoutes.network, label: tNav("network") },
      ],
    },
    {
      title: t("contact"),
      links: [
        { href: primaryRoutes.preOrder, label: tNav("preOrder") },
        { href: primaryRoutes.contact, label: t("enquiries") },
        { href: primaryRoutes.network, label: t("ownerServices") },
        { href: primaryRoutes.contact, label: t("press") },
      ],
    },
  ];

  return (
    <footer className="bg-deep text-ink/70">
      <div className="shell grid grid-cols-2 gap-16 pt-[88px] pb-[44px] lg:grid-cols-[1.4fr_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Wordmark variant="footer" />
          <address className="mt-[22px] max-w-[30ch] text-[14px] leading-[2] not-italic">
            {placeholderContact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">{placeholderContact.phone}</span>
          </address>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-[10px] tracking-label text-ink/[0.52] uppercase">
              {col.title}
            </div>
            <div className="mt-6 flex flex-col gap-[14px]">
              {col.links.map((link) => (
                <Link
                  key={`${col.title}-${link.label}`}
                  href={link.href}
                  className="text-[14px] text-ink/[0.78] transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-ink/[0.14] pt-[26px] pb-10 text-[11px] tracking-[0.16em] text-ink/50">
          <span>
            © {new Date().getFullYear()} {brand.legalName} · {t("rights")}
          </span>
          <span className="flex gap-7">
            {/* Social handles are not known yet; a dead link reads worse than
                no link, so the row stays empty until brand.social is filled. */}
            {brand.social.map((account) => (
              <a
                key={account.href}
                href={account.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {account.label}
              </a>
            ))}
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              {t("privacy")}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
