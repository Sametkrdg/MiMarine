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

## 1 · Sanity — içerik girmeye hazır

- [x] ~~CORS credentials~~ — düzeltildi, Studio artık login ekranını açıyor.
- [ ] **`/studio` adresine gir ve içerik eklemeye başla.** Sol menüde: Ana Sayfa,
      Dünyamız, Site Ayarları (singleton'lar) · Yatlar · Haberler/Etkinlikler ·
      Bayi ve Servis Ağı.
      - Çevrilebilir alanlarda TR ve EN kutuları yan yana.
      - Uzun metinlerde **boş satır paragraf ayırır**.
      - Bir tipe ilk doküman girildiği anda site o koleksiyonda örnek veriyi
        bırakıp Sanity'yi göstermeye başlar.
- [ ] **Webhook'u kaydet** (site canlıya çıkınca): sanity.io/manage → API →
      Webhooks → Create webhook
      - URL: `<site-adresi>/api/revalidate`
      - Trigger on: create · update · delete
      - Secret: `SANITY_REVALIDATE_SECRET` ile **aynı** değer
      - HTTP method: POST
- [ ] İçerik girecek kişiye Sanity'de rol ata / davet gönder.

> **Not:** Dataset şu an boş. Site, bir tipte hiç doküman yoksa otomatik olarak
> `sample-data.ts`'e düşüyor. İçerik girdikçe koleksiyon koleksiyon Sanity'ye
> geçer.

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

## 3 · Bayi Haritası: Koordinatlar

- [x] ~~Tersane konumu~~ — `40.968312, 40.305812` onaylandı ve **iletişim
      sayfasındaki harita çalışıyor.**

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

## 4 · Site Asistanı (chatbot) — çalışıyor

Gemini ile kuruldu ve test edildi. Sağ altta "Asistan" balonu.

- [x] ~~API key~~ — çalışıyor. **Not:** `.env.local`'de `Gemini_API_KEY` olarak
      yazılmıştı; Node'da env adları büyük/küçük harf duyarlı olduğu için
      `GEMINI_API_KEY` olarak düzelttim. **Vercel'e de bu adla gir.**
- [ ] **Vercel'e ekle:** `GEMINI_API_KEY` (zorunlu) ve isterseniz
      `GEMINI_MODEL` (opsiyonel, varsayılan `gemini-3.5-flash-lite`).
- [ ] KVKK metnine chatbot bölümü eklendi — **hukuki incelemede bu bölüme de
      baktırın.** Google'ın ücretsiz katman koşulları, gönderilen içeriğin
      hizmet geliştirmede kullanılabileceğini öngörebiliyor; metinde bu
      belirtildi ve sohbet kutusunun altına "kişisel bilgi paylaşmayın" uyarısı
      kondu.
- [ ] Trafik artarsa ücretsiz kota yetmeyebilir; o noktada Google Cloud'da
      faturalandırma açmak ya da modeli düşürmek gerekir.

---

## 5 · Marka Kimliği — hâlâ placeholder

Bunlar gelene kadar mevcut placeholder'lara dokunmuyorum (senin talimatın).

- [ ] **Tescilli şirket unvanı** → footer telif satırı. Şu an "Mimarine Yacht".
- [ ] **Kuruluş yılı** kullanılacak mı? Kullanılacaksa yıl.
- [ ] **Tersane nasıl anlatılacak?** Adres Karadeniz'de (Of/Trabzon) ama örnek
      metinler "Ege kıyısında" diyordu — meta açıklamasını bölge belirtmeyecek
      şekilde düzelttim. Yat açıklamalarındaki "Ege" ifadeleri seyir bölgesini
      anlatıyor, onlara dokunmadım; gerçek metinler gelince netleşecek.
- [x] ~~Gerçek adres~~ — `Kıyıcık, Trabzon Rize Yolu, 61830 Of / Trabzon`
      girildi (footer, iletişim sayfası, KVKK metni).
- [ ] **Telefon ve e-posta** — hâlâ `[TELEFON]` / `[E-POSTA]`.
- [ ] **Ana sayfadaki üç rakam** — şu an `[00]`.
- [ ] **Logo dosyası** (SVG) ve **marka renk kodları**. Şu an prototipin paleti:
      mor aksan `#5B54A6`, kağıt `#FBFAF8`, mürekkep `#171717` —
      `src/app/globals.css` içindeki `@theme` bloğunda, tek yerden değişir.
- [ ] **Wordmark'ın görsel onayı** — tek satır `MIMARINE YACHT` olarak uygulandı.
- [ ] **Sosyal medya adresleri** (Instagram / LinkedIn / YouTube). Gelene kadar
      footer'daki sosyal satır hiç render edilmiyor.

---

## 6 · İçerik & Görsel

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

## 7 · Gizlilik Politikası / KVKK — TASLAK, hukuki onay bekliyor

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

## 8 · Deploy'da Kalan

- [ ] **`NEXT_PUBLIC_SITE_URL`'i canlı domainle doldur** (örn.
      `https://mimarineyacht.com`). Boş kalırsa canonical / sitemap / OG kartı
      geçici `vercel.app` adresini kullanır.
- [ ] Domain'i Vercel'e bağla (Settings → Domains, A/CNAME kaydı).
- [ ] Env değişkeni değiştirdikten sonra elle **Redeploy** et — env değişikliği
      otomatik build tetiklemez.
- [ ] Canlıda formu gerçek bir e-posta ile test et.

---

## 9 · Yayına Alma Öncesi Son Kontrol

- [ ] Sitede hiç `[KÖŞELİ PARANTEZ]` veya `[00]` kaldı mı?
- [ ] `src/content/sample-data.ts` silindi mi (Sanity'ye geçince silinecek)?
- [ ] Gizlilik Politikası'ndaki TASLAK uyarısı kaldırıldı mı?
- [ ] Yat detay sayfasındaki "teknik özellikler placeholder" notu kaldırıldı mı?
- [ ] Sanity Studio kullanım eğitimi (client kendi içeriğini girebilsin diye).
- [ ] TR/EN tüm sayfaları son kez gözden geçir.
