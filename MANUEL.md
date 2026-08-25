# MANUEL.md

Kod ile otomatikleştirilemeyen, senin yapman gereken adımlar (bkz. `CLAUDE.md`
→ "Manuel Adım Kuralı"). Tamamlananı işaretle: `- [ ]` → `- [x]`.

Maddeler **neyi açtıklarına göre** sıralandı — yukarıdakiler daha çok işi
serbest bırakıyor.

---

## 1 · Şu An Beklemede Olan İşi Açanlar

Bu üçü olmadan ilerleyemediğim şeyler var.

### Sanity → tüm içerik yönetimi

- [ ] **Sanity** hesabı aç, yeni proje oluştur. Bana şunlar lazım:
      `NEXT_PUBLIC_SANITY_PROJECT_ID` ve `NEXT_PUBLIC_SANITY_DATASET`
      (genelde `production`).
- [ ] Sanity'de bir **API token** üret (read yetkili yeter) → `SANITY_API_TOKEN`.
- [ ] Kendi belirlediğin bir rastgele string'i `SANITY_REVALIDATE_SECRET`
      olarak sakla — içerik değişince siteyi tazeleyen webhook bunu kullanacak.

> **Açacağı iş:** şemaların yazılması, Sanity Studio, GROQ sorguları, webhook.
> Şu an içerik `src/content/sample-data.ts`'ten geliyor; o dosya silinecek.

### Resend → iletişim formu

- [ ] **Resend** hesabı aç, API key al → `RESEND_API_KEY`.
- [ ] Taleplerin düşeceği e-posta adresini belirle → `CONTACT_EMAIL_TO`.
- [ ] Gönderici adresi belirle → `CONTACT_EMAIL_FROM`. **Bu adres Resend'de
      doğrulanmış bir domainde olmalı** (örn. `info@mimarine.com`), gmail vb.
      olmaz.
- [ ] Domain'i Resend'de doğrula: Resend'in verdiği SPF/DKIM DNS kayıtlarını
      domain sağlayıcına ekle.

> **Durum:** form kodu yazıldı ve çalışıyor. Geçersiz key ile hata yolunu test
> ettim (401 → kullanıcıya düzgün mesaj). **Gerçek bir gönderim hiç
> denenmedi** — key gelince ilk iş onu test etmek.

### Mapbox → harita

- [ ] **Mapbox** hesabı aç, Access Token al → `NEXT_PUBLIC_MAPBOX_TOKEN`.
- [ ] **Her bayi/servis için enlem-boylam (lat/lng)** listesi ver.

> **Durum:** harita kodu **bilerek yazılmadı.** Token yok, ama asıl sorun
> koordinat yokluğu — koordinatsız harita boş bir dünya haritası olur ve
> uydurma koordinat girmedim. Şu an Bayi Ağı ve İletişim sayfalarında harita
> yerine bir deniz haritası görseli var. İkisi de gelince bağlarım.

---

## 2 · Marka Kimliği

Tasarım prototipi (`design/tasarim-prototipi.html`) kurgusal bir marka için
çizilmişti ve içinde **uydurma kurumsal bilgiler** vardı: kuruluş yılı (1974),
teslim edilen tekne sayısı, adres, telefon, `@serenyachts.com` e-postaları.
Bunlar MiMarine'in gerçeği olmadığı için taşınmadı; yerlerine köşeli parantezli
işaretler kondu.

- [ ] **Wordmark'ı onayla.** Şu an üstte `MIMARINE`, altında `YACHT`
      (`src/lib/brand.ts`). Farklı bir yazım/kilitlenme isteniyorsa söyle —
      tek dosya değişir.
- [ ] **Tescilli şirket unvanı** (footer telif satırında kullanılacak).
- [ ] **Kuruluş yılı / "since ..." satırı** kullanılacak mı? Kullanılacaksa yıl.
- [ ] **Gerçek adres, telefon, e-posta** (merkez + varsa üretim tesisi).
      Şu an `[ADDRESS LINE 1]`, `[PHONE]`, `[EMAIL]` yazıyor.
