# CLAUDE.md

Bu dosya, bu depoda çalışan Claude Code için proje talimatlarını içerir.

## Proje Özeti

Sürdürülebilir neo-minimalist tasarımlı, çok sayfalı (one-page değil) bir yat markası kurumsal web sitesi. Tam teknik plan ve mimari için `PROJE_PLANI.md` dosyasına bakılmalı — bu dosya o planın "kurallar" özetidir.

## ⚠️ EN ÖNEMLİ KURAL: Tahmin Etme, Sor

Ürünü, mimariyi, veri modelini, kullanıcı deneyimini, üçüncü parti servis kullanımını veya iş mantığını etkileyen **herhangi bir konuda** belirsizlik varsa **DURUP kullanıcıya sor**. "Muhtemelen şunu istemiştir" diyerek varsayımla ilerleme — yanlış varsayım geri almaktan daha pahalıya mal olur.

Sormadan ilerlenebilecek TEK istisna: geri döndürülebilir, kullanıcı deneyimini/mimariyi etkilemeyen saf kod-içi implementasyon detayları (değişken adı, iç fonksiyon organizasyonu, yardımcı dosya konumu gibi). Bunun dışındaki her şey — yeni bir kütüphane/servis eklemek, bir sayfanın davranışını değiştirmek, veri modeline alan eklemek, bir üçüncü parti API seçmek, tasarımda netleşmemiş bir detayı doldurmak — önce kullanıcıya sorulmalı.

Şüpheye düştüğünde varsayılan davranış: **sor**.

## Onaylanmış Teknoloji Kararları (Bunlar İçin Tekrar Sorulmaz)

| Katman | Seçim |
|---|---|
| Framework | Next.js (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS |
| İçerik Yönetimi | Sanity (ücretsiz plan) |
| Hosting | Vercel (ücretsiz/Hobby plan) |
| i18n | next-intl, rota bazlı: `/tr/...`, `/en/...` |
| Harita | Mapbox |
| İletişim formu | Resend (Next.js API route üzerinden) |
| Analytics | Vercel Analytics |
| Görseller (şimdilik) | Unsplash placeholder — gerçek görseller gelince Sanity üzerinden değiştirilecek |
| Paket yöneticisi | npm |
| Test altyapısı | Yok (bu aşamada kapsam dışı) |

## Site Mimarisi (Route Yapısı)

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

Fleet sekmeleri ayrı route olarak kurulur (client-state tab değil) — SEO ve linklenebilirlik için.

## İçerik Modeli (Sanity) — Özet

Detaylı alan listesi `PROJE_PLANI.md` içinde. Şema tipleri: `yacht`, `event`, `dealerLocation`, `OurWorldPage` (singleton), `HomePage` (singleton), `SiteSettings` (singleton).

News and Events'teki "Yaklaşan / Gerçekleşen" ayrımı `eventDate` alanına göre otomatik hesaplanır, client elle durum seçmez. Bu varsayım netleşmemiş bir noktaydı — client farklı bir davranış isterse (örn. ayrı bir "haber" içerik tipi istiyorsa) önce sorulmalı, sessizce değiştirilmemeli.

## Manuel Adım Kuralı

Geliştirme sırasında şu tür bir ihtiyaç ortaya çıkarsa — hesap açma, API key/token alma, DNS/domain ayarı, ödeme gerektiren bir kayıt, Vercel/Sanity dashboard üzerinden yapılması gereken bir ayar, ya da kod ile otomatikleştirilemeyen herhangi bir şey — bunu kendi başına yapmaya ÇALIŞMA. Bunun yerine:

1. `MANUEL.md` dosyasına yeni bir madde olarak ekle (hangi kategori altına gireceğini de düşünerek).
2. Kullanıcıya bu adımın eklendiğini ve neden gerektiğini bildir.
3. O adım tamamlanana kadar bağımlı olduğu işi bekletme gerekiyorsa bunu açıkça belirt.

## Netleşmemiş / Sorulması Gereken Açık Noktalar

Bunlar `PROJE_PLANI.md`'de de listelenmiştir; ilgili sayfa/özellik geliştirilirken bu noktalara gelindiğinde kullanıcıya sorulmalı, varsayımla doldurulmamalıdır:

- Domain adı henüz belirlenmedi.
- Gerçek yat fotoğrafları, logo, marka renkleri henüz yok (Unsplash placeholder kullanılıyor).
- Yat teknik özellik alanlarının (uzunluk, kapasite, motor vb.) kesin listesi netleşmedi.
- İletişim formu / harita / analytics nedeniyle bir Gizlilik Politikası / KVKK sayfası gerekip gerekmediği netleşmedi.
- News and Events'in tek "event" tipiyle mi yönetileceği, yoksa ayrı bir "haber" (event olmayan duyuru) tipi de gerekip gerekmediği netleşmedi (şu an tek tip varsayımıyla ilerleniyor, bkz. yukarı).

## Dil / İçerik Kuralları

- Kullanıcı arayüzü içerikleri TR ve EN olarak ikilenecek (next-intl + Sanity'deki lokalize alanlar).
- Kod içi yorumlar ve commit mesajları için bir dil tercihi netleşmedi — netleşene kadar İngilizce kullanılacak (bu değiştirilebilir bir varsayımdır, kullanıcı isterse değiştirilir).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
