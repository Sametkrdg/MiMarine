# MiMarine Yacht — Kurumsal Web Sitesi

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
    api/
      contact/           Resend (henüz bağlı değil — 503 döner)
      revalidate/        Sanity webhook (henüz bağlı değil — 503 döner)
    globals.css          Tailwind v4 tema token'ları
  components/site/       Navbar, Footer, Wordmark, form, yer tutucular
  i18n/                  next-intl routing / navigation / request
  lib/                   brand, site-nav, metadata, placeholder
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

Marka metinleri tek yerden gelir: [`src/lib/brand.ts`](./src/lib/brand.ts).
Logo/wordmark değişirse orayı düzenlemek yeterlidir.

## Bilinen Eksikler

- İçerik Sanity'den değil; sayfalarda yer tutucu var (Faz 2).
- `/api/contact` ve `/api/revalidate` bilinçli olarak stub — env değişkenleri
  yokken 503 döner ki hata sessizce yutulmasın.
- İletişim bilgileri `src/lib/placeholder.ts` içinde `[ADDRESS LINE 1]` gibi
  köşeli parantezli yer tutucular. Prototipteki uydurma adres/telefon/e-posta
  bilinçli olarak taşınmadı.
