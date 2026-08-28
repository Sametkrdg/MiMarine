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
const STEEL = v("Çelik", "Steel");

export const yachts: Yacht[] = [
  {
    slug: "cihangir-s",
    name: "Cihangir S",
    status: "delivered",
    order: 1,
    featured: false,
    subtitle: { tr: "Motoryat · 13 m", en: "Motor yacht · 13 m" },
    loa: v("13 m", "13 m"),
    lede: {
      tr: "Üstlendiğimiz motoryat projelerinden biri; kompakt boyutta konfor odaklı bir tekne.",
      en: "One of the motor yacht projects we have undertaken — a compact hull built around comfort.",
    },
    body: {
      tr: [
        "Karadeniz'in tavizsiz gövde mühendisliğini, Avrupa klasmanındaki sofistike görünüm ve konforla birleştiren tasarım anlayışımızın örneklerinden biri.",
        "Üretim süreci, tasarım aşamasından anahtar teslimine kadar kendi bünyemizde ve çözüm ortaklarımızla koordinasyon içinde yürütüldü.",
      ],
      en: [
        "An example of our approach: the Black Sea's uncompromising hull engineering combined with European-class refinement and comfort.",
        "The project ran in-house from design through to handover, in coordination with our partners.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("13 m", "13 m") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.beam, value: TBC },
      { key: specKeys.draught, value: TBC },
      { key: specKeys.engine, value: TBC },
      { key: specKeys.fuel, value: TBC },
      { key: specKeys.guests, value: TBC },
      { key: specKeys.range, value: TBC },
    ],
    cover: img("1569263979104-865ab7cd8d13", "Cihangir S", "Cihangir S"),
    gallery: gallery(0),
  },
  {
    slug: "zenday",
    name: "Zenday",
    status: "delivered",
    order: 2,
    featured: false,
    subtitle: { tr: "Motoryat · 22 m", en: "Motor yacht · 22 m" },
    loa: v("22 m", "22 m"),
    lede: {
      tr: "Üstlendiğimiz motoryat projelerinden biri; zarif çizgileri üst düzey mühendislikle buluşturuyor.",
      en: "One of the motor yacht projects we have undertaken, pairing elegant lines with serious engineering.",
    },
    body: {
      tr: [
        "Estetik, zarif ve minimal çizgilerin üst düzey mühendislikle hayat bulduğu bir proje.",
        "Yerel iş gücümüzün ustalığı ile küresel standartların zarafeti bir arada.",
      ],
      en: [
        "A project where restrained, elegant lines meet serious engineering.",
        "The craft of our local workforce alongside the refinement of global standards.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("22 m", "22 m") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.beam, value: TBC },
      { key: specKeys.draught, value: TBC },
      { key: specKeys.engine, value: TBC },
      { key: specKeys.fuel, value: TBC },
      { key: specKeys.guests, value: TBC },
      { key: specKeys.range, value: TBC },
    ],
    cover: img("1605281317010-fe5ffe798166", "Zenday", "Zenday"),
    gallery: gallery(2),
  },
  {
    slug: "ktu-35-feet",
    name: "KTÜ 35 FEET",
    status: "in-production",
    order: 1,
    featured: false,
    subtitle: { tr: "Explorer · 35 feet", en: "Explorer · 35 feet" },
    loa: v("35 feet", "35 feet"),
    lede: {
      tr: "Pazarın yeni gözdelerinden biri olacak özel motoryat projelerimizden.",
      en: "One of the custom motor yacht projects we expect to become a market favourite.",
    },
    body: {
      tr: [
        "Zorlu deniz ve iklim koşullarına uygun üretim anlayışımızla, kompakt boyutta uzun seyre elverişli bir tekne olarak kurgulandı.",
        "Detaylar netleştikçe bu sayfa güncellenecek.",
      ],
      en: [
        "Conceived as a compact hull suited to long passages, built to our approach for demanding sea and weather.",
        "This page will be updated as the details are settled.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("35 feet", "35 feet") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.beam, value: TBC },
      { key: specKeys.draught, value: TBC },
      { key: specKeys.engine, value: TBC },
      { key: specKeys.fuel, value: TBC },
      { key: specKeys.guests, value: TBC },
      { key: specKeys.range, value: TBC },
    ],
    cover: img("1559385301-0187cb6eff46", "KTÜ 35 FEET", "KTU 35 FEET"),
    gallery: gallery(4),
  },
  {
    slug: "pttra-42-5m",
    name: "PTTRA 42.5m",
    status: "in-production",
    order: 2,
    featured: true,
    subtitle: { tr: "Süperyat · 42,5 m", en: "Superyacht · 42.5 m" },
    loa: v("42,5 m", "42.5 m"),
    lede: {
      tr: "Görkemli süperyat projemiz; mühendislik ve sanatın kusursuz dengede buluştuğu bir çalışma.",
      en: "Our flagship superyacht project, where engineering and craft meet in balance.",
    },
    body: {
      tr: [
        "Avrupa klasmanındaki mühendislik ve tasarım vizyonumuzu estetik, zarif ve minimal bir çizgide denizlere yansıtan en büyük projemiz.",
        "Her detayın kişiye özel işlendiği terzi usulü yaklaşımımızla yürütülüyor.",
      ],
      en: [
        "Our largest project, carrying our European-class engineering and design vision to sea in a restrained, elegant line.",
        "Run in our bespoke way, with every detail worked to the owner's brief.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("42,5 m", "42.5 m") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.beam, value: TBC },
      { key: specKeys.draught, value: TBC },
      { key: specKeys.engine, value: TBC },
      { key: specKeys.fuel, value: TBC },
      { key: specKeys.guests, value: TBC },
      { key: specKeys.range, value: TBC },
    ],
    cover: img("1593351415075-3bac9f45c877", "PTTRA 42.5m", "PTTRA 42.5m"),
    gallery: gallery(6),
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
    tr: "Köklerden gelen güç, geleceğe uzanan zarafet.",
    en: "Strength from our roots, elegance for what comes next.",
  },
  statement: {
    tr: "2021'de Trabzon'un Of ilçesinde doğduk. Doğu Karadeniz'in yüzyıllara dayanan denizcilik mirasını modern mühendislik yaklaşımlarıyla harmanlıyor, dayanıklılığı ve estetiği tek bir gövdede buluşturuyoruz.",
    en: "We began in 2021 in the Of district of Trabzon, blending the Eastern Black Sea's centuries-old maritime heritage with modern engineering — durability and beauty in a single hull.",
  },
  statementBody: {
    tr: "Kıyıcık sahilindeki tersanemizde başlayan yolculuğumuz, balıkçı gemilerinden ticari teknelere uzanan tecrübemizi bugün konfor odaklı, prestijli özel yatların inşasına taşıyor. Çelik gövde mühendisliğindeki uzmanlığımız sayesinde üretilen her tekneye kendine özgü mühendislik imzasını atıyoruz.",
    en: "The journey that began at our yard on the Kıyıcık shore carries our experience — from fishing vessels to commercial boats — into the building of comfort-focused private yachts. Our expertise in steel hull engineering puts a distinct engineering signature on every vessel we build.",
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
      value: "%20-50",
      label: { tr: "Yatırım avantajı", en: "Investment advantage" },
      note: {
        tr: "Operasyonel verimlilik ve üretim optimizasyonu sayesinde, genel küresel segment ortalamalarına kıyasla sağlanan stratejik maliyet avantajı.",
        en: "A strategic cost advantage against global segment averages, from operational efficiency and production optimisation.",
      },
    },
    {
      value: "4",
      label: { tr: "Devam eden proje", en: "Projects under way" },
      note: {
        tr: "Cihangir S, Zenday, KTÜ 35 FEET ve PTTRA 42.5m.",
        en: "Cihangir S, Zenday, KTU 35 FEET and PTTRA 42.5m.",
      },
    },
  ],
  tiles: [
    {
      href: "/our-world",
      kicker: { tr: "Dünyamız", en: "Our world" },
      title: { tr: "Çelik gövde mühendisliği", en: "Steel hull engineering" },
      body: {
        tr: "Zorlu iklim koşullarına uygun üretim anlayışı ve tavizsiz gövde mühendisliği.",
        en: "Uncompromising hull engineering, built for demanding conditions.",
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
      title: { tr: "Terzi usulü", en: "Bespoke" },
      body: {
        tr: "Seri üretimin ötesinde, her detayın kişiye özel işlendiği bir deniz mimari atölyesi.",
        en: "Beyond series production: a naval architecture atelier where every detail is worked to order.",
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
    tr: "Hayalinizdeki yatın ilk çizgilerini birlikte çekelim.",
    en: "Let us draw the first lines of your yacht together.",
  },
};

export const ourWorld: OurWorldContent = {
  title: {
    tr: "Sınırların ötesinde bir vizyon.",
    en: "A vision beyond the horizon.",
  },
  heroImage: img(
    "1785038481404-4bd44c535e81",
    "Tersanede tekne inşası",
    "Building a hull at the yard",
  ),
  statement: {
    tr: "MimarineYacht dünyası, seri üretimin ötesinde, her detayın kişiye özel işlendiği zarif bir terzi usulü deniz mimari atölyesi felsefesiyle şekillenir.",
    en: "The MimarineYacht world is shaped by a single idea: beyond series production, a bespoke naval architecture atelier where every detail is worked to order.",
  },
  statementBody: {
    tr: "PTTRA 42.5m gibi görkemli süperyat projelerimizden, Cihangir S ve Zenday gibi zarif motoryat modellerimize uzanan vizyonumuzla, hayallerinizdeki yaşam alanını suyun üzerine taşıyoruz. Mühendislik ve sanatın kusursuz dengede buluştuğu bu dünyada, yerel iş gücümüzün ustalığı ile küresel standartların zarafetini bir araya getiriyoruz.",
    en: "From superyacht projects such as PTTRA 42.5m to elegant motor yachts like Cihangir S and Zenday, we carry the living space you imagine onto the water — the craft of our local workforce alongside the refinement of global standards.",
  },
  pillars: [
    {
      id: "sustainability",
      kicker: "01",
      title: { tr: "Avrupa klasmanında estetik", en: "European-class design" },
      body: {
        tr: "Tasarımlarımız, Avrupa klasmanındaki sofistike görünümü ve konforu, Karadeniz'in tavizsiz çelik gövde mühendisliğiyle birleştirir.",
        en: "Our designs pair European-class refinement and comfort with the Black Sea's uncompromising steel hull engineering.",
      },
      image: img("1772550834175-734b417deb42", "Karada bekleyen tekne", "A hull on the hard"),
      href: "/news-and-events/yard-workshop",
    },
    {
      id: "craft",
      kicker: "02",
      title: { tr: "Stratejik yatırım avantajı", en: "A strategic investment case" },
      body: {
        tr: "Operasyonel verimliliğe odaklanan yapımız sayesinde, küresel segment ortalamalarına kıyasla %20 ila %50 maliyet avantajı sağlıyoruz.",
        en: "Our focus on operational efficiency delivers a 20-50% cost advantage against global segment averages.",
      },
      image: img("1631396326646-c06a935ff3a6", "Atölyede marangoz", "Joiner at the bench"),
    },
    {
      id: "history",
      kicker: "03",
      title: { tr: "Yüksek yerlilik oranı", en: "High domestic content" },
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
      title: { tr: "Terzi usulü yaklaşım", en: "A bespoke approach" },
      body: {
        tr: "Her donanım kişiliğinize, her detay beklentilerinize göre özenle dokunur.",
        en: "Every fitting to your character, every detail to your expectations.",
      },
    },
    {
      no: "02",
      title: { tr: "Çelik gövde mühendisliği", en: "Steel hull engineering" },
      body: {
        tr: "Zorlu denizlerin ve hırçın iklimlerin öğrettiği dayanıklılık, estetik ve zarafetle bir arada.",
        en: "The durability taught by hard seas and harsh weather, together with elegance.",
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
      title: { tr: "Tasarımdan anahtar teslimine", en: "Design to handover" },
      body: {
        tr: "Her süreç, çözüm ortaklarımızla kusursuz bir koordinasyon içinde kendi bünyemizde yürütülür.",
        en: "Every stage runs in-house, in close coordination with our partners.",
      },
    },
  ],
};

/** PLACEHOLDER maps — replaced by a live Mapbox map once a token exists. */
export const maps: MapImages = {
  network: img("1478860409698-8707f313ee8b", "Deniz haritası", "Nautical chart"),
  contact: img("1532154066703-3973764c81fe", "Deniz haritası detayı", "Nautical chart detail"),
};
