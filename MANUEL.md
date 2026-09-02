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
- [ ] İçerik girecek kişiye Sanity'de rol ata / davet gönder ve
      `SANITY_KILAVUZU.md` dosyasını ilet.

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

## 5 · İçerik — tamamlandı

İki PDF'teki metinler siteye işlendi: kuruluş hikayesi, çelik gövde
mühendisliği, terzi usulü konumlandırma, %20-50 maliyet avantajı, gerçek
projeler ve Ön Sipariş sayfası.

- [x] ~~Ön Sipariş sayfası~~ — `/tr/pre-order` · `/en/pre-order`. Brief'teki
      başlık, motto, davet metni ve form alanlarının tamamı kuruldu.
- [x] ~~Palet~~ — brief "denizci laciverti ve antrasit" istiyordu; sonrasında
      gönderdiğin prototip dosyasıyla site **koyu laciverte** taşındı:
      zemin `#12212F`, metin `#F2EFE8`, aksan `#7FA9C4`. Ayrıntı aşağıda.
- [x] ~~Filo~~ — uydurma 10 tekne silindi, gerçek altı proje girildi.
- [x] ~~Proje durumları~~ — client'ın isteğiyle **bir tekne artık birden fazla
      sekmede görünebiliyor**. Son durum:
      **Zenday** → yalnızca Teslim Edilen ·
      **KTÜ 61 FEET** → Teslim Edilen + Teslime Hazır + Üretimde ·
      **Cihangir S · PTTRA 42.5m · MY 14M · KTÜ 35 FEET** → Teslime Hazır +
      Üretimde. Böylece "hazır bir teknemiz var, ama size yenisini de
      yaparız" mesajı iki sekmede birden veriliyor.
- [x] ~~"Teslime Hazır" sekmesi boş~~ — artık beş tekne orada.
- [x] ~~Teknik özellikler~~ — altısının da tam listesi sunum dosyalarından
      girildi (yıl, gövde, boy, genişlik, derinlik/su çekimi, motor, hız,
      kamara, kapasite; PTTRA'da ayrıca deplasman, RINA klaslaması, menzil,
      yakıt/su, jeneratör). `[BELİRTİLECEK]` işareti kalmadı, sayfadaki
      "placeholder" uyarısı kaldırıldı.
- [x] ~~Proje görselleri~~ — filodaki Unsplash gitti. 38 görsel `public/media`
      altında; ayrıntı §6'da.
- [x] ~~Maliyet avantajı ifadesi~~ — **%20-50** olarak onaylandı (client teyit
      etti: tipik aralık %20-30, bazı projelerde %50'ye çıkıyor).
- [x] ~~İki tekne eklendi~~ — **KTÜ 61 FEET** (`/fleet/ktu-61-feet`) ve
      **MY 14M** (`/fleet/my-14m`). Metinler ve teknik veriler sunum
      dosyalarından; görseller katalog ve sunumlardan. Ana sayfadaki rakam
      4 → **6** oldu. (Not: `KTÜ 35 FEET SUNUM .pdf` dosyasının içeriği aslında
      KTÜ 61 FEET — dosya adı yanıltıcı, veriyi doğru dosyadan aldım.)

- [x] ~~Kişiselleştirme anlatımı~~ — "iç mimari tamamen size göre şekillenir"
      mesajı iki yere birden eklendi: **ana sayfada** üç maddelik bir bölüm
      (malzeme ve renk · aydınlatma ve donanım · kullanım senaryosu) ve **her
      yat sayfasında** teknik özelliklerin altında tek cümlelik bir not. İkisi
      de Studio'dan **Site Ayarları → Kişiselleştirme bölümü**'nden tek yerden
      yazılıyor.
- [x] ~~Üçüncü taraflara atıf~~ — sunum dosyalarında geçen dış tasarım ofisi ve
      üniversite adları **sitede hiçbir yerde geçmiyor**; istenmediği için
      eklenmedi. Katalogdaki öğrenci isim listesi ve fotoğrafları da
      kullanılmadı.

---

## 6 · Görseller — girildi

`mimarine/` klasöründeki fotoğraflar siteye işlendi. Orijinaller olduğu yerde
duruyor; siteye giren kopyalar `scripts/build-media.mjs` ile üretiliyor
(`node scripts/build-media.mjs`) ve `public/media/` altına yazılıyor. Script üç
iş yapıyor: web boyutuna küçültme, ilerlemeli JPEG'e çevirme (3 MB'lık PNG
render'lar 150 KB'a iniyor) ve **EXIF temizleme** — telefonla çekilmiş
kareler GPS koordinatı taşıyordu, o veri artık depoya girmiyor. Toplam
19 MB → 5 MB.

