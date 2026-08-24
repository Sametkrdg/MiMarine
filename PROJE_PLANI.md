# Yat Markası Web Sitesi — Proje Planı

Bu doküman, Claude Code ile geliştirmeye başlarken referans alınacak teknik proje planıdır. Görüşmede netleşen kararlar ve varsayımlar aşağıda yer alıyor.

## 1. Teknoloji Yığını

| Katman | Seçim |
|---|---|
| Framework | Next.js (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS |
| İçerik Yönetimi | Sanity (ücretsiz plan) |
| Hosting | Vercel (ücretsiz/Hobby plan) |
| Çoklu dil (i18n) | next-intl, rota bazlı: `/tr/...`, `/en/...` |
| Harita | Mapbox |
| İletişim formu | Resend (Next.js API route üzerinden) |
| Analytics | Vercel Analytics |
| Görseller (şimdilik) | Unsplash (placeholder), sonradan Sanity üzerinden değiştirilecek |
| Paket yöneticisi | npm |
| Test altyapısı | Yok (bu aşamada kapsam dışı) |

## 2. Site Mimarisi (Route Yapısı)

Tüm rotalar `/tr` ve `/en` altında ikilenir (next-intl).

```
/[locale]/                                  → Ana Sayfa
/[locale]/fleet                             → Fleet (varsayılan: Delivered'a yönlendirir)
/[locale]/fleet/delivered                   → Teslim Edilmiş Yatlar
/[locale]/fleet/ready-for-delivery          → Teslimata Hazır Yatlar
/[locale]/fleet/in-production               → Üretim Aşamasındaki Yatlar
/[locale]/fleet/[slug]                      → Yat Detay Sayfası
/[locale]/our-world                         → Our World
/[locale]/news-and-events                   → News and Events (Yaklaşan / Gerçekleşen bölümleri)
/[locale]/news-and-events/[slug]            → Haber/Etkinlik Detay Sayfası
/[locale]/dealer-and-services-network       → Bayi ve Servis Ağı (Mapbox harita + liste)
/[locale]/contact                           → İletişim
```

Navbar: sol → Fleet (dropdown: 3 sekme), Our World, News and Events (dropdown: Upcoming/Past) · orta → Logo · sağ → TR/EN, Dealer and Services Network, Contact.

Fleet sekmeleri ayrı route olarak kurulacak (tek sayfada client-state yerine), böylece her sekme SEO açısından ayrı indexlenebilir ve linklenebilir olur.

## 3. Sanity İçerik Modeli (Schema Taslağı)

- **Yacht** (`yacht`): title, slug, status (`delivered` / `ready-for-delivery` / `in-production`), coverImage, gallery[], length/beam/draft/engine/capacity gibi teknik özellikler (key-value liste), kısa açıklama, uzun açıklama (rich text), featured (bool), order, TR/EN alan çiftleri.
- **Event** (`event`): title, slug, eventDate, location, coverImage, gallery[], body (rich text), TR/EN alan çiftleri. "Yaklaşan / Gerçekleşen" ayrımı elle seçilmez — `eventDate` bugünün tarihiyle karşılaştırılarak otomatik hesaplanır.
- **DealerLocation** (`dealerLocation`): name, type (`dealer` / `service` / `both`), country, city, address, coordinates (lat/lng — Mapbox için), phone, email, website.
- **OurWorldPage** (singleton): esnek içerik blokları (başlık + zengin metin + görsel) — client'ın metni/görseli kod dokunmadan güncelleyebilmesi için.
- **HomePage** (singleton): hero görsel/başlık, öne çıkan yat referansları, kısa marka mesajı.
- **SiteSettings** (singleton): logo, iletişim bilgileri, sosyal medya linkleri, varsayılan SEO (meta title/description/OG görsel).

> Not: Bu şema taslağı planlama amaçlıdır; geliştirme sırasında gerçek içerik ihtiyacına göre alan eklenip çıkarılabilir.

## 4. Klasör Yapısı (Öneri)

```
/app
  /[locale]
    layout.tsx
    page.tsx                     # Home
    /fleet/...
    /our-world/page.tsx
    /news-and-events/...
    /dealer-and-services-network/page.tsx
    /contact/page.tsx
  /api
    /contact/route.ts             # Resend entegrasyonu
    /revalidate/route.ts          # Sanity webhook → ISR tazeleme
/components                       # Navbar, Footer, YachtCard, EventCard, MapView, ContactForm, LanguageSwitcher...
/sanity
  /schemas
  client.ts
  queries.ts
/messages
  tr.json                         # sabit arayüz metinleri (buton, menü vb.)
  en.json
/lib                               # yardımcı fonksiyonlar
```

## 5. Geliştirme Fazları

1. **Kurulum** — Next.js + TS + Tailwind scaffold, ESLint/Prettier, next-intl rota yapısı, temel layout (boş Navbar/Footer), Vercel projesine bağlama.
2. **Sanity Entegrasyonu** — Sanity projesi oluşturma, yukarıdaki şemaların tanımlanması, Sanity Studio erişimi, GROQ sorguları, Next.js'e bağlanması, içerik değişince otomatik güncelleme için webhook + ISR.
3. **Sayfa Geliştirme** — Home, Fleet (3 sekme + detay), Our World, News and Events (iki bölüm + detay), Dealer and Services Network (Mapbox), Contact (form + Resend). Navbar/Footer finalize, dil değiştirici, mobil menü.
4. **İçerik & Görsel** — Unsplash placeholder görsellerin yerleştirilmesi, TR/EN arayüz ve örnek içerik metinlerinin girilmesi.
5. **Cilalama** — Vercel Analytics, sayfa bazlı SEO metadata (TR/EN), görsel/font optimizasyonu, 404 ve hata/yüklenme durumları, erişilebilirlik kontrolü.
6. **Deploy & Teslim** — Vercel'e canlıya alma, environment variable'ların ayarlanması, Sanity Studio kullanım kılavuzu (client kendi içerik eklesin diye), son test turu.

## 6. Ortam Değişkenleri (.env)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
NEXT_PUBLIC_MAPBOX_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL_TO=
```

## 7. Açık Noktalar / Sonradan Netleşecekler

- Gerçek yat fotoğrafları, logo ve marka renkleri geldiğinde Unsplash placeholder'ların yerine geçecek.
- Domain adı henüz belirlenmedi (Vercel varsayılan `.vercel.app` adresiyle başlanabilir).
- Yat teknik özellik alanlarının (uzunluk, kapasite, motor vb.) kesin listesi netleşmedi — geliştirme sırasında makul bir başlangıç seti kullanılıp gerekirse genişletilecek.
- İletişim formu ve harita/analytics nedeniyle bir Gizlilik Politikası / KVKK metni sayfası gerekip gerekmediği netleşmedi.
- Vercel ve Sanity ücretsiz plan limitleri şu an için yeterli görünüyor; trafik/içerik hacmi büyürse ücretli plana geçiş gerekebilir.

## 8. Sonraki Adım

Bu plan onaylandıktan sonra Claude Code ile Faz 1'den (kurulum) başlanabilir.
