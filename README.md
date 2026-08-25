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

## Site Asistanı (chatbot)

Google Gemini ile çalışır. Bilgi tabanı, sayfaların okuduğu **aynı içerik
katmanından** her istekte yeniden kurulur (`src/lib/chat-context.ts`) — vektör
veritabanı, embedding adımı, ek servis yok. Bot siteden daha eski bilgi
veremez ve site dışına çıkamaz.

```
src/lib/chat-context.ts        Bilgi tabanı + sistem talimatı
src/app/api/chat/route.ts      Gemini'ye stream eden uç nokta
src/components/site/ChatWidget.tsx   Arayüz
```

- Model `GEMINI_MODEL` ile değiştirilebilir; varsayılan `gemini-3.5-flash-lite`.
- `GEMINI_API_KEY` yoksa **balon hiç render edilmez** — çalışmayan bir butona
  tıklanmaz.
- IP başına 10 dakikada 20 istek sınırı var. Serverless örnekler bellek
  paylaşmadığı için bu tek örneği sınırlar; ücretsiz kotayı kazara tüketmeye
  karşı yeterli, güvenlik kontrolü değil.
- Sistem talimatı botu üç konuda bağlar: **uydurma yok** (fiyat, tarih, garanti
  sorulursa iletişime yönlendirir), **kişisel bilgi istemez**, **teknik
  özelliklerin geçici olduğunu söyler**. Üçü de test edildi.
- Sohbet kutusunun altında Gemini kullanıldığı ve kişisel bilgi paylaşılmaması
  gerektiği yazar; KVKK metnine de ayrı bir bölüm eklendi.

## Harita

Leaflet + OpenStreetMap. Hesap, API key ve kredi kartı gerektirmez.
OSM'in tile kullanım politikası **atıf zorunlu** kılar; atıf tile katmanının
kendisi tarafından basılır, kaldırmayın. Yoğun trafikte kendi tile
sağlayıcınıza geçmek gerekebilir.

Bayi haritası yalnızca koordinatı olan bayiler varsa çizilir
(`getMappableDealers()`), yoksa yer tutucu görsel gösterilir.

İletişim sayfasındaki harita tersanenin gerçek konumunu gösterir
(`40.968312, 40.305812` — client tarafından doğrulandı).

## İçerik Katmanı — Sanity

Sayfalar içeriği **yalnızca** `src/content/index.ts` üzerinden alır; oradan
doğrudan `sample-data` import etmeyin.

```
src/content/types.ts        Ortak tipler (L10n<T> = { tr, en })
src/content/index.ts        getYachts() · getEventBySlug() · getDealers() …
src/content/sample-data.ts  ⚠ YER TUTUCU — Sanity dolunca silinecek
src/sanity/schemas/         Sanity şeması
src/sanity/queries.ts       GROQ + Sanity → site tiplerine dönüşüm
src/sanity/client.ts        Read-only client (projectId yoksa null döner)
```

**Devretme mantığı:** her koleksiyon için önce Sanity sorgulanır. Sanity
yapılandırılmamışsa, ulaşılamıyorsa ya da o tipte **hiç doküman yoksa**
`sample-data.ts`'e düşülür. Yani içerik girdikçe site koleksiyon koleksiyon
Sanity'ye geçer; hepsi girilince `sample-data.ts` silinebilir.

Bu davranış uçtan uca test edildi: Sanity'ye bir bayi dokümanı yazıldığında
site örnek veriyi bırakıp Sanity'yi gösterdi ve koordinatı olduğu için harita
devreye girdi; doküman silinince örnek veriye geri döndü.

### Sanity Studio

`/studio` adresinde gömülü çalışır — ayrı bir deploy gerekmez. Üç singleton
(Ana Sayfa, Dünyamız, Site Ayarları) sabit id'lere sabitlendi, editör yanlışlıkla
ikinci bir kopya oluşturamaz.

Çok dillilik **alan bazlı**: her çevrilebilir alan `{ tr, en }` nesnesi. Eklenti
yok, doküman ikizlemesi yok — tek yat dokümanında iki dil yan yana.

Uzun metin alanları düz metin olarak saklanır; **boş satır paragraf ayırır**.

### İçerik değişince site nasıl tazelenir

`POST /api/revalidate` — Sanity webhook'u. `next-sanity/webhook` imzayı
`SANITY_REVALIDATE_SECRET` ile doğrular, imzasız istek reddedilir. Doküman
tipine göre etkilenen yolları TR ve EN için ayrı ayrı `revalidatePath` eder.

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

- Sanity bağlandı ve test edildi, ama **dataset henüz boş** — içerik girilene
  kadar site `sample-data.ts`'i gösteriyor.
- Görseller yok; her görsel alanında ne geleceğini yazan yer tutucu kutu var
  (`ImagePlaceholder`). Plan Unsplash placeholder'a izin veriyor — istenirse
  eklenebilir, şu an bilerek eklenmedi (kırık görsel riski).
- Bayi haritası henüz Mapbox değil, yer tutucu kutu (token bekliyor).
- Fleet sekme şeridi dar ekranda yatay kayar (tasarımın kendi davranışı).

- İletişim formu Resend'e bağlı ama **gerçek bir key ile hiç denenmedi**;
  geçersiz key ile hata yolu doğrulandı (401 → 502), başarılı gönderim değil.
- **Bayi haritası boş.** Leaflet + OpenStreetMap kuruldu ve çalışıyor;
  bayilerin koordinatı olmadığı için yer tutucu görsel gösteriliyor.
  Koordinat girilir girilmez devreye girer. (İletişim sayfasındaki tersane
  haritası çalışıyor.)
- **İletişim formu kapalı.** Resend key var ama gönderici/alıcı adresi ve
  domain doğrulaması yok; form alanları pasif ve "yakında aktif" notu var.
- **Gizlilik Politikası bir TASLAK** — hukuki incelemeden geçmedi, sayfanın
  üstünde bunu söyleyen bir uyarı var.
- İletişim bilgileri `src/lib/placeholder.ts` içinde `[ADDRESS LINE 1]` gibi
  köşeli parantezli yer tutucular. Prototipteki uydurma adres/telefon/e-posta
  bilinçli olarak taşınmadı.
