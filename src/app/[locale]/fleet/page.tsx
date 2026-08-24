import { redirect } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

/** `/fleet` has no view of its own — the design opens on Delivered. */
export default async function FleetIndexPage({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/fleet/delivered", locale });
}