Nerede ne kullanıldı:

| Yer | Görsel |
|---|---|
| Ana sayfa hero | Zenday, akşamüstü Boğaz'da |
| Ana sayfa kartları | PTTRA gövdesi · Zenday koridoru · Zenday seyirde |
| Dünyamız hero | PTTRA 42.5m'in tam boy gövdesi |
| Dünyamız sütunları | KTÜ 35 FEET kıç güvertesi · Cihangir S tersanede · çelik gövde inşası |
| Zenday | 1 kapak + 6 galeri (dış, salon, koridor, gece seyri) |
| Cihangir S | 1 kapak + 4 galeri (2 render, 3 tersane fotoğrafı) |
| KTÜ 35 FEET | 1 kapak + 6 galeri — **hepsi tasarım görseli** |
| KTÜ 61 FEET | 1 kapak + 3 galeri (3 tasarım görseli + 1 tersane fotoğrafı) |
| MY 14M | 1 kapak + 4 galeri — **hepsi tasarım görseli** |
| PTTRA 42.5m | 1 kapak + 8 galeri (5 gerçek inşa fotoğrafı + 4 tasarım görseli) |
| Favicon | Logodaki taç + dalga işareti |

Yapay zekâ ile üretilmiş görsellerin alt metinlerinde **"tasarım görseli /
design render"** yazıyor. Ziyaretçi bitmiş teknenin fotoğrafı sanmasın diye;
arama motorları ve ekran okuyucular da bunu okur.

`mimarine/` klasörü **`.gitignore`'a eklendi** — orijinaller (~50 MB) depoya
girmiyor. Siteye giren küçültülmüş kopyalar `public/media` altında (8 MB) ve
onlar depoda. Orijinalleri ayrı bir yerde saklamayı unutma: `mimarine/`
silinirse `scripts/build-media.mjs` çalışmaz.

**Doğrulaman gereken bir eşleştirme:**

- [ ] **Süperyat görselleri gerçekten PTTRA mı?** `Generated Image July 27`
      setindeki büyük beyaz süperyat ve iç mekân görsellerinde tekne adı
      yazmıyor, bu yüzden hangi projeye ait olduğunu görselden okuyamadım.
      PTTRA'ya bağladım çünkü filodaki tek süperyat o ve setteki
      "deniz manzaralı spor salonu" görseli, PTTRA sunumunda tarif edilen
      spor salonuyla birebir örtüşüyor. Yanlışsa dört görseli çıkarırım.
      Ayrıca render'daki baş bodoslama düz; gerçek çelik gövde fotoğrafında
      baş tonozlu (bulbous bow) — bu ikisi farklı olabilir.

**Kullanmadıklarım ve nedeni:**

- [ ] **`cihangir 5.jpeg`** — dosya adıyla ilgili değil: **görselin kendisinde**
      teknenin bordasında `CIHANDIR S` yazıyor, `CİHANGİR S` olması gerekirken.
      Görsel üretilirken yazı bozulmuş. En iyi yan görünüm oydu; düzeltilmiş
      hâlini üretebilirsen hemen eklerim. Aynı setteki `cihangir 6.jpeg`de
      yazım doğru, onu kapak yaptım.
- **`KATALOG 1 .pdf`'teki fotoğraflar ve isim listesi.** İçinde yüzü belli
      öğrencilerin çalışırken çekilmiş fotoğrafları ve 30 kişilik bir isim
      listesi var. Kişilerin açık rızası olmadan yayımlanmamalı (sitede KVKK
      sayfası da var). Üniversite logosunu da kullanmadım — üçüncü taraf
      markası.
- **`zenday liman.jpeg`** — kare güzel ama açı yatık, kadrajda site düzenine
      oturmuyor. İstersen düzeltip eklerim.
- **3 adet `Generated Image` kolajı** (birden fazla görselin beyaz çerçeveyle
      yan yana konduğu kareler) — tek bir görsel olarak kullanılamıyor.
