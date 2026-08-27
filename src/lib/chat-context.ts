import { cache } from "react";
import {
  getDealers,
  getEvents,
  getHomeContent,
  getOffices,
  getOurWorldContent,
  getYachts,
  pick,
  type Locale,
} from "@/content";
import { brand } from "./brand";

/**
 * The assistant's entire knowledge base.
 *
 * Built from the same content layer the pages read, so the bot can never be
 * more out of date than the site itself, and nothing outside the site is in
 * scope. Small enough to send whole on every request — no vector store, no
 * embedding step, no extra service.
 */

/** One Sanity round trip per request even if several turns arrive together. */
export const buildSiteContext = cache(async (locale: Locale): Promise<string> => {
  const [yachts, { upcoming, past }, dealers, offices, home, world] =
    await Promise.all([
      getYachts(),
      getEvents(),
      getDealers(),
      getOffices(),
      getHomeContent(),
      getOurWorldContent(),
    ]);

  const statusLabel: Record<string, string> = {
    delivered: locale === "tr" ? "Teslim edildi" : "Delivered",
    "ready-for-delivery": locale === "tr" ? "Teslime hazır" : "Ready for delivery",
    "in-production": locale === "tr" ? "Üretimde" : "In production",
  };

  const lines: string[] = [];

  lines.push(`# ${brand.fullName}`);
  lines.push("");

  lines.push(locale === "tr" ? "## Şirket" : "## The company");
  lines.push(`- ${pick(home.statement, locale)}`);
  lines.push(`- ${pick(home.statementBody, locale)}`);
  lines.push(`- ${pick(world.statement, locale)}`);
  lines.push(`- ${pick(world.statementBody, locale)}`);
  for (const f of home.figures) {
    // Bracketed values are unfilled placeholders; do not feed them to the model.
    if (f.value.startsWith("[")) continue;
    lines.push(`- ${pick(f.label, locale)}: ${f.value} — ${pick(f.note, locale)}`);
  }
  for (const p of world.pillars) {
    lines.push(`- ${pick(p.title, locale)}: ${pick(p.body, locale)}`);
  }
  for (const c of world.commitments) {
    lines.push(`- ${pick(c.title, locale)}: ${pick(c.body, locale)}`);
  }
  lines.push("");

  lines.push(locale === "tr" ? "## Filo" : "## Fleet");
  for (const y of yachts) {
    lines.push(
      `- ${y.name} — ${statusLabel[y.status]}, ${pick(y.loa, locale)}. ${pick(y.lede, locale)}`,
    );
    const specs = y.specs
      .map((s) => `${pick(s.key, locale)}: ${pick(s.value, locale)}`)
      .join(" · ");
    if (specs) lines.push(`  ${specs}`);
    lines.push(`  URL: /${locale}/fleet/${y.slug}`);
  }
  lines.push("");

  lines.push(locale === "tr" ? "## Yaklaşan etkinlikler" : "## Upcoming events");
  if (upcoming.length === 0) {
    lines.push(locale === "tr" ? "- Planlanmış etkinlik yok." : "- None scheduled.");
  }
  for (const e of upcoming) {
    lines.push(
      `- ${pick(e.title, locale)} — ${e.date}${e.endDate ? ` → ${e.endDate}` : ""}, ${pick(e.location, locale)}. ${pick(e.excerpt, locale)}`,
    );
    lines.push(`  URL: /${locale}/news-and-events/${e.slug}`);
  }
  lines.push("");

  lines.push(locale === "tr" ? "## Geçmiş etkinlikler" : "## Past events");
  for (const e of past.slice(0, 8)) {
    lines.push(`- ${pick(e.title, locale)} — ${e.date}, ${pick(e.location, locale)}`);
  }
  lines.push("");

  lines.push(locale === "tr" ? "## Bayi ve servis ağı" : "## Dealer and service network");
  if (dealers.length === 0) {
    lines.push(
      locale === "tr"
        ? "- Bayi ve servis ağı henüz kurulmadı; şu an listelenmiş bayi yok. Bayilik almak isteyenler İletişim sayfası üzerinden başvurabilir."
        : "- The dealer and service network is not established yet; no dealers are listed. Those interested in a dealership can apply through the Contact page.",
    );
  }
  for (const d of dealers) {
    lines.push(
      `- ${d.city}${d.company ? ` — ${d.company}` : ""} (${d.type}), ${pick(d.capabilities, locale)}`,
    );
  }
  lines.push("");

  lines.push(locale === "tr" ? "## İletişim" : "## Contact");
  for (const o of offices) {
    lines.push(
      `- ${pick(o.role, locale)}, ${o.city}: ${o.addressLines.join(", ")} · ${o.phone} · ${o.email}`,
    );
  }
  lines.push("");

  lines.push(locale === "tr" ? "## Site sayfaları" : "## Site pages");
  for (const [label, path] of [
    [locale === "tr" ? "Ana sayfa" : "Home", "/"],
    [
      locale === "tr" ? "Teslim edilen yatlar" : "Delivered yachts",
      "/fleet/delivered",
    ],
    [
      locale === "tr" ? "Teslime hazır yatlar" : "Yachts ready for delivery",
      "/fleet/ready-for-delivery",
    ],
    [
      locale === "tr" ? "Üretimdeki yatlar" : "Yachts in production",
      "/fleet/in-production",
    ],
    [locale === "tr" ? "Dünyamız" : "Our World", "/our-world"],
    [locale === "tr" ? "Haberler ve Etkinlikler" : "News and Events", "/news-and-events"],
    [
      locale === "tr" ? "Bayi ve Servis Ağı" : "Dealer and Services Network",
      "/dealer-and-services-network",
    ],
    [locale === "tr" ? "İletişim" : "Contact", "/contact"],
    [locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy", "/privacy-policy"],
  ]) {
    lines.push(`- ${label}: /${locale}${path === "/" ? "" : path}`);
  }

  return lines.join("\n");
});

/**
 * System instruction.
 *
 * Two things it must hold: never invent a fact about the company, and never
 * ask for personal data. The site is pre-launch, so it also has to admit that
 * some figures are provisional rather than present them as final.
 */
export function buildSystemInstruction(locale: Locale, siteContext: string): string {
  const rules =
    locale === "tr"
      ? `Sen ${brand.fullName} kurumsal web sitesinin asistanısın.

KURALLAR:
1. SADECE aşağıdaki "SİTE BİLGİLERİ" bölümündeki verilere dayanarak cevap ver.
2. Bilmediğin bir şey sorulursa uydurma. "Bu bilgi sitede yer almıyor" de ve İletişim sayfasına yönlendir (/${locale}/contact).
3. Fiyat, teslim tarihi, kampanya, garanti koşulu gibi bilgileri ASLA tahmin etme — bunlar sitede yok.
4. Teknik özellikler henüz geçicidir; kesin veri sorulursa bunu belirt.
5. Kullanıcıdan kişisel bilgi (telefon, e-posta, adres, kimlik) İSTEME. Kullanıcı kendiliğinden yazarsa da tekrarlama ve kaydetmeye çalışma; iletişim formuna yönlendir.
6. Kısa ve sade cevap ver — en fazla 3-4 cümle. Gerekirse ilgili sayfanın adresini ver.
7. Yalnızca Türkçe cevap ver.
8. Marka adını her zaman "${brand.fullName}" olarak yaz.
9. Site dışı konulara (genel sohbet, başka markalar, siyaset vb.) girme; nazikçe konuyu siteye çevir.`
      : `You are the assistant for the ${brand.fullName} website.

RULES:
1. Answer ONLY from the "SITE DATA" section below.
2. If you do not know something, do not invent it. Say it is not on the site and point to the contact page (/${locale}/contact).
3. NEVER guess prices, delivery dates, promotions or warranty terms — they are not on the site.
4. Specifications are provisional; say so if asked for definitive figures.
5. Do NOT ask the user for personal data (phone, e-mail, address, ID). If they volunteer it, do not repeat it back or try to store it; point them to the contact form.
6. Keep answers short and plain — at most 3-4 sentences. Give the relevant page path when useful.
7. Answer only in English.
8. Always write the brand as "${brand.fullName}".
9. Stay on the subject of this site; politely decline unrelated topics.`;

  return `${rules}

--- ${locale === "tr" ? "SİTE BİLGİLERİ" : "SITE DATA"} ---
${siteContext}`;
}
