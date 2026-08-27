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
  L10n,
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

/**
 * Specification field set.
 *
 * The definitive list is not settled yet; this is a typical set for a yacht of
 * this size and is flagged as provisional on the page itself. Adding or
 * removing a field here changes every hull at once.
 */
const specKeys = {
  loa: { tr: "Tam boy", en: "Length overall" },
  beam: { tr: "Genişlik", en: "Beam" },
  draught: { tr: "Su çekimi", en: "Draught" },
  hull: { tr: "Tekne malzemesi", en: "Hull material" },
  engine: { tr: "Motor", en: "Engine" },
  fuel: { tr: "Yakıt kapasitesi", en: "Fuel capacity" },
  guests: { tr: "Yolcu kapasitesi", en: "Guest capacity" },
  range: { tr: "Menzil", en: "Range" },
};

/** A spec value, localised — Turkish and English differ on decimal separators. */
function v(tr: string, en: string): L10n {
  return { tr, en };
}

const TBC = v("[BELİRTİLECEK]", "[TO BE CONFIRMED]");

export const yachts: Yacht[] = [
  {
    slug: "mimarine-34-hull-01",
    name: "Mimarine 34 · Hull 01",
    status: "delivered",
    order: 1,
    featured: false,
    subtitle: { tr: "Teslim edildi", en: "Delivered" },
    loa: v("34,0 m", "34.0 m"),
    lede: {
      tr: "Uzun mesafe seyir için tasarlanmış, dört kabinli bir tekne.",
      en: "A four-cabin vessel drawn for long-range cruising.",
    },
    body: {
      tr: [
        "Gövde, bölgenin deniz ve iklim koşulları gözetilerek boyutlandırıldı.",
        "İç mekân ve donanım müşteri talebine göre projelendirildi.",
      ],
      en: [
        "The hull was sized with the region's sea and weather in mind.",
        "Interior and outfitting were specified to the customer's brief.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("34,0 m", "34.0 m") },
      { key: specKeys.beam, value: v("7,6 m", "7.6 m") },
      { key: specKeys.draught, value: v("2,1 m", "2.1 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 1.150 hp",
        "2 × 1,150 hp",
      ) },
      { key: specKeys.fuel, value: v("18.000 L", "18,000 L") },
      { key: specKeys.guests, value: v("8 misafir · 4 mürettebat", "8 guests · 4 crew") },
      { key: specKeys.range, value: v("3.600 nm @ 10 kn", "3,600 nm @ 10 kn") },
    ],
    cover: img("1569263979104-865ab7cd8d13", "Mimarine 34 seyir hâlinde", "Mimarine 34 under way"),
    gallery: gallery(0),
  },
  {
    slug: "mimarine-28-hull-02",
    name: "Mimarine 28 · Hull 02",
    status: "delivered",
    order: 2,
    featured: false,
    subtitle: { tr: "Teslim edildi", en: "Delivered" },
    loa: v("28,4 m", "28.4 m"),
    lede: {
      tr: "Tek güverteli, armatörün kendi kullanımı için kompakt bir tekne.",
      en: "A compact single-deck vessel for owner operation.",
    },
    body: {
      tr: [
        "Mürettebat sayısı düşük tutulduğu için sistemler sadeleştirildi.",
        "Kıç platformu, günlük kullanım düşünülerek geniş tutuldu.",
      ],
      en: [
        "Systems were simplified because the vessel runs with a small crew.",
        "The aft platform was kept generous with day use in mind.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("28,4 m", "28.4 m") },
      { key: specKeys.beam, value: v("6,9 m", "6.9 m") },
      { key: specKeys.draught, value: v("1,8 m", "1.8 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 900 hp",
        "2 × 900 hp",
      ) },
      { key: specKeys.fuel, value: v("12.000 L", "12,000 L") },
      { key: specKeys.guests, value: v("6 misafir · 2 mürettebat", "6 guests · 2 crew") },
      { key: specKeys.range, value: v("3.100 nm @ 10 kn", "3,100 nm @ 10 kn") },
    ],
    cover: img("1523496922380-91d5afba98a3", "Mimarine 28 havadan", "Mimarine 28 from the air"),
    gallery: gallery(1),
  },
  {
    slug: "mimarine-42-hull-03",
    name: "Mimarine 42 · Hull 03",
    status: "delivered",
    order: 3,
    featured: false,
    subtitle: { tr: "Teslim edildi", en: "Delivered" },
    loa: v("42,0 m", "42.0 m"),
    lede: {
      tr: "Bugüne kadarki en büyük teslimatımız.",
      en: "Our largest delivery to date.",
    },
    body: {
      tr: [
        "Proje, tasarım aşamasından anahtar teslimine kadar tersane bünyesinde yürütüldü.",
        "Malzeme ve donanım seçimleri çözüm ortaklarımızla koordinasyon içinde yapıldı.",
      ],
      en: [
        "The project ran in-house from the design stage through to handover.",
        "Materials and equipment were selected in coordination with our partners.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("42,0 m", "42.0 m") },
      { key: specKeys.beam, value: v("8,4 m", "8.4 m") },
      { key: specKeys.draught, value: v("2,4 m", "2.4 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 1.450 hp",
        "2 × 1,450 hp",
      ) },
      { key: specKeys.fuel, value: v("32.000 L", "32,000 L") },
      { key: specKeys.guests, value: v("10 misafir · 6 mürettebat", "10 guests · 6 crew") },
      { key: specKeys.range, value: v("4.200 nm @ 10 kn", "4,200 nm @ 10 kn") },
    ],
    cover: img("1605281317010-fe5ffe798166", "Mimarine 42 demirde", "Mimarine 42 at anchor"),
    gallery: gallery(2),
  },
  {
    slug: "mimarine-24-hull-04",
    name: "Mimarine 24 · Hull 04",
    status: "delivered",
    order: 4,
    featured: false,
    subtitle: { tr: "Teslim edildi", en: "Delivered" },
    loa: v("24,2 m", "24.2 m"),
    lede: {
      tr: "Yaptığımız en küçük tekne ve en çok sorulan model.",
      en: "The smallest vessel we build, and the one we are asked for most often.",
    },
    body: {
      tr: [
        "Üç kabin ve kokpite açılan bir mutfak.",
        "Günlük ve haftalık kullanım için boyutlandırıldı.",
      ],
      en: [
        "Three cabins and a galley that opens to the cockpit.",
        "Sized for day and week-long use.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("24,2 m", "24.2 m") },
      { key: specKeys.beam, value: v("6,2 m", "6.2 m") },
      { key: specKeys.draught, value: v("1,6 m", "1.6 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 715 hp",
        "2 × 715 hp",
      ) },
      { key: specKeys.fuel, value: v("9.000 L", "9,000 L") },
      { key: specKeys.guests, value: v("6 misafir · 2 mürettebat", "6 guests · 2 crew") },
      { key: specKeys.range, value: v("2.400 nm @ 10 kn", "2,400 nm @ 10 kn") },
    ],
    cover: img("1562281302-809108fd533c", "Mimarine 24 rıhtımda", "Mimarine 24 alongside"),
    gallery: gallery(3),
  },
  {
    slug: "mimarine-30-hull-05",
    name: "Mimarine 30 · Hull 05",
    status: "ready-for-delivery",
    order: 1,
    featured: false,
    subtitle: { tr: "Teslime hazır", en: "Ready for delivery" },
    loa: v("30,6 m", "30.6 m"),
    lede: {
      tr: "Deniz denemeleri tamamlandı, iç mekân bitti; devir için hazır.",
      en: "Sea trials complete, interior fitted, ready for handover.",
    },
    body: {
      tr: [
        "Standart spesifikasyonla ve nötr bir palette inşa edildi.",
        "Kumaş ve donanım seçimleri bir sonraki armatöre bırakıldı.",
      ],
      en: [
        "Built to our standard specification with a neutral palette.",
        "Textile and equipment choices were left to the next owner.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("30,6 m", "30.6 m") },
      { key: specKeys.beam, value: v("7,2 m", "7.2 m") },
      { key: specKeys.draught, value: v("1,9 m", "1.9 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 1.000 hp",
        "2 × 1,000 hp",
      ) },
      { key: specKeys.fuel, value: v("15.000 L", "15,000 L") },
      { key: specKeys.guests, value: v("8 misafir · 3 mürettebat", "8 guests · 3 crew") },
      { key: specKeys.range, value: v("3.400 nm @ 10 kn", "3,400 nm @ 10 kn") },
    ],
    cover: img("1559385301-0187cb6eff46", "Mimarine 30 deniz denemesinde", "Mimarine 30 on sea trials"),
    gallery: gallery(4),
  },
  {
    slug: "mimarine-38-hull-06",
    name: "Mimarine 38 · Hull 06",
    status: "ready-for-delivery",
    order: 2,
    featured: false,
    subtitle: { tr: "Teslime hazır", en: "Ready for delivery" },
    loa: v("38,0 m", "38.0 m"),
    lede: {
      tr: "İç donanım tamamlanıyor; iki kabin hâlâ spesifikasyona açık.",
      en: "Fitting out is completing; two cabins are still open to specification.",
    },
    body: {
      tr: [
        "Üst güverte kapalı salon ya da gölgelikli teras olarak bitirilebilir.",
        "Her iki çizim de hazır tutuluyor.",
      ],
      en: [
        "The upper deck can be finished as an enclosed lounge or a shaded terrace.",
        "Both drawings are held ready.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("38,0 m", "38.0 m") },
      { key: specKeys.beam, value: v("8,0 m", "8.0 m") },
      { key: specKeys.draught, value: v("2,2 m", "2.2 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 1.300 hp",
        "2 × 1,300 hp",
      ) },
      { key: specKeys.fuel, value: v("26.000 L", "26,000 L") },
      { key: specKeys.guests, value: v("10 misafir · 5 mürettebat", "10 guests · 5 crew") },
      { key: specKeys.range, value: v("3.900 nm @ 10 kn", "3,900 nm @ 10 kn") },
    ],
    cover: img(
      "1535024966840-e7424dc2635b",
      "Mimarine 38 donatım salonunda",
      "Mimarine 38 in the fitting-out shed",
    ),
    gallery: gallery(5),
  },
  {
    slug: "mimarine-24-hull-07",
    name: "Mimarine 24 · Hull 07",
    status: "ready-for-delivery",
    order: 3,
    featured: false,
    subtitle: { tr: "Teslime hazır", en: "Ready for delivery" },
    loa: v("24,2 m", "24.2 m"),
    lede: {
      tr: "Bitmiş bir Mimarine 24; hemen müsait.",
      en: "A finished Mimarine 24, available immediately.",
    },
    body: {
      tr: [
        "Sipariş beklenmeden inşa edildi ve tamamlandı.",
        "Şu anda tersanede bağlı; önceden haber verilerek gezilebilir.",
      ],
      en: [
        "Built and completed without a contract in place.",
        "Currently berthed at the yard and available to view by arrangement.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("24,2 m", "24.2 m") },
      { key: specKeys.beam, value: v("6,2 m", "6.2 m") },
      { key: specKeys.draught, value: v("1,6 m", "1.6 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 715 hp",
        "2 × 715 hp",
      ) },
      { key: specKeys.fuel, value: v("9.000 L", "9,000 L") },
      { key: specKeys.guests, value: v("6 misafir · 2 mürettebat", "6 guests · 2 crew") },
      { key: specKeys.range, value: v("2.400 nm @ 10 kn", "2,400 nm @ 10 kn") },
    ],
    cover: img("1552160757-52790c6f4faf", "Mimarine 24 kokpit detayı", "Mimarine 24 cockpit detail"),
    gallery: gallery(6),
  },
  {
    slug: "mimarine-46-hull-08",
    name: "Mimarine 46 · Hull 08",
    status: "in-production",
    order: 1,
    featured: true,
    subtitle: { tr: "Üretimde", en: "In production" },
    loa: v("46,2 m", "46.2 m"),
    lede: {
      tr: "Bugüne kadar tezgâha koyduğumuz en büyük tekne.",
      en: "The largest vessel we have laid down to date.",
    },
    body: {
      tr: [
        "Gövde formu, uzun mesafe seyirde verimlilik gözetilerek çalışıldı.",
        "Yerleşim planı armatörle birlikte geliştirildi.",
      ],
      en: [
        "The hull form was worked for efficiency on long passages.",
        "The general arrangement was developed together with the owner.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("46,2 m", "46.2 m") },
      { key: specKeys.beam, value: v("9,1 m", "9.1 m") },
      { key: specKeys.draught, value: v("2,6 m", "2.6 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 1.600 hp",
        "2 × 1,600 hp",
      ) },
      { key: specKeys.fuel, value: v("38.000 L", "38,000 L") },
      { key: specKeys.guests, value: v("12 misafir · 7 mürettebat", "12 guests · 7 crew") },
      { key: specKeys.range, value: v("4.600 nm @ 10 kn", "4,600 nm @ 10 kn") },
    ],
    cover: img("1593351415075-3bac9f45c877", "Mimarine 46 inşa hâlinde", "Mimarine 46 in build"),
    gallery: gallery(7),
  },
  {
    slug: "mimarine-34-hull-09",
    name: "Mimarine 34 · Hull 09",
    status: "in-production",
    order: 2,
    featured: false,
    subtitle: { tr: "Üretimde", en: "In production" },
    loa: v("34,0 m", "34.0 m"),
    lede: {
      tr: "Dördüncü Mimarine 34; yıllar sonra geri dönen bir armatör için.",
      en: "The fourth Mimarine 34, for an owner returning after several years.",
    },
    body: {
      tr: [
        "Uzatılmış bir tender garajı ve sığ su çekimli bir omurga taşıyor.",
        "Yapı kapatıldı; iç donanım aşamasına geçildi.",
      ],
      en: [
        "It carries a lengthened tender garage and a shallow-draught keel.",
        "The structure is closed and it has moved into fitting out.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("34,0 m", "34.0 m") },
      { key: specKeys.beam, value: v("7,6 m", "7.6 m") },
      { key: specKeys.draught, value: v("1,95 m", "1.95 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "2 × 1.150 hp",
        "2 × 1,150 hp",
      ) },
      { key: specKeys.fuel, value: v("18.000 L", "18,000 L") },
      { key: specKeys.guests, value: v("8 misafir · 4 mürettebat", "8 guests · 4 crew") },
      { key: specKeys.range, value: v("3.600 nm @ 10 kn", "3,600 nm @ 10 kn") },
    ],
    cover: img("1598737285721-29346a5c9278", "Mimarine 34 tezgâhta", "Mimarine 34 in the shed"),
    gallery: gallery(0),
  },
  {
    slug: "mimarine-52-concept",
    name: "Mimarine 52 · Concept",
    status: "in-production",
    order: 3,
    featured: false,
    subtitle: { tr: "Tasarım aşaması", en: "Design phase" },
    loa: v("52,0 m", "52.0 m"),
    lede: {
      tr: "52 metrelik bir tasarım çalışması; ilk sipariş için açık.",
      en: "A 52-metre design study, open for a first commission.",
    },
    body: {
      tr: [
        "Tasarım aşamasında; genel yerleşim planı görüşme üzerine paylaşılıyor.",
        "Tahrik ve donanım seçimleri projeye göre belirlenecek.",
      ],
      en: [
        "At design stage; the general arrangement is shared on request.",
        "Propulsion and equipment will be specified per project.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("52,0 m", "52.0 m") },
      { key: specKeys.beam, value: v("9,8 m", "9.8 m") },
      { key: specKeys.draught, value: v("2,8 m", "2.8 m") },
      { key: specKeys.hull, value: TBC },
      { key: specKeys.engine, value: v(
        "[BELİRTİLECEK]",
        "[TO BE CONFIRMED]",
      ) },
      { key: specKeys.fuel, value: v("44.000 L", "44,000 L") },
      { key: specKeys.guests, value: v("12 misafir · 9 mürettebat", "12 guests · 9 crew") },
      { key: specKeys.range, value: v("5.000 nm @ 10 kn", "5,000 nm @ 10 kn") },
    ],
    cover: img("1567899378494-47b22a2ae96a", "Mimarine 52 konsept", "Mimarine 52 concept"),
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
        "Mühendislik ekibimiz, proje süreci ve teknik seçenekler hakkında soruları yanıtlamak üzere teknede olacak.",
      ],
      en: [
        "Viewings are by appointment through the morning; afternoons are kept open for owners and their captains.",
        "Our engineering team will be aboard to answer questions about the project process and the technical options.",
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
        "Konuklar proje yöneticileriyle tekneyi geziyor ve inşayı yürütecek ekiple tanışıyor.",
        "Kontenjan sınırlı. Kayıt bayiniz üzerinden ya da doğrudan tersaneden yapılabilir.",
      ],
      en: [
        "Guests walk the hull with the project managers and meet the team who will carry out the build.",
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
    title: { tr: "Mimarine 42 teslim edildi", en: "Mimarine 42 delivered" },
    excerpt: {
      tr: "Uzun bir inşa süresinin sonunda tekne tersaneden ayrıldı.",
      en: "After a long build, the vessel left the yard.",
    },
    body: {
      tr: [
        "Tekne, bütün teknelerimiz gibi sabahın erken saatinde sessizce ayrıldı. Armatör tören ve basın istemedi.",
        "Teslimat öncesi son denemeler tersane açıklarında tamamlandı.",
      ],
      en: [
        "She left quietly early in the morning, as all our boats do. Her owner asked for no ceremony and no press.",
        "Final trials before handover were completed off the yard.",
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
    slug: "yard-workshop",
    date: inDays(-420),
    location: { tr: "[TESİS ŞEHRİ]", en: "[FACILITY CITY]" },
    title: {
      tr: "Atölye kapasitesi genişletildi",
      en: "Workshop capacity expanded",
    },
    excerpt: {
      tr: "İnşa alanındaki çalışma kapasitesi artırıldı.",
      en: "Working capacity in the build area has been increased.",
    },
    body: {
      tr: [
        "Düzenleme üretimi durdurmadan, hafta hafta ilerledi.",
        "[BU HABERİN GERÇEK METNİ CLIENT TARAFINDAN VERİLECEK.]",
      ],
      en: [
        "The work went ahead week by week without stopping production.",
        "[REAL COPY FOR THIS ITEM TO BE SUPPLIED BY THE CLIENT.]",
      ],
    },
    cover: img("1561702469-c4239ced3f47", "Tersane atölyesi", "The yard workshop"),
  },
];

/**
 * The dealer and service network is not built yet. An empty list is the honest
 * state — the network page shows a recruitment call to action instead of
 * fabricated representatives.
 */
export const dealers: Dealer[] = [];

/** PLACEHOLDER offices. */
export const offices: Office[] = [
  {
    id: "hq",
    role: { tr: "Merkez · Tersane", en: "Headquarters · Yard" },
    city: "Of / Trabzon",
    addressLines: ["Alparslan Türkeş Bulvarı No: 200", "Kıyıcık, 61830 Of / Trabzon"],
    phone: "+90 505 817 07 88",
    email: "mimarineyacht@outlook.com",
    // Derived from the plus code the client supplied, and confirmed by them.
    coordinates: { lat: 40.968312, lng: 40.305812 },
  },
];

export const home: HomeContent = {
  heroImage: img(
    "1528154291023-a6525fabe5b4",
    "Sakin suda demirlemiş yat",
    "A yacht at anchor on calm water",
  ),
  heroEyebrow: { tr: "Of · Trabzon · Türkiye", en: "Of · Trabzon · Türkiye" },
  heroTitle: {
    tr: "Köklü gemi inşa kültürü, modern mühendislik.",
    en: "A long shipbuilding tradition, modern engineering.",
  },
  statement: {
    tr: "Doğu Karadeniz'in köklü gemi inşa kültürünü modern mühendislik yaklaşımlarıyla birleştiriyor, müşteri taleplerine göre özelleştirilmiş tekne ve gemi projeleri üretiyoruz.",
    en: "We combine the Eastern Black Sea's long shipbuilding tradition with modern engineering, building vessels tailored to each customer's requirements.",
  },
  statementBody: {
    tr: "Balıkçı gemileri, ticari iş tekneleri ve konfor odaklı özel yatların tasarım ve inşasında uzmanlaştık. Üretim, tasarım aşamasından anahtar teslimine kadar kendi bünyemizde ve çözüm ortaklarımızla koordinasyon içinde yürütülüyor.",
    en: "We specialise in the design and construction of fishing vessels, commercial work boats and comfort-focused private yachts. Production runs in-house and in coordination with our partners, from design through to handover.",
  },
  figures: [
    {
      value: "2021",
      label: { tr: "Kuruluş", en: "Founded" },
      note: {
        tr: "Trabzon'un Of ilçesinde kuruldu; tersane Kıyıcık'taki sahil alanında.",
        en: "Founded in the Of district of Trabzon; the yard sits on the shore at Kıyıcık.",
      },
    },
    {
      value: "3",
      label: { tr: "Uzmanlık alanı", en: "Areas of expertise" },
      note: {
        tr: "Balıkçı gemileri, ticari iş tekneleri ve konfor odaklı özel yatlar.",
        en: "Fishing vessels, commercial work boats and comfort-focused private yachts.",
      },
    },
    {
      value: "[00]",
      label: { tr: "[RAKAM BAŞLIĞI]", en: "[FIGURE LABEL]" },
      note: {
        tr: "Üçüncü rakam client tarafından verilecek — örn. teslim edilen tekne sayısı ya da yerlilik oranı.",
        en: "The third figure is still to be supplied — e.g. vessels delivered, or domestic content share.",
      },
    },
  ],
  tiles: [
    {
      href: "/our-world",
      kicker: { tr: "Dünyamız", en: "Our world" },
      title: { tr: "Gövde mühendisliği", en: "Hull engineering" },
      body: {
        tr: "Karadeniz'in zorlu deniz ve iklim koşullarına uygun gövde yaklaşımı.",
        en: "A hull approach suited to the Black Sea's demanding sea and weather.",
      },
      image: img(
        "1785038481404-4bd44c535e81",
        "Tersanede tekne inşası",
        "Building a hull at the yard",
      ),
    },
    {
      href: "/our-world",
      kicker: { tr: "Dünyamız", en: "Our world" },
      title: { tr: "Yerel üretim", en: "Local production" },
      body: {
        tr: "Yerel iş gücü ve bölgesel yan sanayi ile yüksek yerlilik oranı.",
        en: "Local labour and regional suppliers, for a high domestic content ratio.",
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
    tr: "Projenizi konuşalım — tasarımdan anahtar teslimine.",
    en: "Let us talk about your project — from design through to handover.",
  },
};

export const ourWorld: OurWorldContent = {
  title: {
    tr: "Karadeniz kıyısında bir tersane.",
    en: "A yard on the Black Sea coast.",
  },
  heroImage: img(
    "1785038481404-4bd44c535e81",
    "Tersanede tekne inşası",
    "Building a hull at the yard",
  ),
  statement: {
    tr: "2021'de Trabzon'un Of ilçesinde kurulduk. Gemi inşası, deniz mimarisi ve mühendislik hizmetleri alanlarında faaliyet gösteriyoruz.",
    en: "We were founded in 2021 in the Of district of Trabzon, working in shipbuilding, naval architecture and engineering services.",
  },
  statementBody: {
    tr: "Tersane Kıyıcık bölgesindeki sahil alanında konumlanıyor. Hem yerel hem uluslararası pazara yönelik, sağlamlık ve operasyonel verimlilik odaklı projeler üzerinde çalışıyoruz.",
    en: "The yard is located on the shore at Kıyıcık. We work on projects for both local and international markets, focused on durability and operational efficiency.",
  },
  pillars: [
    {
      id: "sustainability",
      kicker: "01",
      title: { tr: "Gövde mühendisliği", en: "Hull engineering" },
      body: {
        tr: "Karadeniz'in zorlu deniz ve iklim koşullarına uygun gövde mühendisliği, üretim anlayışımızın temel unsurlarından biri.",
        en: "Hull engineering suited to the Black Sea's demanding sea and climate is a cornerstone of how we build.",
      },
      image: img("1772550834175-734b417deb42", "Karada bekleyen tekne", "A hull on the hard"),
      href: "/news-and-events/yard-workshop",
    },
    {
      id: "craft",
      kicker: "02",
      title: { tr: "Tasarımdan anahtar teslimine", en: "Design to handover" },
      body: {
        tr: "Üretim süreci, tasarım aşamasından anahtar teslimine kadar kendi bünyemizde ve çözüm ortaklarımızla koordinasyon içinde yürütülüyor.",
        en: "Production runs from the design stage through to handover, in-house and in coordination with our partners.",
      },
      image: img("1631396326646-c06a935ff3a6", "Atölyede marangoz", "Joiner at the bench"),
    },
    {
      id: "history",
      kicker: "03",
      title: { tr: "Yerlilik", en: "Domestic content" },
      body: {
        tr: "Yerel iş gücünü ve bölgesel yan sanayi imkânlarını kullanarak yüksek yerlilik oranına sahip projeler geliştiriyoruz.",
        en: "We draw on local labour and regional suppliers to develop projects with a high domestic content ratio.",
      },
      image: img("1509295433237-4b4851f2ab67", "Arşiv görüntüsü", "Archive photograph"),
    },
  ],
  commitments: [
    {
      no: "01",
      title: { tr: "Müşteriye özel projeler", en: "Projects built to order" },
      body: {
        tr: "Tekne ve gemi projeleri müşteri taleplerine göre özelleştirilerek üretilir.",
        en: "Vessels are built to each customer's own requirements.",
      },
    },
    {
      no: "02",
      title: { tr: "Karadeniz koşullarına göre gövde", en: "Hulls for Black Sea conditions" },
      body: {
        tr: "Bölgenin zorlu deniz ve iklim koşullarına uygun gövde mühendisliği yaklaşımı.",
        en: "A hull engineering approach matched to the region's demanding sea and climate.",
      },
    },
    {
      no: "03",
      title: { tr: "Yüksek yerlilik oranı", en: "High domestic content" },
      body: {
        tr: "Yerel iş gücü ve bölgesel yan sanayi imkânlarıyla geliştirilen projeler.",
        en: "Projects developed with local labour and regional suppliers.",
      },
    },
    {
      no: "04",
      title: { tr: "Sağlamlık ve verimlilik", en: "Durability and efficiency" },
      body: {
        tr: "Hem yerel hem uluslararası pazara yönelik, sağlamlık ve operasyonel verimlilik odaklı üretim.",
        en: "Production aimed at both local and international markets, focused on durability and operational efficiency.",
      },
    },
  ],
};

/** PLACEHOLDER maps — replaced by a live Mapbox map once a token exists. */
export const maps: MapImages = {
  network: img("1478860409698-8707f313ee8b", "Deniz haritası", "Nautical chart"),
  contact: img("1532154066703-3973764c81fe", "Deniz haritası detayı", "Nautical chart detail"),
};
