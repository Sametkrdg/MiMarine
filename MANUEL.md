# MANUEL.md

Bu dosya, kod ile otomatikleştirilemeyen ve kullanıcının (samet) kendisinin yapması gereken adımların listesidir. Geliştirme ilerledikçe yeni maddeler eklenecektir (bkz. `CLAUDE.md` → "Manuel Adım Kuralı").

Her madde tamamlandığında başındaki kutuyu işaretleyin: `- [ ]` → `- [x]`.

## Hesaplar & API Anahtarları

- [ ] **Sanity** hesabı oluştur, yeni proje aç → Project ID ve dataset adı al (`.env` için gerekli).
- [ ] Sanity Studio'ya içerik girecek kişiye (client/ekip) davetiye gönder / rol ata.
- [ ] **Mapbox** hesabı oluştur, bir Access Token al (Dealer and Services Network haritası için).
- [ ] **Resend** hesabı oluştur, API key al.
- [ ] Resend ile kendi domain'inizden mail gönderebilmek için gerekli DNS kayıtlarını (SPF/DKIM) domain sağlayıcınızda ekleyin ve Resend üzerinde doğrulayın.
- [ ] Proje için bir **Git deposu** başlatın (`git init`) ve GitHub'da bir repo açıp bağlayın — Vercel deploy'u buna bağlanacak.
- [ ] **Vercel** hesabı oluştur, GitHub reponuzu Vercel projesine bağlayın.

## Deploy & Domain

- [ ] `.env` içindeki tüm değişkenleri (SANITY, MAPBOX, RESEND vb.) Vercel proje ayarlarına (Environment Variables) girin — Production ve Preview ortamları için ayrı ayrı kontrol edin.
- [ ] Site için kullanılacak domain adına karar verin (yoksa `.vercel.app` ile geçici olarak devam edilebilir).
- [ ] Domain satın alındıysa, Vercel'e bağlamak için DNS ayarlarını (A/CNAME kaydı) yapın.
- [ ] Vercel Analytics'i proje ayarlarından (Vercel Dashboard → Analytics) aktif edin.

## Marka Kimliği (Faz 1'de ortaya çıktı)

Tasarım prototipi (`design/tasarim-prototipi.html`) kurgusal bir marka için
çizilmişti ve içinde **uydurma kurumsal bilgiler** vardı: kuruluş yılı (1974),
teslim edilen tekne sayısı, Bodrum adresi, telefon numaraları ve
`@serenyachts.com` e-posta adresleri. Bunlar MiMarine'in gerçek bilgisi
olmadığı için siteye taşınmadı; yerlerine `[ADDRESS LINE 1]` gibi köşeli
parantezli yer tutucular kondu (`src/lib/placeholder.ts`).

- [ ] Wordmark'ın doğru yazımını onaylayın — şu an başlıkta `MIMARINE`, altında
      `YACHT` yazıyor (`src/lib/brand.ts`). Farklı bir kilitlenme (örn. tek satır
      "MIMARINE YACHT", ya da "Mi Marine") isteniyorsa söyleyin.
- [ ] Tescilli şirket unvanını verin (footer'daki telif satırında kullanılacak).
- [ ] Kuruluş yılı / "since ..." satırı kullanılacak mı, kullanılacaksa doğru yıl nedir?
- [ ] Gerçek adres, telefon ve e-posta adreslerini verin (merkez + varsa üretim tesisi).
- [ ] Sitenin varsayılan dili **TR** olarak ayarlandı (`/` → `/tr`). Varsayılan EN
      olsun isteniyorsa `src/i18n/routing.ts` içinde tek satırlık değişiklik.

## İçerik & Görsel

- [ ] Gerçek yat fotoğrafları ve galeri görsellerini sağlayın (şu an Unsplash placeholder kullanılıyor).
- [ ] Logo dosyasını (SVG tercihen) ve marka renk kodlarını sağlayın. Şu an prototipin
      paleti geçici olarak kullanılıyor (mor aksan `#5B54A6`, kağıt `#FBFAF8`,
      mürekkep `#171717`) — hepsi `src/app/globals.css` içindeki `@theme` bloğunda.
- [ ] TR ve EN gerçek metin içeriklerini (Ana Sayfa, Our World, yat açıklamaları, haber/etkinlik metinleri) sağlayın veya taslakları onaylayın.
- [ ] Bayi ve Servis Ağı için gerçek lokasyon listesini (isim, adres, telefon, koordinat) sağlayın.

## Karar Gerektiren Noktalar

- [ ] Yat teknik özellik alanlarının (uzunluk, genişlik, motor, kapasite vb.) kesin listesine karar verin.
- [ ] Gizlilik Politikası / KVKK metni gerekip gerekmediğine karar verin; gerekiyorsa metni sağlayın.
- [ ] News and Events'te ayrı bir "haber" (etkinlik olmayan duyuru) içerik tipine ihtiyaç olup olmadığına karar verin (şu an tek "event" tipiyle ilerleniyor).

## Yayına Alma Öncesi Son Kontrol

- [ ] Sanity Studio kullanım kılavuzunu/eğitimini alın (client kendi içerik ekleyip çıkarabilsin diye).
- [ ] Canlıya almadan önce TR/EN tüm sayfaları son kez gözden geçirin.
