import FleetTabPage from "@/components/site/FleetTabPage";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "fleetTabs", "readyForDelivery");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <FleetTabPage locale={locale} tab="readyForDelivery" />;
}