- **Sunum PDF'leri ve katalog sayfası** birer doküman. İçlerindeki veriyi ve
      render'ları çıkarıp kullandım. İstersen katalogları yat sayfalarına
      "indirilebilir PDF" olarak da koyabiliriz; şu an öyle bir alan yok.

---

## 7 · Tasarım Aktarımı — kararını bekleyen iki nokta

Gönderdiğin `MimarineYacht (standalone).html` prototipindeki tasarım sisteminin
tamamı siteye uygulandı (renk, tipografi, boşluk, bileşen görünümü). Metinler,
veriler, görseller ve route yapısı ellenmedi. Prototip dosyası, istediğin gibi
aktarım bittikten sonra silindi.

İki yerde prototipteki değeri **birebir uygulayamadım**; ikisi de senin kararın:

- [ ] **Bayi haritasındaki bilgi etiketi.** Prototipte etiket zemini açık
      (`rgba(242,239,232,.92)`), metni `#A7B3BC`. Bu ikili ~2:1 kontrast veriyor
      ve WCAG AA'yı geçmiyor — harita üzerinde okunmuyordu. Etiketi açık
      bıraktım ama metni koyu laciverte (`#0C1620`) çevirdim. Tasarımdaki açık
      etiket duruyor, yalnızca yazı okunur hâlde. İtiraz edersen geri alırım.
- [ ] **Menü çubuğunun masaüstüne geçtiği genişlik: 1280px → 1400px.**
      İngilizce menüde "DEALER AND SERVICES NETWORK" + "NEWS AND EVENTS" +
      wordmark yan yana ~1266px yer kaplıyor (gerçek Jost metrikleriyle
      ölçüldü). 1280px'lik bir ekranda kenar boşlukları ve kaydırma çubuğu
      düşünce 1169px kalıyor — yani çubuk **zaten taşıyordu**, bu aktarımdan
      önce de. Üç seçenek vardı: yazıyı prototiptekinden küçültmek, bir menü
      maddesini atmak, ya da bu aralıkta hamburger menüye geçmek. İlk ikisi
      senin "tasarımı ve içeriği değiştirme" talimatına aykırıydı, üçüncüsünü
      seçtim: 1400px altında mobil çekmece açılıyor. 1280 ve 1366'lık dizüstü
      ekranlar da çekmeceyi görecek. Bunun yerine yazıyı biraz küçültmemi
      tercih edersen tek satır.

Bilgi olsun diye: paletin tamamını kontrast açısından ölçtüm, tek zayıf nokta
kart zemini üstündeki küçük gri etiketler (`#7C8B98` / `#1A2C3C` = 4.09; AA
sınırı 4.5). İkisi de prototipten gelen değerler olduğu için dokunmadım —
istersen etiket grisini bir tık açarım, tek token.

---

## 8 · Marka Kimliği

- [x] ~~Tescilli unvan~~ — `MimarineYacht Yatçılık San. Tic. Ltd. Şti.`
- [x] ~~Kuruluş yılı~~ — 2021, ana sayfadaki rakam şeridinde.
- [x] ~~Adres, telefon, e-posta~~ — hepsi girildi.
- [x] ~~Şirket anlatımı~~ — verdiğin metin Ana Sayfa ve Dünyamız sayfalarına
      işlendi. Önceki uydurma iddialar (hibrit dizel-elektrik, geri
      dönüştürülmüş alüminyum, malzeme pasaportu, güneş paneli, "Ege kıyısı")
      **tamamen silindi** — chatbot da bunları okuyup gerçekmiş gibi söylüyordu.

Karar bekleyen üç küçük nokta:

- [x] ~~Marka yazımı~~ — **MimarineYacht** (bitişik) olarak sabitlendi.
      Wordmark `MIMARINEYACHT`, tam ad `MimarineYacht`, unvan
      `MimarineYacht Yatçılık San. Tic. Ltd. Şti.`
- [ ] **Zafer Dinç ismi sitede görünsün mü?** Şu an telefon ve e-posta var,
      isim yok. İstersen iletişim sayfasına ekleyebilirim.
- [ ] **Üçüncü rakam.** Ana sayfada iki rakam doldu (2021 · 3 uzmanlık alanı),
      üçüncüsü hâlâ `[00]`. Örn. teslim edilen tekne sayısı ya da yerlilik oranı.
- [x] ~~Logo — favicon olarak kullanıldı.~~ Katalogdaki taç + dalga işaretini
      kesip sekme ikonuna ve iOS ana ekran ikonuna koydum
      (`src/app/icon.png`, `src/app/apple-icon.png`). Küçük boyutta net duruyor.
