# Sanity Studio Kullanım Kılavuzu

Bu doküman, siteye içerik girecek kişi içindir. Kod bilgisi gerekmez.

Studio, sitenin kendi adresinde çalışır: **`<site-adresi>/studio`**
Yerelde: `http://localhost:3000/studio`

---

## Önce bilinmesi gerekenler

**Site, içerik girilene kadar örnek veri gösterir.** Bir içerik tipinde
(örneğin "Yatlar") hiç kayıt yoksa site geçici örnek verileri gösterir. O tipe
**ilk kaydı girdiğiniz anda** site tamamen Sanity'ye geçer ve örnek veriler
kaybolur. Bu tip tip çalışır: yatları girseniz bile haberler hâlâ örnek
veriden gelir.

> Yani yarım bırakmayın: bir tipe başladıysanız o tipteki tüm kayıtları girin.

**Her metin alanı iki dillidir.** Türkçe ve İngilizce kutuları yan yanadır.
İkisini de doldurun — boş bırakılan dil sitede boş görünür.

**Uzun metinlerde boş satır paragraf ayırır.** İki paragraf istiyorsanız
aralarına boş bir satır bırakın:

```
Birinci paragraf buraya.

İkinci paragraf buraya.
```

---

## Giriş

1. `<site-adresi>/studio` adresine gidin.
2. Google, GitHub veya e-posta ile giriş yapın (Sanity'de davet edilmiş
   hesabınızla).
3. Sol tarafta içerik listesi açılır.

> **"Add CORS origin" uyarısı görürseniz:** o adres Sanity'de kayıtlı değildir.
> Ekrandaki butona basmanız yeterli — ya da sanity.io/manage → API →
> CORS origins bölümünden ekleyin. **"Allow credentials" işaretli olmalı**,
> yoksa giriş yapılamaz.

---

## Sol menüdeki bölümler

| Bölüm | Ne işe yarar | Kaç kayıt |
|---|---|---|
| **Ana Sayfa** | Ana sayfanın hero'su, manifestosu, rakamları, kartları | Tek |
| **Dünyamız** | Dünyamız sayfasının tüm içeriği | Tek |
| **Site Ayarları** | Ofis bilgileri, form alıcı adresi, harita görselleri | Tek |
| **Yatlar** | Filo sayfalarındaki tekneler | Sınırsız |
| **Haberler / Etkinlikler** | Haberler ve Etkinlikler sayfası | Sınırsız |
| **Bayi ve Servis Ağı** | Bayi haritası ve listesi | Sınırsız |

İlk üçü **tekil** kayıttır — yenisini oluşturamazsınız, mevcut olanı
düzenlersiniz. Bu bilinçlidir: yanlışlıkla ikinci bir "Ana Sayfa" oluşup
sitenin hangisini göstereceğinin belirsizleşmesini engeller.

---

## Kaydetme ve yayınlama

Sanity'de iki durum vardır:

- **Taslak (Draft)** — yazdıklarınız otomatik kaydedilir ama **sitede
  görünmez**. Sağ üstte "Unpublished changes" yazar.
- **Yayında (Published)** — sağ alttaki yeşil **Publish** butonuna bastığınızda
  içerik siteye çıkar.

> **Publish'e basmadıysanız site eski hâlini gösterir.** En sık karşılaşılan
> karışıklık budur.

Yayınladıktan sonra sitenin güncellenmesi birkaç saniye sürebilir.

---

## Yat eklemek

**Yatlar → sağ üstteki + (Create new)**

| Alan | Açıklama |
|---|---|
| **Model / tekne adı** | Örn. `PTTRA 42.5m`. Sitede başlık olarak görünür. |
| **URL adresi (slug)** | Yanındaki **Generate** butonuna basın, addan otomatik üretir. Örn. `pttra-42-5m`. Yayınlandıktan sonra değiştirmeyin — eski bağlantılar kırılır. |
| **Durum** | Teslim edildi / Teslime hazır / Üretimde. Teknenin hangi filo sekmesinde görüneceğini belirler. |
| **Sıra** | Kendi sekmesi içinde küçükten büyüğe sıralanır. 1, 2, 3… |
| **Ana sayfada öne çıkar** | **Yalnızca bir yatta** açık olmalı. Ana sayfadaki büyük görsel bu tekne olur. |
| **Alt başlık** | Kartın altındaki küçük satır. Örn. `Motoryat · 22 m` |
| **Tam boy** | Kartın sağındaki ölçü. Türkçede virgüllü, İngilizcede noktalı yazın: `42,5 m` / `42.5 m` |
| **Giriş cümlesi** | Detay sayfasının büyük açılış cümlesi. Tek paragraf. |
| **Açıklama** | Detay sayfasının gövde metni. Boş satırla paragraf ayırın. |
| **Teknik özellikler** | Aşağıya bakın. |
| **Kapak görseli** | Kartlarda ve detay sayfasının üstünde. |
| **Galeri** | Detay sayfasındaki görsel ızgarası. İlk görsel geniş gösterilir. |

### Teknik özellikler

**Add item** ile satır ekleyin. Her satırda iki alan var:

- **Alan adı** — `Tam boy` / `Length overall`
- **Değer** — `42,5 m` / `42.5 m`