- [ ] **Ana sayfadaki üç rakam** ne olacak? Şu an `[00]` duruyor. Örn. kuruluş
      yılı, yıllık üretim adedi, geri dönüştürülmüş malzeme oranı.
- [ ] **Logo dosyası** (SVG tercihen) ve **marka renk kodları**. Şu an
      prototipin paleti geçici: mor aksan `#5B54A6`, kağıt `#FBFAF8`, mürekkep
      `#171717` — hepsi `src/app/globals.css` içindeki `@theme` bloğunda, tek
      yerden değişir.
- [ ] Varsayılan dil **TR** ayarlandı (`/` → `/tr`). EN olsun istersen
      `src/i18n/routing.ts` içinde tek satır.

---

## 3 · İçerik & Görsel

- [ ] **Gerçek yat fotoğrafları ve galeri görselleri.** Şu an geçici Unsplash
      görselleri var — sadece tasarımın nasıl durduğunu göstermek için;
      hiçbiri MiMarine'e ait değil.
- [ ] **TR ve EN gerçek metinler** (Ana Sayfa, Our World, yat açıklamaları,
      haber/etkinlik metinleri) — ya da mevcut taslakları onayla.
- [ ] **Bayi ve Servis Ağı gerçek listesi**: firma adı, adres, telefon,
      e-posta, koordinat, yetki tipi (bayi / servis / ikisi).
- [ ] `src/content/sample-data.ts` içindeki yer tutucu içeriği gözden geçir.
      Uydurulmayan alanlar `[KÖŞELİ PARANTEZ]` ya da `—` taşıyor; geri kalanı
      düzeni göstermek için yazılmış örnek metin.

---

## 4 · Deploy & Domain

- [ ] Proje için **Git deposu** başlat (`git init`) ve GitHub'da repo aç.
- [ ] **Vercel** hesabı aç, GitHub reposunu Vercel projesine bağla.
- [ ] **Domain'e karar ver** (yoksa `.vercel.app` ile geçici devam edilebilir).
- [ ] Domain alındıysa Vercel'e bağla (A / CNAME kaydı).
- [ ] **`NEXT_PUBLIC_SITE_URL`'i Vercel'e gir** — canonical URL'ler, hreflang,
      sitemap ve sosyal kart bunu kullanıyor. Girilmezse Vercel'in geçici
      deployment adresi kullanılır, ki canlıda yanlış olur.
- [ ] `.env.example`'daki tüm değişkenleri Vercel → Settings → Environment
      Variables'a gir. **Production ve Preview için ayrı ayrı kontrol et.**
- [ ] Vercel Analytics'i dashboard'dan aktif et (paket kuruldu, sayfaya
      bağlandı — sadece dashboard'da açman gerekiyor).

---

## 5 · Karar Gerektirenler

- [ ] Yat teknik özellik alanlarının kesin listesi. Şu an: tam boy, genişlik,
      su çekimi, tekne malzemesi, tahrik, misafir/mürettebat, menzil, teslim.
      Eklenecek/çıkarılacak var mı?
- [ ] **Gizlilik Politikası / KVKK** metni gerekiyor mu? İletişim formu, harita
      ve analytics nedeniyle büyük olasılıkla gerekiyor. Gerekiyorsa metni ver.
- [ ] News and Events'te ayrı bir **"haber"** (etkinlik olmayan duyuru) içerik
      tipi gerekiyor mu? Şu an tek "event" tipiyle ilerleniyor ve
      yaklaşan/geçmiş ayrımı tarihten otomatik hesaplanıyor.
- [ ] Footer'daki **sosyal medya linkleri** (Instagram / LinkedIn / YouTube)
      şu an tıklanmıyor — hesap adreslerini ver ya da kaldıralım.

---

## 6 · Yayına Alma Öncesi Son Kontrol

- [ ] Resend gerçek key ile ilk test gönderimi yapıldı mı?
- [ ] Sanity Studio kullanım eğitimi (client kendi içeriğini girebilsin diye).
- [ ] TR/EN tüm sayfaları son kez gözden geçir.
- [ ] `sample-data.ts` silindi mi, sitede hiç `[KÖŞELİ PARANTEZ]` kaldı mı?
