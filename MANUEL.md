# MANUEL.md

Kod ile otomatikleştirilemeyen, senin yapman gereken adımlar (bkz. `CLAUDE.md`
→ "Manuel Adım Kuralı"). Tamamlananı işaretle: `- [ ]` → `- [x]`.

---

## ✅ Tamamlandığını bildirdiklerin

- [x] Sanity: hesap, proje, `production` dataset, API token, CORS origins
- [x] Resend: hesap + API key
- [x] GitHub repo, Vercel import, env değişkenleri (oluşturulanlar), Analytics
- [x] Git commit'ler

---

## 1 · Beni Bekleten Tek Şey: Sanity Değerleri

Sanity'yi kurmuşsun ama **değerler bende yok** — Vercel'e girdin, benim yerel
kopyamda yok. Sanity'ye bağlanan kodu yazabilmem ve **test edebilmem** için
bunlara ihtiyacım var:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET` (muhtemelen `production`)
- [ ] `SANITY_API_TOKEN`
- [ ] `SANITY_REVALIDATE_SECRET`

En pratiği: proje kökünde `.env.local` dosyası oluşturup bu dördünü yaz.
`.gitignore`'da, repoya gitmez.

> Şemaları ve sorguları bu değerler olmadan da yazabilirim ama **hiçbirini
> doğrulayamam**. Doğrulanmamış kod teslim etmek istemiyorum, o yüzden
> soruyorum.

---

## 2 · İletişim Formunu Açacaklar

Resend key'i var, form kodu hazır — ama gönderim yapılamıyor.

- [ ] **Domain'e karar ver.** Resend'de kök domain yerine alt domain öneriliyor
      (örn. `mail.mimarineyacht.com`).
- [ ] Resend → Domains → Add Domain, sonra verdiği **SPF (TXT) ve DKIM**
      kayıtlarını DNS sağlayıcına ekle, **Verify**'a bas.
- [ ] (Önerilir) Aynı yerden bir **DMARC** kaydı ekle.
- [ ] **Gönderici adresi** (örn. `iletisim@mail.mimarineyacht.com`)
      → `CONTACT_EMAIL_FROM`
- [ ] **Taleplerin düşeceği adres** (örn. `info@mimarineyacht.com`)
      → `CONTACT_EMAIL_TO`

> **Şu anki davranış:** üç env değişkeni tamam olmadıkça form alanları pasif ve
> üstünde "İletişim formu yakında aktif olacak" notu var. Kırık bir gönder
> butonu göstermiyor. Değişkenler girilir girilmez kendiliğinden aktifleşir.

---

## 3 · Haritayı Açacak: Koordinatlar

**Mapbox iptal edildi.** Harita **Leaflet + OpenStreetMap** ile kuruldu —
hesap, API key ve kredi kartı gerektirmez. Kod hazır ve test edildi (gerçek
tile'lar, pin'ler, atıf çalışıyor).

Eksik olan tek şey veri:

- [ ] **Her bayi/servis için enlem-boylam.** Google Maps'te noktaya sağ tık →
      koordinatları kopyala. Firma adı / şehir eşleşmesiyle birlikte gönder.

> **Şu anki davranış:** koordinatı olan bayi yoksa harita hiç çizilmiyor, yerine
> yer tutucu görsel duruyor. İlk koordinat girildiği anda harita devreye girer.
>
> **Not:** OSM'in ücretsiz tile sunucusu atıf zorunlu kılar (kodda var) ve çok
> yüksek trafikte kendi tile sağlayıcına geçmen gerekebilir. Bugünkü hacim için
> sorun değil.

---

## 4 · Marka Kimliği — hâlâ placeholder

Bunlar gelene kadar mevcut placeholder'lara dokunmuyorum (senin talimatın).

- [ ] **Tescilli şirket unvanı** → footer telif satırı. Şu an "Mimarine Yacht".
- [ ] **Kuruluş yılı** kullanılacak mı? Kullanılacaksa yıl.
- [ ] **Gerçek adres, telefon, e-posta** — şu an `[ADRES SATIRI 1]`,
      `[TELEFON]`, `[E-POSTA]`.
- [ ] **Ana sayfadaki üç rakam** — şu an `[00]`.
- [ ] **Logo dosyası** (SVG) ve **marka renk kodları**. Şu an prototipin paleti:
      mor aksan `#5B54A6`, kağıt `#FBFAF8`, mürekkep `#171717` —
      `src/app/globals.css` içindeki `@theme` bloğunda, tek yerden değişir.
