# Mimarine Yacht — Kurumsal Web Sitesi

Çok dilli (TR/EN), çok sayfalı yat markası kurumsal sitesi.

- Proje kuralları: [`CLAUDE.md`](./CLAUDE.md)
- Teknik plan: [`PROJE_PLANI.md`](./PROJE_PLANI.md)
- Senin yapman gereken adımlar: [`MANUEL.md`](./MANUEL.md)
- Tasarım referansı: [`design/tasarim-prototipi.html`](./design/tasarim-prototipi.html)
  (tarayıcıda aç — tüm sayfaların onaylı görsel tasarımı)

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000 → /tr adresine yönlenir
npm run build
npm run lint
npm run typecheck
```

`.env.example` dosyasını `.env.local` olarak kopyalayıp değerleri doldurun.
Hiçbiri henüz zorunlu değil; eksik olanlar ilgili özelliği devre dışı bırakır.

## Klasör Yapısı

```
src/
  app/
    [locale]/            TR/EN altındaki tüm sayfalar
      fleet/             delivered · ready-for-delivery · in-production · [slug]
      our-world/
      news-and-events/   liste + [slug]
      dealer-and-services-network/
      contact/
    privacy-policy/      Gizlilik Politikası / KVKK (TASLAK)
    error.tsx            Çalışma zamanı hata sınırı
    not-found.tsx        404
    opengraph-image.tsx  Sosyal kart (next/og ile üretilir)
    api/
      contact/           Resend — key yoksa 503
      revalidate/        Sanity webhook (henüz stub — 503 döner)
    globals.css          Tailwind v4 tema token'ları
    robots.ts            /robots.txt
    sitemap.ts           /sitemap.xml (TR+EN, hreflang'li)
  components/site/       Navbar, Footer, Wordmark, kartlar, form, yer tutucular
  content/               types.ts · sample-data.ts · legal.ts · index.ts
  i18n/                  next-intl routing / navigation / request
  lib/                   brand, site-nav, metadata, format, site-url,
                         integrations, placeholder
  proxy.ts               locale yönlendirmesi (Next 16'da "middleware"nin yeni adı)
messages/                tr.json · en.json — sabit arayüz metinleri
```

## Tasarım Token'ları

Prototipten alınmıştır, `src/app/globals.css` içindeki `@theme` bloğunda tanımlıdır.
Gerçek marka renkleri geldiğinde **sadece burası** değişir.

| Token | Değer | Kullanım |
|---|---|---|
| `paper` | `#FBFAF8` | Zemin |
| `ink` | `#171717` | Metin, çizgiler, footer zemini |
| `accent` | `#5B54A6` | Vurgu, hover, aktif durum |
| `body` | `#525252` | Gövde metni |
| `muted` | `#737373` | İkincil / etiket metni |
| `surface` | `#F0EEEA` | Görsel yer tutucu zemini |
| `surface-alt` | `#F3F1ED` | Menü paneli zemini |

Tipografi: **Jost** (200 / 300 / 400), `next/font/google` üzerinden self-host edilir.

## Marka Adı

Marka metinleri tek yerden gelir: [`src/lib/brand.ts`](./src/lib/brand.ts) —
wordmark (tek satır `MIMARINE YACHT`), tam ad, tescilli unvan ve sosyal medya
hesapları. `social` boş olduğu sürece footer'daki sosyal satır hiç
render edilmez; ölü link göstermektense hiç göstermemek daha iyi.

## Harita

Leaflet + OpenStreetMap. Hesap, API key ve kredi kartı gerektirmez.
OSM'in tile kullanım politikası **atıf zorunlu** kılar; atıf tile katmanının
kendisi tarafından basılır, kaldırmayın. Yoğun trafikte kendi tile
sağlayıcınıza geçmek gerekebilir.

Harita yalnızca koordinatı olan bayiler varsa çizilir
(`getMappableDealers()`), yoksa yer tutucu görsel gösterilir.

## İçerik Katmanı — Sanity'ye Geçiş

Sayfalar içeriği **yalnızca** `src/content/index.ts` üzerinden alır. Bugün bu
fonksiyonlar `sample-data.ts`'i okuyor; Faz 2'de her fonksiyonun **gövdesi**
GROQ sorgusuna çevrilecek ve **hiçbir sayfa değişmeyecek**. Bu dolaylılık
bilerek konuldu — sayfalardan doğrudan `sample-data` import etmeyin.

```
src/content/types.ts        Sanity şemasını aynalayan tipler (L10n<T> = { tr, en })
src/content/sample-data.ts  ⚠ YER TUTUCU İÇERİK — Faz 2'de silinecek
src/content/index.ts        getYachts() · getEventBySlug() · getDealers() …
```

Kurallar:

- Çok dilli alanlar `L10n<T>` (`{ tr, en }`); `pick(alan, locale)` ile çözülür.
- Yaklaşan / Geçmiş etkinlik ayrımı **tarihten hesaplanır**, elle seçilmez
  (PROJE_PLANI.md'deki kural).
- Bilinmeyen slug → `notFound()` (404 döner, doğrulandı).
- Yat ve etkinlik detay sayfaları `generateStaticParams` ile prerender edilir.

## Yer Tutucu İçerik Hakkında

`src/content/sample-data.ts` bilerek şu kurallara uyar:

- Kuruluş yılı, teslim adedi gibi **hiçbir istatistik uydurulmadı** — o alanlar
  `[00]` gibi köşeli parantezli işaretler taşıyor.
- **Hiçbir telefon, e-posta veya adres uydurulmadı** — kimse yanlış bir tarafa
  ulaşamasın diye.
- Hiçbir üçüncü taraf bayi/partner firma adı uydurulmadı.
- Yatlar uydurma tekne adı yerine model/tekne numarası taşıyor.

## SEO

- Her sayfa canonical + `hreflang` (tr / en / x-default) yayınlar.
- `sitemap.xml` 48 URL içerir (statik sayfalar + 10 yat + 6 haber × 2 dil),
  her giriş kendi dil eşini `xhtml:link` ile gösterir.
- OG kartı `next/og` ile build sırasında üretilir (`opengraph-image.tsx`) —
  logo dosyası olmadığı için tipografik.
- `NEXT_PUBLIC_SITE_URL` ayarlanmazsa Vercel deployment URL'i, o da yoksa
  `localhost:3000` kullanılır. Canlıya çıkmadan **mutlaka ayarlayın**.

## İletişim Formu

`POST /api/contact` → Resend. API dil-bağımsız hata **kodu** döner
(`invalid_json` · `missing_fields` · `invalid_email` · `not_configured` ·
`send_failed`); metne çevirme işi istemcide, `messages/*.json` içindeki
`contact.form.errors` altında. Env eksikse 503 döner ve sunucu log'una neyin
eksik olduğunu yazar.

## Bilinen Eksikler

- İçerik Sanity'den değil, `src/content/sample-data.ts`'ten geliyor (Faz 2).
- Görseller yok; her görsel alanında ne geleceğini yazan yer tutucu kutu var
  (`ImagePlaceholder`). Plan Unsplash placeholder'a izin veriyor — istenirse
  eklenebilir, şu an bilerek eklenmedi (kırık görsel riski).
- Bayi haritası henüz Mapbox değil, yer tutucu kutu (token bekliyor).
- Fleet sekme şeridi dar ekranda yatay kayar (tasarımın kendi davranışı).
- `/api/revalidate` hâlâ stub — Sanity bağlanınca doldurulacak.
- İletişim formu Resend'e bağlı ama **gerçek bir key ile hiç denenmedi**;
  geçersiz key ile hata yolu doğrulandı (401 → 502), başarılı gönderim değil.
- **Harita kodu hazır ama görünmüyor.** Leaflet + OpenStreetMap ile kuruldu
  (hesap/API key/kart gerektirmez). Bayilerin koordinatı olmadığı için
  `getMappableDealers()` boş dönüyor ve yer tutucu görsel gösteriliyor.
  Koordinat girilir girilmez harita kendiliğinden devreye girer.
- **İletişim formu kapalı.** Resend key var ama gönderici/alıcı adresi ve
  domain doğrulaması yok; form alanları pasif ve "yakında aktif" notu var.
- **Gizlilik Politikası bir TASLAK** — hukuki incelemeden geçmedi, sayfanın
  üstünde bunu söyleyen bir uyarı var.
- İletişim bilgileri `src/lib/placeholder.ts` içinde `[ADDRESS LINE 1]` gibi
  köşeli parantezli yer tutucular. Prototipteki uydurma adres/telefon/e-posta
  bilinçli olarak taşınmadı.