Ondalık ayracı dile göre değişir: Türkçe virgül, İngilizce nokta. Bilmediğiniz
bir değeri boş bırakmayın, `—` yazın.

Tavsiye edilen sıra: Tam boy · Genişlik · Su çekimi · Tekne malzemesi · Motor ·
Yakıt kapasitesi · Yolcu kapasitesi · Menzil.

---

## Haber / Etkinlik eklemek

**Haberler / Etkinlikler → +**

| Alan | Açıklama |
|---|---|
| **Başlık** | TR / EN |
| **URL adresi** | Generate'e basın |
| **Tarih** | **Önemli:** Yaklaşan / Geçmiş ayrımı bu tarihten **otomatik** hesaplanır. Elle seçmezsiniz. Bugünden ileri bir tarih → Yaklaşan, geri → Geçmiş. |
| **Bitiş tarihi** | Birden çok gün süren etkinlikler için (fuar vb.). Tek günlükse boş bırakın. |
| **Yer** | Örn. `Cannes, Fransa` |
| **Özet** | Listede görünen kısa metin. Tek paragraf. |
| **Metin** | Detay sayfasının gövdesi. Boş satırla paragraf ayırın. |
| **Kapak görseli** | Liste ve detay sayfasında. |

---

## Bayi / Servis eklemek

**Bayi ve Servis Ağı → +**

| Alan | Açıklama |
|---|---|
| **Şehir**, **Firma adı** | Kartın başlığı ve alt satırı |
| **Bölge** | Akdeniz / Kuzey Avrupa / Amerika / Asya-Pasifik. Sayfadaki sekmeleri belirler. |
| **Yetki** | Bayi / Servis / Bayi · Servis |
| **Adres, Telefon, E-posta** | Kartta görünür |
| **Hizmetler** | Kartın altındaki satır. Örn. `Satış · Servis · Garanti` |
| **Konum** | **Harita için gereklidir.** Boş bırakırsanız bu nokta haritada görünmez. |

### Konum nasıl bulunur

1. Google Maps'te noktayı bulun.
2. Noktaya **sağ tıklayın**.
3. En üstteki koordinat çiftine tıklayın (kopyalanır), örn. `40.968312, 40.305812`.
4. Sanity'deki **Konum** alanına ilkini `Latitude`, ikincisini `Longitude`
   kutusuna yazın.

> **Hiç bayi yokken** sayfa boş liste yerine bir "bayilik başvurusu" çağrısı
> gösterir. İlk bayiyi girdiğinizde bu çağrı yerini listeye bırakır; ilk
> koordinatı girdiğinizde harita da devreye girer.

---

## Site Ayarları

| Alan | Açıklama |
|---|---|
| **Ofisler** | İletişim sayfasında ve footer'da görünür. Konum girerseniz iletişim sayfasında harita çıkar. |
| **İletişim formu alıcı adresi** | Formlardan gelen talepler bu adrese düşer. **Buradan değiştirebilirsiniz, kod değişikliği gerekmez.** |
| **Harita yer tutucu görselleri** | Koordinat girilmemişken haritanın yerinde görünen görseller. |

---

## Görsel yükleme

Görsel alanına tıklayıp dosyayı sürükleyin veya **Upload** ile seçin.

- **Alternatif metin (alt) alanını doldurun.** Görseli göremeyenler ve arama
  motorları bunu okur. TR ve EN ayrı.
- **Hotspot**: görselin üstündeki daireyi sürükleyerek "önemli nokta"yı
  işaretleyebilirsiniz. Farklı ekran oranlarında kırpma bu noktayı korur —
  yüz veya teknenin baş kısmı gibi.
- Büyük dosya yükleyin (en az 1800 px genişlik); site küçültmeyi kendisi yapar.

---

## Sık karşılaşılanlar

**"Değişikliğim sitede görünmüyor."**
Publish'e bastınız mı? Sağ üstte "Unpublished changes" yazıyorsa basmamışsınız.

**"Yat listede yanlış sekmede."**
Durum alanını kontrol edin.

**"Ana sayfada iki tekne birden büyük görünüyor."**
Birden fazla yatta "Ana sayfada öne çıkar" açık kalmış. Yalnızca birinde açık
olmalı.

**"Etkinlik yanlış bölümde."**
Yaklaşan / Geçmiş elle seçilmez, tarihten hesaplanır. Tarihi kontrol edin.

**"Bayi haritada görünmüyor."**
Konum alanı boş. Yukarıdaki adımlarla koordinat girin.

**"Yanlışlıkla sildim."**
Sanity kayıtları saklar. sanity.io/manage → proje → History üzerinden geri
alınabilir. Silmeden önce yine de emin olun.

---

## Yapmayın

- **Yayınlanmış bir kaydın URL adresini (slug) değiştirmeyin.** Eski bağlantılar
  ve arama motoru kayıtları kırılır. Gerekiyorsa geliştiriciye söyleyin.
- **Tekil sayfaları (Ana Sayfa, Dünyamız, Site Ayarları) silmeye çalışmayın.**
  Bu yüzden silme butonu kapalıdır.
- **Zorunlu alanları boş bırakmayın.** Publish butonu izin vermez; kırmızı
  uyarıyı okuyun.
