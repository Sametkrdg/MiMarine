/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  PLACEHOLDER CONTENT — NOT REAL MIMARINE DATA. DO NOT SHIP AS-IS.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Everything here exists so the pages can be built and reviewed at realistic
 * text lengths before Sanity is connected. In phase 2 this file is deleted and
 * the accessors in `index.ts` are pointed at GROQ queries instead.
 *
 * Rules this file follows, on purpose:
 *
 *   • No company history, founding year, or headline statistic is invented —
 *     those slots carry bracketed markers so nothing false can be mistaken
 *     for fact.
 *   • No phone number, e-mail address or street address is invented, so no
 *     one can contact a wrong party from this site.
 *   • No third-party dealer or partner company is named.
 *   • Yachts use model/hull designations rather than invented boat names.
 *   • Yacht specifications are illustrative round numbers, present only to
 *     show the layout.
 *
 * See MANUEL.md → "Marka Kimliği" and "İçerik & Görsel" for what the client
 * needs to supply to replace all of this.
 */

import type {
  Dealer,
  EventItem,
  HomeContent,
  MapImages,
  Office,
  OurWorldContent,
  SiteImage,
  Yacht,
} from "./types";

/**
 * PLACEHOLDER imagery from Unsplash, referenced by photo id.
 *
 * The Unsplash licence permits use without attribution, but these are stand-ins
 * only — every one is replaced by client photography via Sanity in phase 2.
 * Each id below was checked to resolve before being written in.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

function img(id: string, tr: string, en: string): SiteImage {
  return {
    src: `${UNSPLASH}${id}?auto=format&fit=crop&w=1800&q=75`,
    alt: { tr, en },
  };
}

/** Interior / detail pool, rotated so hulls do not share an identical gallery. */
const GALLERY_POOL: SiteImage[] = [
  img("1604737637145-48cc31d160eb", "Kıç güverte", "Aft deck"),
  img("1598448251941-ae4dd47dba33", "Ana salon", "Main saloon"),
  img("1598448056086-307e98ef5c4a", "Armatör kabini", "Owner's cabin"),
  img("1616207133639-cd5e4db9859f", "Detay — tekne dikişi", "Detail — hull seam"),
  img("1600812703042-38e573598898", "Yaşam alanı", "Living area"),
  img("1502986591842-471865a47d0e", "Güverte detayı", "Deck detail"),
  img("1535078035266-a0fa7d3b8f65", "Kokpit", "Cockpit"),
  img("1674606878551-f424ad6ce965", "İç mekân detayı", "Interior detail"),
];

/** Four consecutive pool entries, offset per hull. */
function gallery(offset: number): SiteImage[] {
  return [0, 1, 2, 3].map((i) => GALLERY_POOL[(offset + i) % GALLERY_POOL.length]);
}

const specKeys = {
  loa: { tr: "Tam boy", en: "Length overall" },
  beam: { tr: "Genişlik", en: "Beam" },
  draught: { tr: "Su çekimi", en: "Draught" },
  hull: { tr: "Tekne malzemesi", en: "Hull" },
  drive: { tr: "Tahrik", en: "Propulsion" },
  guests: { tr: "Misafir / mürettebat", en: "Guests / crew" },
  range: { tr: "Menzil", en: "Range" },
  delivery: { tr: "Teslim", en: "Delivery" },
  availability: { tr: "Müsaitlik", en: "Availability" },
  stage: { tr: "Aşama", en: "Stage" },
};

/** Values the client must confirm are rendered as an em dash, never guessed. */
const TBC = "—";