- [ ] **Logonun vektör (SVG) hâli lazım.** Katalogdaki logo bir JPEG'in içinde
      ve işaretin kendisi **yalnızca ~74 x 66 piksel**. Favicon için yetiyor
      ama menüdeki lockup ya da sosyal medya kartı için büyütülürse bulanık
      çıkar — o yüzden oralarda hâlâ yazı tipiyle dizilmiş `MIMARINEYACHT`
      kullanılıyor (tasarım da bunu istiyor zaten). Tasarımcıda **SVG / AI /
      EPS** dosyası varsa gönder, menüye ve sosyal karta koyayım.
      Renkler için: site koyu paletle çalışıyor — zemin `#12212F`, metin
      `#F2EFE8`, aksan `#7FA9C4`, hepsi `src/app/globals.css` içindeki `@theme`
      bloğunda tek yerden değişir.
- [ ] **Wordmark'ın görsel onayı** — tek satır `MIMARINEYACHT` olarak uygulandı.
- [ ] **Alan adı: `mimarineyacht.com`.** Katalogda zaten
      `www.mimarineyacht.com` yazıyor, sen de bunu önerdiğini söyledin.
      Alındığında yapılacak tek şey: Vercel → Domains'e ekle, DNS'i yönlendir,
      sonra `NEXT_PUBLIC_SITE_URL=https://mimarineyacht.com` ortam değişkenini
      gir (bkz. §11). Bu değer canonical URL'leri, hreflang'i, sitemap'i ve
      sosyal kart adreslerini besliyor — girilmezse Vercel'in geçici adresi
      kullanılır.
- [ ] **Sosyal medya adresleri** (Instagram / LinkedIn / YouTube). Gelene kadar
      footer'daki sosyal satır hiç render edilmiyor.

---

## 9 · İçerik & Görsel