- [ ] **Wordmark'ın görsel onayı** — tek satır `MIMARINE YACHT` olarak uygulandı.
- [ ] **Sosyal medya adresleri** (Instagram / LinkedIn / YouTube). Gelene kadar
      footer'daki sosyal satır hiç render edilmiyor.

---

## 5 · İçerik & Görsel

- [ ] **Gerçek yat fotoğrafları ve galeri görselleri.** Şu an geçici Unsplash
      görselleri — sadece tasarımı göstermek için, hiçbiri Mimarine'e ait değil.
- [ ] **TR ve EN gerçek metinler** — ya da mevcut taslakları onayla.
- [ ] **Bayi ve Servis Ağı gerçek listesi**: firma adı, adres, telefon, e-posta,
      koordinat, yetki tipi.
- [ ] **Yat teknik özellikleri.** Şu an gerçekçi ama **uydurma** placeholder
      değerler var ve sayfada "Teknik özellikler placeholder — gerçek verilerle
      değiştirilecek" notu duruyor. Alan seti: tam boy, genişlik, su çekimi,
      tekne malzemesi, motor, yakıt kapasitesi, yolcu kapasitesi, menzil.
      Eklenecek/çıkarılacak alan varsa söyle.

---

## 6 · Gizlilik Politikası / KVKK — TASLAK, hukuki onay bekliyor

`/tr/privacy-policy` ve `/en/privacy-policy` adreslerinde yayında. Sayfanın
üstünde "hukuki incelemeden geçmemiştir" uyarısı var.

- [ ] **Bir hukuk danışmanına inceletin.** Özellikle şu iki nokta:
      yurt dışına veri aktarımı (Vercel, Resend, Sanity, OpenStreetMap sunucuları
      yurt dışında — KVKK m.9) ve **VERBIS kayıt yükümlülüğü**.
- [ ] Metindeki `[ŞİRKET UNVANI]`, `[ADRES]`, `[TELEFON]`, `[E-POSTA]`
      alanlarını doldur (madde 4'teki bilgilerle aynı).
- [ ] Saklama sürelerini şirketin saklama ve imha politikasıyla netleştir.
- [ ] Onaylandıktan sonra `src/content/legal.ts` üstündeki TASLAK uyarısını ve
      sayfadaki uyarı kutusunu kaldırmamı söyle.

---

## 7 · Deploy'da Kalan

- [ ] **`NEXT_PUBLIC_SITE_URL`'i canlı domainle doldur** (örn.
      `https://mimarineyacht.com`). Boş kalırsa canonical / sitemap / OG kartı
      geçici `vercel.app` adresini kullanır.
- [ ] Domain'i Vercel'e bağla (Settings → Domains, A/CNAME kaydı).
- [ ] Env değişkeni değiştirdikten sonra elle **Redeploy** et — env değişikliği
      otomatik build tetiklemez.
- [ ] Canlıda formu gerçek bir e-posta ile test et.

---

## 8 · Yayına Alma Öncesi Son Kontrol

- [ ] Sitede hiç `[KÖŞELİ PARANTEZ]` veya `[00]` kaldı mı?
- [ ] `src/content/sample-data.ts` silindi mi (Sanity'ye geçince silinecek)?
- [ ] Gizlilik Politikası'ndaki TASLAK uyarısı kaldırıldı mı?
- [ ] Yat detay sayfasındaki "teknik özellikler placeholder" notu kaldırıldı mı?
- [ ] Sanity Studio kullanım eğitimi (client kendi içeriğini girebilsin diye).
- [ ] TR/EN tüm sayfaları son kez gözden geçir.