export const yachts: Yacht[] = [
  {
    slug: "mimarine-34-hull-01",
    name: "MiMarine 34 · Hull 01",
    status: "delivered",
    order: 1,
    featured: false,
    subtitle: { tr: "Teslim edildi · Ege", en: "Delivered · Aegean" },
    loa: "34,0 m",
    lede: {
      tr: "Yaz boyunca Ege'de seyreden, kışı kendi limanında geçiren bir aile için dört kabinli explorer.",
      en: "A four-cabin explorer for a family who cruise the Aegean through the summer and winter the boat at home.",
    },
    body: {
      tr: [
        "Hibrit paketi, jeneratör çalışmadan demirde tam bir gece geçirmeye yetecek batarya kapasitesiyle kuruldu.",
        "İç mekân yağlanmış sert ağaç ve yerel dokuma kumaşlarla tamamlandı; bütün marangoz işi tersanede yapıldı.",
      ],
      en: [
        "The hybrid package was sized to spend a full night at anchor with no generator running.",
        "The interior is oiled hardwood with locally woven textiles, and all joinery was made in-house.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "34,0 m" },
      { key: specKeys.beam, value: "7,6 m" },
      { key: specKeys.draught, value: "2,1 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "8 / 4" },
      { key: specKeys.range, value: "3.600 nm @ 10 kn" },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1569263979104-865ab7cd8d13", "MiMarine 34 seyir hâlinde", "MiMarine 34 under way"),
    gallery: gallery(0),
  },
  {
    slug: "mimarine-28-hull-02",
    name: "MiMarine 28 · Hull 02",
    status: "delivered",
    order: 2,
    featured: false,
    subtitle: { tr: "Teslim edildi · Batı Akdeniz", en: "Delivered · Western Med" },
    loa: "28,4 m",
    lede: {
      tr: "Tek misafir güvertesi ve alışılmadık ölçüde geniş kıç platformu olan, armatörün kendi kullanacağı kompakt bir tekne.",
      en: "A compact owner-operator yacht with a single guest deck and an unusually large aft platform.",
    },
    body: {
      tr: [
        "Mürettebat iki kişi olduğu için her sistem, gerekirse elle çalıştırılabilecek kadar sadeleştirildi.",
        "Flybridge'den kullanım için tasarlandı; köprüüstü yerleşimi buna göre kuruldu.",
      ],
      en: [
        "The crew is two, so every system was simplified until it could be run by hand if needed.",
        "She is drawn to be driven from the flybridge, and the bridge layout follows from that.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "28,4 m" },
      { key: specKeys.beam, value: "6,9 m" },
      { key: specKeys.draught, value: "1,8 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "6 / 2" },
      { key: specKeys.range, value: "3.100 nm @ 10 kn" },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1523496922380-91d5afba98a3", "MiMarine 28 havadan", "MiMarine 28 from the air"),
    gallery: gallery(1),
  },
  {
    slug: "mimarine-42-hull-03",
    name: "MiMarine 42 · Hull 03",
    status: "delivered",
    order: 3,
    featured: false,
    subtitle: { tr: "Teslim edildi · Adriyatik", en: "Delivered · Adriatic" },
    loa: "42,0 m",
    lede: {
      tr: "Bugüne kadarki en büyük teslimatımız; her bileşeni için malzeme kaydı tutulan ilk tekne.",
      en: "Our largest delivery to date, and the first hull with a material record kept for every component.",
    },
    body: {
      tr: [
        "Yapının önemli bir bölümü geri dönüştürülmüş alüminyum; marangoz işinin tamamı sertifikalı ahşaptan.",
        "Armatör, teknenin tüketimini tasarım hedefiyle karşılaştıran yıllık bir rapor alıyor.",
      ],
      en: [
        "A large share of her structure is recycled aluminium, and the joinery is entirely certified timber.",
        "The owner receives an annual account of the yacht's consumption against her design case.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "42,0 m" },
      { key: specKeys.beam, value: "8,4 m" },
      { key: specKeys.draught, value: "2,4 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "10 / 6" },
      { key: specKeys.range, value: "4.200 nm @ 10 kn" },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1605281317010-fe5ffe798166", "MiMarine 42 demirde", "MiMarine 42 at anchor"),
    gallery: gallery(2),
  },
  {
    slug: "mimarine-24-hull-04",
    name: "MiMarine 24 · Hull 04",
    status: "delivered",
    order: 4,
    featured: false,
    subtitle: { tr: "Teslim edildi · Ege", en: "Delivered · Aegean" },
    loa: "24,2 m",
    lede: {
      tr: "Yaptığımız en küçük tekne ve en çok sorulan model.",
      en: "The smallest hull we build, and the one we are asked for most often.",
    },
    body: {
      tr: [
        "Üç kabin, kokpite açılan bir mutfak ve 4,5 metrelik bir bota yer açan tender garajı.",
        "Her seyrin ilk saatleri tamamen elektrikle yapılabiliyor.",
      ],
      en: [
        "Three cabins, a galley that opens to the cockpit, and a tender garage that swallows a 4.5 m RIB.",
        "The opening hours of any passage can be run on electric drive alone.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "24,2 m" },
      { key: specKeys.beam, value: "6,2 m" },
      { key: specKeys.draught, value: "1,6 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "6 / 2" },
      { key: specKeys.range, value: "2.400 nm @ 10 kn" },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1562281302-809108fd533c", "MiMarine 24 rıhtımda", "MiMarine 24 alongside"),
    gallery: gallery(3),
  },
  {
    slug: "mimarine-30-hull-05",
    name: "MiMarine 30 · Hull 05",
    status: "ready-for-delivery",
    order: 1,
    featured: false,
    subtitle: { tr: "Teslime hazır", en: "Ready for delivery" },
    loa: "30,6 m",
    lede: {
      tr: "Deniz denemeleri tamamlandı, iç mekân bitti; devir için hazır.",
      en: "Sea trials complete, interior fitted, ready for handover.",
    },
    body: {
      tr: [
        "Standart spesifikasyonla ve nötr bir palette inşa edildi; kumaş ve sanat eseri seçimi bir sonraki armatöre bırakıldı.",
        "Denemeler tersane açıklarında tamamlandı.",
      ],
      en: [
        "Built to our standard specification with a neutral palette, leaving textiles and artwork to the next owner.",
        "Trials were completed off the yard.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "30,6 m" },
      { key: specKeys.beam, value: "7,2 m" },
      { key: specKeys.draught, value: "1,9 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "8 / 3" },
      { key: specKeys.availability, value: TBC },
      { key: specKeys.range, value: "3.400 nm @ 10 kn" },
    ],
    cover: img("1559385301-0187cb6eff46", "MiMarine 30 deniz denemesinde", "MiMarine 30 on sea trials"),
    gallery: gallery(4),
  },
  {
    slug: "mimarine-38-hull-06",
    name: "MiMarine 38 · Hull 06",
    status: "ready-for-delivery",
    order: 2,
    featured: false,
    subtitle: { tr: "Teslime hazır", en: "Ready for delivery" },
    loa: "38,0 m",
    lede: {
      tr: "İç donanım tamamlanıyor; iki misafir kabini hâlâ spesifikasyona açık.",
      en: "Fitting out is completing; two guest cabins are still open to specification.",
    },
    body: {
      tr: [
        "Üst güverte kapalı bir salon olarak bitirilebilir ya da gölgelikli teras olarak açık bırakılabilir.",
        "Her iki çizim de hazır tutuluyor; devirden on iki hafta öncesine kadar karar verilebilir.",
      ],
      en: [
        "The upper deck can be finished as a skylounge or left open as a shaded terrace.",
        "We hold both drawings and can commit either way up to twelve weeks before handover.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "38,0 m" },
      { key: specKeys.beam, value: "8,0 m" },
      { key: specKeys.draught, value: "2,2 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "10 / 5" },
      { key: specKeys.availability, value: TBC },
      { key: specKeys.range, value: "3.900 nm @ 10 kn" },
    ],
    cover: img(
      "1535024966840-e7424dc2635b",
      "MiMarine 38 donatım salonunda",
      "MiMarine 38 in the fitting-out shed",
    ),
    gallery: gallery(5),
  },
  {
    slug: "mimarine-24-hull-07",
    name: "MiMarine 24 · Hull 07",
    status: "ready-for-delivery",
    order: 3,
    featured: false,
    subtitle: { tr: "Teslime hazır", en: "Ready for delivery" },
    loa: "24,2 m",
    lede: {
      tr: "Taş ve meşe tonlarında bitmiş bir MiMarine 24; hemen müsait.",
      en: "A finished MiMarine 24 in stone and oak, available immediately.",
    },
    body: {
      tr: [
        "Sipariş beklemeden inşa edildi ve tamamlandı.",
        "Şu anda tersanede bağlı; iki gün önceden haber verilerek gezilebilir.",
      ],
      en: [
        "Built on speculation and completed without a contract.",
        "Currently berthed at the yard and available to view with two days' notice.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "24,2 m" },
      { key: specKeys.beam, value: "6,2 m" },
      { key: specKeys.draught, value: "1,6 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "6 / 2" },
      { key: specKeys.availability, value: TBC },
      { key: specKeys.range, value: "2.400 nm @ 10 kn" },
    ],
    cover: img("1552160757-52790c6f4faf", "MiMarine 24 kokpit detayı", "MiMarine 24 cockpit detail"),
    gallery: gallery(6),
  },
  {
    slug: "mimarine-46-hull-08",
    name: "MiMarine 46 · Hull 08",
    status: "in-production",
    order: 1,
    featured: true,
    subtitle: { tr: "Üretimde", en: "In production" },
    loa: "46,2 m",
    lede: {
      tr: "Bugüne kadarki en büyük teknemiz ve demirde bütün bir geceyi yalnızca bataryayla sessiz geçirebilecek ilk model.",
      en: "Our largest hull to date, and the first to run silent at anchor for a full night on battery alone.",
    },
    body: {
      tr: [
        "Güneş güvertesinin üzerine yayılan bir güneş paneli örtüsü ve 16 knot yerine 11 knota göre optimize edilmiş bir tekne formu taşıyor.",
        "Batarya odası tam ölçekli olarak maketlendi ve inşaata öyle başlandı.",
      ],
      en: [
        "She carries a solar canopy over the sundeck and a hull form optimised for 11 knots rather than 16.",
        "The battery room was mocked up at full scale before the build began.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "46,2 m" },
      { key: specKeys.beam, value: "9,1 m" },
      { key: specKeys.draught, value: "2,6 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "12 / 7" },
      { key: specKeys.stage, value: TBC },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1593351415075-3bac9f45c877", "MiMarine 46 inşa hâlinde", "MiMarine 46 in build"),
    gallery: gallery(7),
  },
  {
    slug: "mimarine-34-hull-09",
    name: "MiMarine 34 · Hull 09",
    status: "in-production",
    order: 2,
    featured: false,
    subtitle: { tr: "Üretimde", en: "In production" },
    loa: "34,0 m",
    lede: {
      tr: "Dördüncü MiMarine 34; yıllar sonra geri dönen bir armatör için inşa ediliyor.",
      en: "The fourth MiMarine 34, in build for an owner returning after many years.",
    },
    body: {
      tr: [
        "Bu tekne uzatılmış bir tender garajı ve Türkiye'nin güney kıyısı için sığ su çekimli bir omurga taşıyor.",
        "Yapı kapatıldı; iç donanım aşamasına geçildi.",
      ],
      en: [
        "This hull carries a lengthened tender garage and a shallow-draught keel for the Turkish south coast.",
        "The structure is closed and she has moved into fitting out.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "34,0 m" },
      { key: specKeys.beam, value: "7,6 m" },
      { key: specKeys.draught, value: "1,95 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "8 / 4" },
      { key: specKeys.stage, value: TBC },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1598737285721-29346a5c9278", "MiMarine 34 tezgâhta", "MiMarine 34 in the shed"),
    gallery: gallery(0),
  },
  {
    slug: "mimarine-52-concept",
    name: "MiMarine 52 · Concept",
    status: "in-production",
    order: 3,
    featured: false,
    subtitle: { tr: "Tasarım aşaması", en: "Design phase" },
    loa: "52,0 m",
    lede: {
      tr: "Metanole hazır 52 metrelik bir çalışma; ilk sipariş için açık.",
      en: "A study for a methanol-ready 52 metre, open for a first commission.",
    },
    body: {
      tr: [
        "52, Akdeniz'de ikmal imkânı doğduğunda sonradan takılabilecek bir yakıt hücresi ve metanol tankı etrafında çizildi.",
        "Genel yerleşim planı gizlilik sözleşmesiyle paylaşılıyor.",
      ],
      en: [
        "The 52 is drawn around a fuel cell and a methanol tank we can retrofit as bunkering appears in the Mediterranean.",
        "The general arrangement is available under NDA.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: "52,0 m" },
      { key: specKeys.beam, value: "9,8 m" },
      { key: specKeys.draught, value: "2,8 m" },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.drive, value: TBC },
      { key: specKeys.guests, value: "12 / 9" },
      { key: specKeys.stage, value: TBC },
      { key: specKeys.delivery, value: TBC },
    ],
    cover: img("1567899378494-47b22a2ae96a", "MiMarine 52 konsept", "MiMarine 52 concept"),
    gallery: gallery(2),
  },
];

/**
 * Dates are computed relative to build time so the Upcoming / Past split stays
 * demonstrable however long this placeholder data survives.
 */
const now = new Date();
const inDays = (n: number) =>
  new Date(now.getTime() + n * 86_400_000).toISOString().slice(0, 10);

export const events: EventItem[] = [
  {
    slug: "yacht-festival",
    date: inDays(24),
    endDate: inDays(29),
    location: { tr: "[ETKİNLİK ŞEHRİ]", en: "[EVENT CITY]" },
    title: { tr: "Yat festivali", en: "Yacht festival" },
    excerpt: {
      tr: "Teslime hazır teknelerimizden biri hafta boyunca iskelede olacak, tersane ekibi teknede.",
      en: "One of our ready-for-delivery hulls will be alongside for the week, with the yard team aboard.",
    },
    body: {
      tr: [
        "Gezme randevuları sabah saatlerinde veriliyor; öğleden sonralar armatörler ve kaptanları için ayrı tutuluyor.",
        "Mühendislik ekibimiz hibrit paketi ve teslimatla birlikte verdiğimiz malzeme kaydını anlatmak üzere teknede olacak.",
      ],
      en: [
        "Viewings are by appointment through the morning; afternoons are kept open for owners and their captains.",
        "Our engineering team will be aboard to talk through the hybrid package and the material record issued with every delivery.",
      ],
    },
    cover: img("1777557215949-192a8c51862a", "Akdeniz limanı", "Mediterranean harbour"),
  },
  {
    slug: "open-day",
    date: inDays(58),
    location: { tr: "[TESİS ŞEHRİ]", en: "[FACILITY CITY]" },
    title: { tr: "Açık gün ve omurga töreni", en: "Open day and keel ceremony" },
    excerpt: {
      tr: "İnşa salonu, en büyük teknemizin omurga konulması için bir günlüğüne ziyarete açılıyor.",
      en: "The build hall opens for one day around the keel laying of our largest hull.",
    },
    body: {
      tr: [
        "Konuklar proje yöneticileriyle tekneyi geziyor, tam ölçekli maketlenmiş batarya odasını görüyor ve önümüzdeki iki yılı bu teknede geçirecek kaynakçılarla tanışıyor.",
        "Kontenjan sınırlı. Kayıt bayiniz üzerinden ya da doğrudan tersaneden yapılabilir.",
      ],
      en: [
        "Guests walk the hull with the project managers, see the battery room mocked up at full scale, and meet the welders who will spend the next two years on this boat.",
        "Places are limited. Registration through your dealer or the yard.",
      ],
    },
    cover: img("1772550834175-734b417deb42", "Karada bekleyen tekne", "A hull on the hard"),
  },
  {
    slug: "refit-forum",
    date: inDays(96),
    location: { tr: "[FORUM ŞEHRİ]", en: "[FORUM CITY]" },
    title: { tr: "Sürdürülebilir refit forumu", en: "Sustainable refit forum" },
    excerpt: {
      tr: "Alüminyum yatların servis ömrünü uzatmak üzere birkaç tersaneyle bir günlük çalışma oturumu.",
      en: "A one-day working session with several yards on extending the service life of aluminium yachts.",
    },
    body: {
      tr: [
        "Kendi refit verimizi paylaşıyoruz; ortak bir referans noktasının, değiştirmek yerine onarmak lehine bir zemin kuracağını düşünüyoruz.",
        "Armatörlere, kaptanlara, sörveyörlere ve tersanelere açık. Ticari stant yok.",
      ],
      en: [
        "We are publishing our own refit data, in the hope that a shared baseline makes the case for repair over replacement.",
        "Open to owners, captains, surveyors and yards. No trade stands.",
      ],
    },
    cover: img("1573167507387-6b4b98cb7c13", "Çalışma oturumu", "A working session"),
  },
  {
    slug: "hull-03-delivered",
    date: inDays(-72),
    location: { tr: "[TERSANE ŞEHRİ]", en: "[YARD CITY]" },
    title: { tr: "MiMarine 42 teslim edildi", en: "MiMarine 42 delivered" },
    excerpt: {
      tr: "Uzun bir inşa süresinin sonunda, malzeme kaydı eksiksiz tutulan ilk teknemiz suya indi.",
      en: "After a long build, the first hull with a complete material record left the yard.",
    },
    body: {
      tr: [
        "Tekne, bütün teknelerimiz gibi sabahın erken saatinde sessizce ayrıldı. Armatör tören ve basın istemedi.",
        "Kayda değer olan evrak: bu teknedeki her bileşen menşei, kütlesi ve geri dönüştürülebilirliğiyle belgelendi.",
      ],
      en: [
        "She left quietly early in the morning, as all our boats do. Her owner asked for no ceremony and no press.",
        "What is worth recording is the paperwork: every component on this yacht is documented by origin, mass and recyclability.",
      ],
    },
    cover: img(
      "1585000962552-70f0a67223d9",
      "İlk ışıkta tersaneden çıkış",
      "Leaving the yard at first light",
    ),
  },
  {
    slug: "notes-on-size",
    date: inDays(-190),
    location: { tr: "[FUAR ŞEHRİ]", en: "[SHOW CITY]" },
    title: { tr: "Boy üzerine notlar", en: "Notes on size" },
    excerpt: {
      tr: "Dört gün iskelede ve sürekli tekrarlanan tek bir soru.",
      en: "Four days alongside, and one conversation we keep having.",
    },
    body: {
      tr: [
        "Aynı soruyu defalarca yanıtladık: neden daha büyük ve daha hızlı yapmıyorsunuz? Dürüst cevap şu: bu ölçekte iyi yapamayız, kötü yapmak da ilgi çekici değil.",
        "Haftadan iki sipariş çıktı, ikisi de 40 metrenin altında.",
      ],
      en: [
        "We answered the same question many times over: why not build bigger, faster? The honest answer is that we cannot do it well at our size, and doing it badly is not interesting.",
        "Two commissions came out of the week, both under 40 metres.",
      ],
    },
    cover: img("1779159945563-7b914280471a", "Alacakaranlıkta liman", "Harbour at dusk"),
  },
  {
    slug: "yard-roof-solar",
    date: inDays(-420),
    location: { tr: "[TESİS ŞEHRİ]", en: "[FACILITY CITY]" },
    title: {
      tr: "Tersane kendi çatısından besleniyor",
      en: "The yard runs on its own roof",
    },
    excerpt: {
      tr: "İnşa salonlarının çatısına kurulan panel dizisi devreye alındı.",
      en: "The array over the build sheds is now in service.",
    },
    body: {
      tr: [
        "Kurulum üretimi durdurmadan, hafta hafta ilerledi. Kalan talep sertifikalı yenilenebilir enerji sözleşmesiyle karşılanıyor.",
        "Sırada boya kabini var; tersanedeki tek en büyük yük ısrarla orası.",
      ],
      en: [
        "The array went up week by week without stopping production. Remaining demand is covered by a certified renewable contract.",
        "Next: the paint shed, which is stubbornly the largest single load in the yard.",
      ],
    },
    cover: img(
      "1786913508480-2dcec035a84a",
      "Tesis çatısındaki güneş panelleri",
      "Solar array on the facility roof",
    ),
  },
];

/** PLACEHOLDER network — company names and contact details are markers only. */
const marker = {
  company: "[FİRMA ADI]",
  address: "[ADRES]",
  phone: "[TELEFON]",
  email: "[E-POSTA]",
};

export const dealers: Dealer[] = [
  { id: "d1", region: "mediterranean", type: "both", city: "[ŞEHİR 1]", ...marker, capabilities: { tr: "Yeni inşa · Refit · Tam servis", en: "New build · Refit · Full service" } },
  { id: "d2", region: "mediterranean", type: "dealer", city: "[ŞEHİR 2]", ...marker, capabilities: { tr: "Satış · Garanti · Bağlama", en: "Sales · Warranty · Berthing" } },
  { id: "d3", region: "mediterranean", type: "service", city: "[ŞEHİR 3]", ...marker, capabilities: { tr: "Servis · Kış bakımı", en: "Service · Winter storage" } },
  { id: "d4", region: "northern-europe", type: "both", city: "[ŞEHİR 4]", ...marker, capabilities: { tr: "Satış · Refit · Sistemler", en: "Sales · Refit · Systems" } },
  { id: "d5", region: "northern-europe", type: "service", city: "[ŞEHİR 5]", ...marker, capabilities: { tr: "Garanti · Kışlatma", en: "Warranty · Winterisation" } },
  { id: "d6", region: "northern-europe", type: "dealer", city: "[ŞEHİR 6]", ...marker, capabilities: { tr: "Satış · Sörvey", en: "Sales · Survey" } },
  { id: "d7", region: "americas", type: "both", city: "[ŞEHİR 7]", ...marker, capabilities: { tr: "Satış · Refit · Garanti", en: "Sales · Refit · Warranty" } },
  { id: "d8", region: "americas", type: "service", city: "[ŞEHİR 8]", ...marker, capabilities: { tr: "Garanti · Karaya alma", en: "Warranty · Haul-out" } },
  { id: "d9", region: "americas", type: "dealer", city: "[ŞEHİR 9]", ...marker, capabilities: { tr: "Satış · Charter yönetimi", en: "Sales · Charter management" } },
  { id: "d10", region: "asia-pacific", type: "both", city: "[ŞEHİR 10]", ...marker, capabilities: { tr: "Satış · Refit · Garanti", en: "Sales · Refit · Warranty" } },
  { id: "d11", region: "asia-pacific", type: "service", city: "[ŞEHİR 11]", ...marker, capabilities: { tr: "Refit · Direk · Boya", en: "Refit · Rig · Paint" } },
  { id: "d12", region: "asia-pacific", type: "dealer", city: "[ŞEHİR 12]", ...marker, capabilities: { tr: "Satış · Sörvey", en: "Sales · Survey" } },
];

/** PLACEHOLDER offices. */
export const offices: Office[] = [
  {
    id: "hq",
    role: { tr: "Merkez · Tersane", en: "Headquarters · Yard" },
    city: "[ŞEHİR]",
    addressLines: ["[ADRES SATIRI 1]", "[POSTA KODU / ŞEHİR]"],
    phone: "[TELEFON]",
    email: "[E-POSTA]",
  },
  {
    id: "build",
    role: { tr: "Üretim tesisi", en: "Build facility" },
    city: "[ŞEHİR]",
    addressLines: ["[ADRES SATIRI 1]", "[POSTA KODU / ŞEHİR]"],
    phone: "[TELEFON]",
    email: "[E-POSTA]",
  },
];

export const home: HomeContent = {
  heroImage: img(
    "1528154291023-a6525fabe5b4",
    "Sakin suda demirlemiş yat",
    "A yacht at anchor on calm water",
  ),
  heroEyebrow: { tr: "[KONUM]", en: "[LOCATION]" },
  heroTitle: { tr: "Sakin su, kalıcı yapı.", en: "Quiet water, built to last." },
  statement: {
    tr: "Her yıl az sayıda alüminyum yatı elle inşa ediyoruz. Yavaş üretim, uzun servis ömrü ve hesabını verebildiğimiz malzemeler.",
    en: "We build a small number of aluminium yachts each year, by hand. Slow production, long service life, and materials we can account for.",
  },
  statementBody: {
    tr: "Her tekne tersaneden hibrit dizel-elektrik tahrik, geri dönüştürülmüş alüminyum yapı ve belgelenmiş bir malzeme kaydıyla ayrılır.",
    en: "Every hull leaves the yard with a hybrid diesel-electric driveline, a recycled aluminium structure, and a documented material record.",
  },
  figures: [
    {
      value: "[00]",
      label: { tr: "[RAKAM BAŞLIĞI]", en: "[FIGURE LABEL]" },
      note: {
        tr: "Bu üç rakam client tarafından verilecek — örn. kuruluş yılı, yıllık üretim adedi, geri dönüştürülmüş malzeme oranı.",
        en: "These three figures are to be supplied by the client — e.g. year founded, yachts per year, recycled material share.",
      },
    },
    {
      value: "[00]",
      label: { tr: "[RAKAM BAŞLIĞI]", en: "[FIGURE LABEL]" },
      note: {
        tr: "Yer tutucu. Doğrulanmamış hiçbir sayı siteye yazılmadı.",
        en: "Placeholder. No unverified number has been written into the site.",
      },
    },
    {
      value: "[00]",
      label: { tr: "[RAKAM BAŞLIĞI]", en: "[FIGURE LABEL]" },
      note: {
        tr: "Yer tutucu. Bkz. MANUEL.md → Marka Kimliği.",
        en: "Placeholder. See MANUEL.md → Marka Kimliği.",
      },
    },
  ],
  tiles: [
    {
      href: "/our-world",
      kicker: { tr: "Dünyamız", en: "Our world" },
      title: { tr: "Sürdürülebilirlik", en: "Sustainability" },
      body: {
        tr: "Malzeme kaydı, hibrit tahrik ve kendi çatısından beslenen bir tersane.",
        en: "Material records, hybrid drivelines, and a yard that runs on its own roof.",
      },
      image: img(
        "1613665813446-82a78c468a1d",
        "İnşa salonunun çatısındaki güneş paneli örtüsü",
        "Solar canopy over the build shed",
      ),
    },
    {
      href: "/our-world",
      kicker: { tr: "Dünyamız", en: "Our world" },
      title: { tr: "El işçiliği", en: "Craftsmanship" },
      body: {
        tr: "Alüminyum tersanede kesilir, marangoz işi yakındaki atölyeden gelir.",
        en: "Aluminium is cut in-house, and joinery comes from a workshop nearby.",
      },
      image: img("1611021061285-16c871740efa", "Ahşap işleyen eller", "Hands working timber"),
    },
    {
      href: "/news-and-events",
      kicker: { tr: "Haberler ve etkinlikler", en: "News and events" },
      title: { tr: "Yaklaşan etkinlikler", en: "Upcoming events" },
      body: {
        tr: "Bu sezon iskelede ve tersanede olacağımız tarihler.",
        en: "Where we will be alongside and at the yard this season.",
      },
      image: img("1758535013136-8530d1f2ea42", "Marina, havadan", "Marina from the air"),
    },
  ],
  closing: {
    tr: "Sipariş görüşmeleri sözleşmeden çok önce başlar.",
    en: "Conversations about a commission begin long before a contract.",
  },
};

export const ourWorld: OurWorldContent = {
  title: {
    tr: "Küçük bir tersane, uzun bir ufuk.",
    en: "A small yard, a long horizon.",
  },
  heroImage: img(
    "1785038481404-4bd44c535e81",
    "Tersanede tekne inşası",
    "Building a hull at the yard",
  ),
  statement: {
    tr: "Bir yılı, hangardan çıkan tekne sayısıyla ölçüyoruz — hiçbir zaman bir avuçtan fazla değil.",
    en: "We measure a year by the number of hulls that leave the shed — never more than a handful.",
  },
  statementBody: {
    tr: "İş bilinçli olarak acelesiz. Alüminyum tersanede kesilip kaynaklanıyor, marangoz işi yakındaki bir atölyeden geliyor ve teslim ettiğimiz her tekne servis kaydımızda kalıyor.",
    en: "The work is unhurried on purpose. Aluminium is cut and welded in-house, joinery comes from a workshop nearby, and every yacht we have delivered stays on our service register.",
  },
  pillars: [
    {
      id: "sustainability",
      kicker: "01",
      title: { tr: "Sürdürülebilirlik", en: "Sustainability" },
      body: {
        tr: "Her bileşen için malzeme kaydı ve her tekne için tasarım hedefiyle karşılaştırmalı yıllık rapor.",
        en: "A material record for every component, and an annual account of each yacht against her design case.",
      },
      image: img(
        "1786913508115-51748da1339b",
        "Tersane çatısındaki güneş panelleri",
        "Solar array over the yard roofs",
      ),
      href: "/news-and-events/yard-roof-solar",
    },
    {
      id: "craft",
      kicker: "02",
      title: { tr: "El işçiliği", en: "Craftsmanship" },
      body: {
        tr: "Kaynak, marangozluk ve boya tek çatı altında. Yapısal hiçbir parça bitirilmek üzere tersaneden çıkmaz.",
        en: "Welding, joinery and paint under one roof. Nothing structural leaves the yard for finishing.",
      },
      image: img("1631396326646-c06a935ff3a6", "Atölyede marangoz", "Joiner at the bench"),
    },
    {
      id: "history",
      kicker: "03",
      title: { tr: "Geçmiş", en: "History" },
      body: {
        tr: "[BU BÖLÜMÜN METNİ CLIENT TARAFINDAN VERİLECEK — tersanenin gerçek geçmişi.]",
        en: "[COPY TO BE SUPPLIED BY THE CLIENT — the yard's actual history.]",
      },
      image: img("1509295433237-4b4851f2ab67", "Arşiv görüntüsü", "Archive photograph"),
    },
  ],
  commitments: [
    {
      no: "01",
      title: { tr: "Standart hibrit", en: "Hybrid as standard" },
      body: {
        tr: "Her tekne dizel-elektrik tahrikle ve demirde bütün bir gece sessiz kalabilecek kapasiteyle teslim edilir.",
        en: "Every hull is delivered with a diesel-electric driveline and a full night of silent capability at anchor.",
      },
    },
    {
      no: "02",
      title: { tr: "Belgelenmiş malzeme", en: "Documented materials" },
      body: {
        tr: "Bileşenlerin menşei, kütlesi ve geri dönüştürülebilirliği kaydedilir ve tekneyle birlikte devredilir.",
        en: "Origin, mass and recyclability recorded for components, and handed over with the yacht.",
      },
    },
    {
      no: "03",
      title: { tr: "Değiştirmeden önce onar", en: "Repair before replacement" },
      body: {
        tr: "Her tekne için ömür boyu servis dosyası; tersanede tutulur ve en yakın yetkili serviste yansılanır.",
        en: "A lifetime service file per hull, held at the yard and mirrored at the nearest authorised yard.",
      },
    },
    {
      no: "04",
      title: { tr: "Kendi çatısından enerji", en: "Own-roof energy" },
      body: {
        tr: "Tesislerin çatısına kurulan güneş panelleri yıllık elektrik talebinin önemli bölümünü karşılar.",
        en: "Solar across the facilities covers a significant share of annual electricity demand.",
      },
    },
  ],
};

/** PLACEHOLDER maps — replaced by a live Mapbox map once a token exists. */
export const maps: MapImages = {
  network: img("1478860409698-8707f313ee8b", "Deniz haritası", "Nautical chart"),
  contact: img("1532154066703-3973764c81fe", "Deniz haritası detayı", "Nautical chart detail"),
};