- [x] ~~Gerçek yat fotoğrafları~~ — girildi, bkz. §6.
- [x] ~~Yat teknik özellikleri~~ — girildi, bkz. §5.
- [ ] **Haber / etkinlik içerikleri hâlâ uydurma — client'a soruluyor.**
      Sitedeki altı haber ve etkinliğin hiçbiri gerçek değil; tarihleri derleme
      anına göre hesaplanıyor, kapak görselleri Unsplash. **Sitede kalan tek
      uydurma içerik bu.** Gerçek liste gelirse girerim; gelmezse yayına
      çıkmadan önce bölümü kaldırmamız gerekir (navbar'dan da düşer, ~15 dk).
- [ ] **TR ve EN gerçek metinler** — ya da mevcut taslakları onayla.
- [ ] **Bayi ve Servis Ağı gerçek listesi**: firma adı, adres, telefon, e-posta,
      koordinat, yetki tipi.

---

## 10 · Gizlilik Politikası / KVKK

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

## 11 · Yayına Alma — sırayla yapılacaklar

Aşağıdakilerin hepsi **kod dışında**, panellerden yapılır. Sırayı bozmayın:
her adım bir öncekine bağlı.

### A · Alan adı

- [ ] **1. `mimarineyacht.com`'u satın al.** Kayıt sırasında **domain
      gizliliği / WHOIS privacy** açık olsun.
- [ ] **2. Vercel'de projeyi oluştur.** vercel.com → Add New → Project → GitHub
      deposunu seç. Framework "Next.js" olarak otomatik gelir, ayar
      değiştirmeyin.
- [ ] **3. Domain'i bağla.** Vercel → proje → Settings → Domains →
      `mimarineyacht.com` ve `www.mimarineyacht.com` ekle. Vercel size iki
      DNS kaydı verir (kök için `A`, www için `CNAME`); bunları alan adını
      aldığınız firmanın DNS panelinden girin. Yayılması 10 dk – 24 saat.

### B · Ortam değişkenleri (Vercel → Settings → Environment Variables)

Her birini **Production + Preview + Development** üçüne birden ekleyin.

- [ ] **4.** `NEXT_PUBLIC_SITE_URL` = `https://mimarineyacht.com`
      Boş kalırsa canonical adresler, hreflang, sitemap ve sosyal medya kartı
      geçici `vercel.app` adresini gösterir — Google'a yanlış adres verir.
- [ ] **5.** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
      (`production`), `SANITY_API_TOKEN`, `SANITY_REVALIDATE_SECRET`
- [ ] **6.** `RESEND_API_KEY`, `CONTACT_EMAIL_FROM` (bkz. §2),
      `CONTACT_EMAIL_TO`
- [ ] **7.** `GEMINI_API_KEY` — yoksa sohbet balonu hiç görünmez, site
      çalışmaya devam eder.
- [ ] **8. Değişken ekledikten sonra elle Redeploy edin.** Ortam değişkeni
      değiştirmek tek başına yeni build tetiklemez; eski build eski değerlerle
      çalışmaya devam eder.

### C · Sanity

- [ ] **9. API token'ını yenile.** Şu an `.env.local`'de duran token bu
      konuşmalar sırasında ortaya çıktı — sanity.io/manage → API → Tokens →
      eskisini sil, yeni bir **Viewer** token üret, Vercel'e onu gir.
- [ ] **10. CORS kaydı ekle.** sanity.io/manage → API → CORS origins →
      `https://mimarineyacht.com` ekle, **"Allow credentials" işaretli olsun**.
      Yoksa `/studio` adresinden giriş yapılamaz.
- [ ] **11. Webhook kur** (içerik değişince site kendini yenilesin).
      sanity.io/manage → API → Webhooks → Create:
      URL `https://mimarineyacht.com/api/revalidate`,
      Dataset `production`, Trigger on: create + update + delete,
      Secret: `SANITY_REVALIDATE_SECRET` ile **aynı değer**.
      Kurulmazsa içerik ancak ~1 saatte bir güncellenir.
- [ ] **12. İçerik girecek kişiyi davet et.** sanity.io/manage → Members →
      Invite → rol **Editor**. `SANITY_KILAVUZU.md` dosyasını ona verin.

### D · E-posta

- [ ] **13. Resend'de domain doğrula** — §2'deki adımlar. Bu bitmeden
      **iletişim ve ön sipariş formları kapalı kalır**.

### E · Yayına aldıktan sonra

- [ ] **14. Formu gerçek bir e-posta ile test et** (hem `/contact` hem
      `/pre-order`).
- [ ] **15. Google Search Console**'a siteyi ekle, `sitemap.xml`'i gönder.
- [ ] **16. Vercel Analytics**'i aç (proje → Analytics → Enable). Ücretsiz
      planda çalışır.

---

## 12 · Karar Bekleyen (acil değil)

- [x] ~~CSP~~ — tam politika kuruldu (site + `/studio` için ayrı ayrı),
      tarayıcıda sıfır ihlalle doğrulandı. Nonce'a **geçilmedi**: nonce tüm
      statik sayfaları dinamik render'a zorlardı. Ayrıntı README'de.

---

## 13 · Yayına Alma Öncesi Son Kontrol

**Yayına çıkmadan mutlaka:**

- [ ] **Haber ve etkinlik bölümü.** Sitedeki altı kayıt uydurma (bkz. §9).
      Gerçek içerik gelmeyecekse bu bölüm yayından önce kaldırılmalı.
- [ ] **Gizlilik Politikası hukukçu onayı** (bkz. §10) ve varsa VERBIS numarası.
- [ ] **Süperyat görselleri PTTRA'ya mı ait?** (bkz. §6) — müşteri bakıp
      karar versin, yanlışsa dört görsel çıkar.
- [ ] TR ve EN tüm sayfaları son kez gözden geçir.

**Kontrol edildi:**

- [x] ~~Sitede `[KÖŞELİ PARANTEZ]` / `[00]` yer tutucusu~~ — kalmadı.
- [x] ~~Gizlilik Politikası'ndaki TASLAK uyarısı~~ — kaldırıldı.
- [x] ~~"Teknik özellikler placeholder" notu~~ — kaldırıldı, veriler gerçek.
- [x] ~~Sanity Studio kullanım kılavuzu~~ — `SANITY_KILAVUZU.md`. İçerik
      girecek kişiye bu dosyayı verin.

**Sanity'ye geçtikten sonra:**

- [ ] `src/content/sample-data.ts` silinebilir. Ama dikkat: bu dosya **tip
      tip** devreden çıkar. Yatları Sanity'ye girdiğinizde yatlar oradan
      gelir, haberler hâlâ bu dosyadan gelmeye devam eder. Hepsi girilmeden
      silmeyin.
