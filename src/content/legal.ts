/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  TASLAK — HUKUKİ İNCELEMEDEN GEÇMEDİ. YAYINA ALMADAN ÖNCE OKUTUN.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Privacy policy / KVKK aydınlatma metni.
 *
 * This was written from what the site *actually does* — the contact form, the
 * hosting, the analytics, the map — and not by a lawyer. It is deliberately
 * specific about the third parties in use so a solicitor can check it against
 * the real data flows quickly.
 *
 * Company identity (unvan, adres, telefon, e-posta, VERBIS kaydı) is still
 * unknown, so those slots carry the same bracketed placeholders used elsewhere
 * on the site. The document renders with a visible draft banner until it is
 * reviewed.
 */

import type { LegalDocument } from "./types";

export const privacyPolicy: LegalDocument = {
  title: {
    tr: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
    en: "Privacy Policy",
  },

  // Bumped by hand whenever the text below changes.
  lastUpdated: "2026-08-25",

  notice: {
    tr: "Bu metin bir taslaktır ve hukuki incelemeden geçmemiştir. Sitenin fiilen ne yaptığı esas alınarak hazırlandı; yayına almadan önce bir hukuk danışmanına inceletmenizi öneririz.",
    en: "This text is a draft and has not been reviewed by a lawyer. It was written from what the site actually does; we recommend a legal review before publication.",
  },

  intro: {
    tr: "Bu metin, [ŞİRKET UNVANI] tarafından işletilen bu web sitesini ziyaret ettiğinizde kişisel verilerinizin nasıl işlendiğini açıklar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır.",
    en: "This text explains how your personal data is handled when you visit this website, operated by [COMPANY NAME]. It is written with reference to Turkish Law No. 6698 on the Protection of Personal Data (KVKK).",
  },

  sections: [
    {
      heading: { tr: "Veri sorumlusu", en: "Data controller" },
      body: {
        tr: [
          "Veri sorumlusu: [ŞİRKET UNVANI]",
          "Adres: [ADRES SATIRI 1], [POSTA KODU / ŞEHİR]",
          "Telefon: [TELEFON] · E-posta: [E-POSTA]",
          "Bu bilgiler tamamlanmadan metin yayına alınmamalıdır. Şirketin VERBIS kaydı gerekiyorsa kayıt numarası da burada belirtilmelidir.",
        ],
        en: [
          "Data controller: [COMPANY NAME]",
          "Address: [ADDRESS LINE 1], [POSTCODE / CITY]",
          "Phone: [PHONE] · Email: [EMAIL]",
          "The document should not be published before these details are filled in. If the company is required to register with VERBIS, the registration number belongs here as well.",
        ],
      },
    },
    {
      heading: { tr: "İşlenen kişisel veriler", en: "Personal data we process" },
      body: {
        tr: [
          "İletişim formu: Formu doldurduğunuzda adınız, e-posta adresiniz, ülkeniz, ilgi alanınız ve mesajınızda yazdıklarınız işlenir. Bu alanlardan yalnızca ad ve e-posta zorunludur.",
          "Teknik veriler: Siteyi ziyaret ettiğinizde, barındırma altyapısı tarafından IP adresiniz, tarayıcı bilgileriniz ve ziyaret ettiğiniz sayfalar gibi teknik kayıtlar tutulur.",
          "Ölçümleme: Sitede Vercel Analytics kullanılmaktadır. Bu araç sayfa görüntülemelerini toplar; çerez kullanmaz ve ziyaretçileri kişi bazında tanımlamayı amaçlamaz.",
        ],
        en: [
          "Contact form: When you submit the form we process your name, email address, country, area of interest, and whatever you write in the message. Only name and email are required.",
          "Technical data: When you visit the site, the hosting infrastructure records technical information such as your IP address, browser details, and the pages you visit.",
          "Analytics: The site uses Vercel Analytics. It aggregates page views; it does not use cookies and is not intended to identify individual visitors.",
        ],
      },
    },
    {
      heading: {
        tr: "İşleme amaçları ve hukuki sebep",
        en: "Purposes and legal basis",
      },
      body: {
        tr: [
          "İletişim formu verileri, yalnızca talebinize cevap verebilmek ve sizinle iletişim kurabilmek amacıyla işlenir. Hukuki sebep, KVKK m.5/2-(c) uyarınca bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması ve m.5/2-(f) uyarınca meşru menfaattir.",
          "Teknik kayıtlar, sitenin güvenliğini sağlamak ve hatalarını gidermek amacıyla, meşru menfaat hukuki sebebine dayanarak işlenir.",
          "Ölçümleme verileri, sitenin kullanımını anlamak ve iyileştirmek amacıyla toplu (anonim) biçimde işlenir.",
          "Verileriniz pazarlama amacıyla kullanılmaz ve açık rızanız olmadan üçüncü taraflara pazarlama amacıyla aktarılmaz.",
        ],
        en: [
          "Contact form data is processed solely to answer your enquiry and to correspond with you. The legal basis is that processing is directly related to the conclusion or performance of a contract, and legitimate interest.",
          "Technical records are processed on the basis of legitimate interest, to keep the site secure and to diagnose faults.",
          "Analytics data is processed in aggregate form to understand and improve how the site is used.",
          "Your data is not used for marketing, and is not transferred to third parties for marketing purposes without your explicit consent.",
        ],
      },
    },
    {
      heading: {
        tr: "Verilerin aktarıldığı taraflar",
        en: "Who we share data with",
      },
      body: {
        tr: [
          "Site, işleyişi için aşağıdaki hizmet sağlayıcılarını kullanır. Bu sağlayıcıların sunucuları yurt dışında bulunabilir; bu durumda KVKK m.9 kapsamında yurt dışına aktarım söz konusu olur ve gerekli şartların sağlanması gerekir. Bu nokta özellikle hukuki incelemeye tabi tutulmalıdır.",
          "Vercel — sitenin barındırılması ve ölçümleme.",
          "Resend — iletişim formu mesajlarının e-posta olarak iletilmesi.",
          "Sanity — site içeriğinin yönetimi.",
          "OpenStreetMap — bayi ve servis ağı haritasının görüntülenmesi.",
          "Bunların dışında verileriniz, yalnızca yasal bir yükümlülük gereği yetkili kamu kurumlarıyla paylaşılabilir.",
        ],
        en: [
          "The site relies on the following service providers. Their servers may be located outside Türkiye; where that is the case, a cross-border transfer arises under KVKK Art. 9 and the required conditions must be met. This point in particular should be checked in legal review.",
          "Vercel — hosting and analytics.",
          "Resend — delivering contact form messages by email.",
          "Sanity — managing site content.",
          "OpenStreetMap — displaying the dealer and service network map.",
          "Beyond these, your data may only be shared with competent public authorities where required by law.",
        ],
      },
    },
    {
      heading: { tr: "Saklama süresi", en: "Retention" },
      body: {
        tr: [
          "İletişim formu üzerinden gelen mesajlar, talebinizin sonuçlanmasından sonra makul bir süre boyunca ve varsa ilgili mevzuatın öngördüğü saklama süreleri kadar tutulur; sonrasında silinir veya anonim hâle getirilir.",
          "Kesin saklama süreleri şirketin saklama ve imha politikasıyla birlikte belirlenmelidir.",
        ],
        en: [
          "Messages received through the contact form are kept for a reasonable period after your enquiry is closed, and for any retention period required by applicable law; after that they are deleted or anonymised.",
          "Exact retention periods should be set alongside the company's retention and destruction policy.",
        ],
      },
    },
    {
      heading: { tr: "Çerezler", en: "Cookies" },
      body: {
        tr: [
          "Bu sitede pazarlama veya takip amaçlı çerez kullanılmamaktadır. Dil tercihinizin korunması gibi işlevler için yalnızca zorunlu teknik çerezler kullanılabilir.",
          "İleride pazarlama veya takip çerezi eklenirse, bu metnin güncellenmesi ve bir çerez rıza mekanizması kurulması gerekir.",
        ],
        en: [
          "This site does not use marketing or tracking cookies. Only strictly necessary technical cookies may be used, for functions such as remembering your language preference.",
          "If marketing or tracking cookies are added later, this text must be updated and a cookie consent mechanism put in place.",
        ],
      },
    },
    {
      heading: { tr: "KVKK kapsamındaki haklarınız", en: "Your rights" },
      body: {
        tr: [
          "KVKK m.11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç doğmasına itiraz etme ve zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
          "Bu haklarınızı kullanmak için [E-POSTA] adresine yazabilir veya yukarıdaki posta adresine başvurabilirsiniz. Başvurunuz en geç otuz gün içinde sonuçlandırılır.",
        ],
        en: [
          "Under KVKK Art. 11 you have the right to learn whether your personal data is being processed, to request information if it is, to learn the purpose of processing and whether the data is used accordingly, to know the third parties to whom it is transferred at home or abroad, to request correction if it is incomplete or inaccurate, to request erasure or destruction, to request that such actions be notified to third parties the data was transferred to, to object to an adverse outcome arising solely from automated analysis, and to claim compensation if you suffer loss.",
          "To exercise these rights, write to [EMAIL] or to the postal address above. Applications are answered within thirty days at the latest.",
        ],
      },
    },
    {
      heading: { tr: "Değişiklikler", en: "Changes" },
      body: {
        tr: [
          "Bu metin, sitenin işleyişi değiştikçe güncellenebilir. Güncel sürümün tarihi sayfanın üstünde yer alır.",
        ],
        en: [
          "This text may be updated as the site changes. The date of the current version is shown at the top of the page.",
        ],
      },
    },
  ],
};
