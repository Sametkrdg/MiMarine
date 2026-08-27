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

## 2 · İletişim Formu — bir engel var

**Alıcı adresi tamam ve panelden yönetiliyor.** `mimarineyacht@outlook.com`
artık **Sanity Studio → Site Ayarları → "İletişim formu alıcı adresi"**
alanından değiştirilebiliyor; kod ya da deploy gerekmiyor. (Sorduğun buydu.)

**Gönderici adresi olmuyor.** Resend, `from` adresinin **kendi doğrulattığın
bir domainde** olmasını şart koşuyor. `outlook.com` sana ait olmadığı için
doğrulanamaz — Resend bu adresle gönderimi reddediyor.

İki seçenek:

- [ ] **Kalıcı çözüm — domain al ve doğrula.** Resend → Domains → Add Domain
      (kök yerine alt domain öneriliyor, örn. `mail.mimarineyacht.com`),
      verdiği **SPF (TXT) + DKIM** kayıtlarını DNS'e ekle, Verify'a bas. Sonra
      `CONTACT_EMAIL_FROM=iletisim@mail.mimarineyacht.com`. Önerilir: aynı
      yerden bir DMARC kaydı da ekle.
- [ ] **Geçici çözüm — Resend'in test göndericisi.**
      `CONTACT_EMAIL_FROM=onboarding@resend.dev`. Uyarı: bu gönderici
      **yalnızca Resend hesabının kendi e-posta adresine** mail atabilir.
      Resend hesabını `mimarineyacht@outlook.com` ile açtıysan çalışır.

> **Şu anki davranış:** `RESEND_API_KEY` ve `CONTACT_EMAIL_FROM` birlikte tamam
> olmadıkça form alanları pasif ve üstünde "yakında aktif olacak" notu var.

---

## 3 · Bayi Ağı — şimdilik CTA

- [x] ~~Tersane konumu~~ — onaylandı, **iletişim sayfasındaki harita çalışıyor.**
- [x] ~~Uydurma bayi listesi~~ — silindi. Bayi sayfası artık boş kart yerine
      **büyük bir "Bölgenizde bizi temsil edin" çağrısı** gösteriyor; harita ve
      bölge sekmeleri gizli (bayi yokken ikisi de bir şey anlatmıyor).

**Mapbox iptal edildi.** Harita **Leaflet + OpenStreetMap** ile kuruldu —
hesap, API key ve kredi kartı gerektirmez. Test edildi.

- [ ] **Bayiler geldiğinde** Sanity Studio → "Bayi ve Servis Ağı"ndan ekle.
      Konum alanını doldurursan harita otomatik devreye girer ve CTA yerini
      bayi listesine bırakır.
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

## 5 · Marka Kimliği

- [x] ~~Tescilli unvan~~ — `MimarineYacht Yatçılık San. Tic. Ltd. Şti.`
- [x] ~~Kuruluş yılı~~ — 2021, ana sayfadaki rakam şeridinde.
- [x] ~~Adres, telefon, e-posta~~ — hepsi girildi.
- [x] ~~Şirket anlatımı~~ — verdiğin metin Ana Sayfa ve Dünyamız sayfalarına
      işlendi. Önceki uydurma iddialar (hibrit dizel-elektrik, geri
      dönüştürülmüş alüminyum, malzeme pasaportu, güneş paneli, "Ege kıyısı")
      **tamamen silindi** — chatbot da bunları okuyup gerçekmiş gibi söylüyordu.

Karar bekleyen üç küçük nokta:

- [ ] **Marka yazımı.** Daha önce "Mimarine Yacht" (boşluklu) demiştin, ama
      gönderdiğin şirket metni ve unvan "MimarineYacht" (bitişik) yazıyor.
      Sitede görünen ad "Mimarine Yacht" olarak kaldı; unvan ise birebir
      `MimarineYacht Yatçılık San. Tic. Ltd. Şti.` yazılıyor. Hangisi doğruysa
      söyle — `src/lib/brand.ts` içinde tek satır.
- [ ] **Zafer Dinç ismi sitede görünsün mü?** Şu an telefon ve e-posta var,
      isim yok. İstersen iletişim sayfasına ekleyebilirim.
- [ ] **Üçüncü rakam.** Ana sayfada iki rakam doldu (2021 · 3 uzmanlık alanı),
      üçüncüsü hâlâ `[00]`. Örn. teslim edilen tekne sayısı ya da yerlilik oranı.
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

## 7 · Gizlilik Politikası / KVKK

- [x] ~~Taslak uyarısı~~ — senin talimatınla kaldırıldı.
- [x] ~~Şirket bilgileri~~ — unvan, adres, telefon, e-posta metne işlendi.

Hukukçuya götürürken şu üç noktaya bakmalarını isteyin:

- [ ] **Yurt dışına veri aktarımı (KVKK m.9)** — Vercel, Resend, Sanity, Google
      (Gemini) ve OpenStreetMap sunucuları yurt dışında. Metinde belirtildi ama
      gerekli şartların sağlanıp sağlanmadığına hukukçu karar vermeli.
- [ ] **VERBIS kayıt yükümlülüğü** — doğuyorsa numara, metinde
      `[VERBIS NUMARASI]` yazan yere eklenecek.
- [ ] **Saklama süreleri** — metinde "makul süre" deniyor; şirketin saklama ve
      imha politikasıyla netleştirilmeli.

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

## 9 · Karar Bekleyen (acil değil)

- [ ] **CSP `script-src`** eklensin mi? Şu an güvenlik başlıkları var ama script
      politikası yok — Next'in satır içi script'leri ve Sanity Studio'nun
      `unsafe-eval` ihtiyacı yüzünden istek başına nonce üretmek gerekiyor.
      İstenirse ayrı bir iş olarak yapılabilir.

---

## 10 · Yayına Alma Öncesi Son Kontrol

- [ ] Sitede hiç `[KÖŞELİ PARANTEZ]` veya `[00]` kaldı mı?
- [ ] `src/content/sample-data.ts` silindi mi (Sanity'ye geçince silinecek)?
- [ ] Gizlilik Politikası'ndaki TASLAK uyarısı kaldırıldı mı?
- [ ] Yat detay sayfasındaki "teknik özellikler placeholder" notu kaldırıldı mı?
- [ ] Sanity Studio kullanım eğitimi (client kendi içeriğini girebilsin diye).
- [ ] TR/EN tüm sayfaları son kez gözden geçir.
