import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/site/Footer";
import ChatWidget from "@/components/site/ChatWidget";
import Navbar from "@/components/site/Navbar";
import PageTransition from "@/components/site/PageTransition";
import { getYachtCounts } from "@/content";
import { routing } from "@/i18n/routing";
import { isChatConfigured } from "@/lib/integrations";
import { brand } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400"],
  variable: "--font-jost",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("defaultDescription"),
    openGraph: {
      type: "website",
      siteName: brand.fullName,
      locale,
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Opts every page under this layout into static rendering.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const fleetCounts = await getYachtCounts();

  return (
    <html lang={locale} className={jost.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {t("skipToContent")}
          </a>
          <Navbar fleetCounts={fleetCounts} />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          {isChatConfigured() && <ChatWidget />}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
