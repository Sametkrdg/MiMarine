/**
 * Site content, pending Sanity.
 *
 * The accessors in `index.ts` read from here until a content type has its first
 * Sanity record; then that type switches over entirely. In phase 2 this file
 * goes away.
 *
 * ── What in here is real ─────────────────────────────────────────────────
 *
 *   • The four yachts. Copy, specifications and photographs all come from the
 *     client's own presentation documents and photo set in `mimarine/`. The
 *     KTÜ 35 FEET images are design renders and their alt text says so.
 *   • The company statement, figures and Our World copy, from the same brief.
 *   • The office address, telephone, e-mail and coordinates.
 *
 * ── What is still placeholder ────────────────────────────────────────────
 *
 *   • Every news item and event below. Dates are computed from build time so
 *     the Upcoming / Past split stays demonstrable; the covers are Unsplash.
 *     Nothing here describes a real event.
 *   • The dealer list, which is deliberately empty — see the note above it.
 *   • The map placeholder images.
 *
 * Rules this file still follows: no invented phone number, e-mail or address;
 * no third-party dealer or partner named; no specification figure written that
 * the client has not supplied.
 *
 * See MANUEL.md for what is still outstanding.
 */

import type {
  BespokeContent,
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

/**
 * A photograph the client supplied, served from `public/media`.
 *
 * The originals live in `mimarine/` and are turned into these web-sized,
 * EXIF-stripped JPEGs by `scripts/build-media.js` — several were phone photos
 * that carried GPS coordinates until that script dropped them.
 */
function local(file: string, tr: string, en: string): SiteImage {
  return { src: `/media/${file}`, alt: { tr, en } };
}

/**
 * Specification field set.
 *
 * Every label a hull can carry. Each yacht lists only the rows the client has
 * actually given a figure for — a 10-metre day boat has no displacement or
 * class notation, and printing an empty row for one would say less than
 * leaving it out. Order within a hull's `specs` array is the order shown.
 */
const specKeys = {
  year: { tr: "Yapım yılı", en: "Year built" },
  design: { tr: "Tasarım kategorisi", en: "Design category" },
  hull: { tr: "Gövde malzemesi", en: "Hull material" },
  loa: { tr: "Tam boy", en: "Length overall" },
  lwl: { tr: "Su hattı boyu", en: "Waterline length" },
  beam: { tr: "Genişlik", en: "Beam" },
  depth: { tr: "Derinlik", en: "Depth" },
  draught: { tr: "Su çekimi", en: "Draught" },
  displacement: { tr: "Deplasman", en: "Displacement" },
  classification: { tr: "Klaslama", en: "Classification" },
  engine: { tr: "Motor", en: "Engine" },
  engineHours: { tr: "Motor saati", en: "Engine hours" },
  generators: { tr: "Jeneratör", en: "Generators" },
  speed: { tr: "Hız", en: "Speed" },
  range: { tr: "Menzil", en: "Range" },
  fuel: { tr: "Yakıt kapasitesi", en: "Fuel capacity" },
  water: { tr: "Su kapasitesi", en: "Water capacity" },
  cabins: { tr: "Kamara", en: "Cabins" },
  heads: { tr: "Banyo / tuvalet", en: "Bathrooms / heads" },
  capacity: { tr: "Kapasite", en: "Capacity" },
  flag: { tr: "Bayrak", en: "Flag" },
};

/** A spec value, localised — Turkish and English differ on decimal separators. */
function v(tr: string, en: string): L10n {
  return { tr, en };
}

const STEEL = v("Çelik", "Steel");

export const yachts: Yacht[] = [
  {
    slug: "zenday",
    name: "Zenday",
    statuses: ["delivered"],
    order: 1,
    featured: false,
    subtitle: { tr: "Motoryat · 22,05 m", en: "Motor yacht · 22.05 m" },
    loa: v("22,05 m", "22.05 m"),
    lede: {
      tr: "2026'da tezgahlarımızdan suya inen 22 metrelik motoryat: çelik gövdenin sertliğiyle iç mekânın zarafetini aynı teknede buluşturuyor.",
      en: "A 22-metre motor yacht launched from our sheds in 2026, holding the hardness of a steel hull and the refinement of its interior in the same boat.",
    },
    body: {
      tr: [
        "Zenday'in omurgasında tersanemizin ticari gemi inşasından gelen kökleri yatar. Tamamen çelikten inşa edilen gövde en zorlu deniz koşullarına dayanacak şekilde kurgulanırken, iç mekân tasarımında bu sertlik yerini ince düşünülmüş bir zarafete bırakır.",
        "50 kişilik kapasiteye olanak tanıyan gövde hacmi, panoramik manzaraya hâkim flybridge alanı ve uzun seyirler için dört lüks kamara; ustalarımızın ahşap, çelik ve kompozit üzerindeki hâkimiyetini bir arada gösterir.",
        "Çift 450 HP Shanghai Diesel motorlar, bu ağırbaşlı zarafeti açık denizde kesintisiz bir güce dönüştürür.",
      ],
      en: [
        "Zenday's keel carries the yard's roots in commercial shipbuilding. The hull is steel throughout, built to stand the hardest weather; inside, that hardness gives way to a considered refinement.",
        "Volume enough for fifty guests, a flybridge open to the whole panorama, and four cabins for long passages — the timber, steel and composite work of our craftsmen in one boat.",
        "Twin 450 HP Shanghai Diesel engines turn that composure into uninterrupted power offshore.",
      ],
    },
    specs: [
      { key: specKeys.year, value: v("2026", "2026") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.loa, value: v("22,05 m", "22.05 m") },
      { key: specKeys.beam, value: v("6,00 m", "6.00 m") },
      { key: specKeys.depth, value: v("3,20 m", "3.20 m") },
      { key: specKeys.engine, value: v("2 x 450 HP Shanghai Diesel", "2 x 450 HP Shanghai Diesel") },
      { key: specKeys.speed, value: v("11 knot seyir · 14 knot maks.", "11 kn cruise · 14 kn max") },
      { key: specKeys.cabins, value: v("4 lüks kamara", "4 luxury cabins") },
      { key: specKeys.capacity, value: v("50 kişi", "50 guests") },
    ],
    cover: local("fleet/zenday/stern-dusk.jpg", "Zenday, akşamüstü Boğaz'da", "Zenday on the Bosphorus at dusk"),
    gallery: [
      local("fleet/zenday/bow.jpg", "Zenday, baş omuzluktan", "Zenday from the bow quarter"),
      local("fleet/zenday/saloon.jpg", "Ana salon, davet düzeninde", "The main saloon laid for a function"),
      local("fleet/zenday/aft-deck.jpg", "Kıç güverte ve iniş merdiveni", "The aft deck and boarding steps"),
      local("fleet/zenday/corridor.jpg", "Kamara koridoru", "The cabin corridor"),
      local("fleet/zenday/profile.jpg", "Boğaz'da yan görünüm", "Profile on the Bosphorus"),
      local("fleet/zenday/overhead.jpg", "Gece seyri, yukarıdan", "Under way at night, from above"),
    ],
  },
  {
    slug: "ktu-61-feet",
    name: "KTÜ 61 FEET",
    statuses: ["delivered", "ready-for-delivery", "in-production"],
    order: 4,
    featured: false,
    subtitle: { tr: "Davet teknesi · 19,50 m", en: "Event vessel · 19.50 m" },
    loa: v("19,50 m", "19.50 m"),
    lede: {
      tr: "2026'da denize indirilen 19,5 metrelik çelik tekne: özel etkinlikler, butik turlar ve kurumsal davetler için tasarlanmış yüzer bir yaşam alanı.",
      en: "A 19.5-metre steel vessel launched in 2026: a floating venue drawn for private events, boutique tours and corporate hospitality.",
    },
    body: {
      tr: [
        "19,50 metrelik tam boyu ve 5,60 metrelik geniş gövdesiyle KTÜ 61 FEET sularda sarsılmaz bir duruş sergiler. Gövdede kullanılan yüksek kalite çelik, zorlu deniz koşullarında maksimum stabilite ve uzun yıllar sürecek ticari operasyon güvencesi sağlar.",
        "Geniş yan yürüme yolları, ahşap küpeşte detayları ve ferah güverte alanları estetikle fonksiyonelliği bir araya getiriyor. Panoramik manzaraya açılan Fly Bridge ile 50 kişilik davetlerde kesintisiz servis verebilen tam donanımlı mutfak, teknenin sosyal omurgasını kuruyor.",
        "50 yolcu kapasiteli güverte yerleşimi, iki kamaralı iç hacim ve Fly Bridge mimarisi sabit kalmak koşuluyla; zemin kaplamalarından oturma gruplarındaki kumaşlara, aydınlatma armatürlerinden ahşap tonlarına kadar iç mimariyi işletme kimliğinize göre şekillendiriyoruz.",
      ],
      en: [
        "At 19.50 metres overall on a 5.60-metre beam, KTU 61 FEET holds herself steady. The high-grade steel of the hull gives maximum stability in hard conditions and the assurance of years of commercial service.",
        "Wide side decks, timber capping rails and generous deck areas put looks and function together. A flybridge open to the whole panorama and a galley equipped to serve fifty guests without a break form the vessel's social spine.",
        "The fifty-passenger deck layout, two-cabin interior and flybridge architecture stay fixed; everything else — floor finishes, upholstery, light fittings, timber tones — is shaped to your operation's identity.",
      ],
    },
    specs: [
      { key: specKeys.year, value: v("2026", "2026") },
      { key: specKeys.design, value: v("Özel tasarım", "Custom") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.loa, value: v("19,50 m", "19.50 m") },
      { key: specKeys.beam, value: v("5,60 m", "5.60 m") },
      { key: specKeys.depth, value: v("3,00 m", "3.00 m") },
      { key: specKeys.engine, value: v("2 x 250 HP Cummins", "2 x 250 HP Cummins") },
      { key: specKeys.speed, value: v("11 knot servis · 14 knot maks.", "11 kn service · 14 kn max") },
      { key: specKeys.cabins, value: v("2 kamara", "2 cabins") },
      { key: specKeys.heads, value: v("2 banyo · 2 tuvalet", "2 bathrooms · 2 heads") },
      { key: specKeys.capacity, value: v("50 yolcu", "50 passengers") },
    ],
    cover: local("fleet/ktu-61-feet/profile.jpg", "KTÜ 61 FEET, yandan — tasarım görseli", "KTU 61 FEET in profile — design render"),
    gallery: [
      local("fleet/ktu-61-feet/quarter.jpg", "Kıç omuzluk ve üst güverte — tasarım görseli", "The quarter and upper deck — design render"),
      local("fleet/ktu-61-feet/stern.jpg", "Kıçtan görünüm ve iniş platformu — tasarım görseli", "From astern, with the boarding platform — design render"),
      local("fleet/ktu-61-feet/yard.jpg", "Tersanede, üst yapı montajı sırasında", "At the yard during superstructure assembly"),
    ],
  },
  {
    slug: "cihangir-s",
    name: "Cihangir S",
    statuses: ["ready-for-delivery", "in-production"],
    order: 2,
    featured: false,
    subtitle: { tr: "Motoryat · 13 m", en: "Motor yacht · 13 m" },
    loa: v("13,00 m", "13.00 m"),
    lede: {
      tr: "Tersanemizde üretimi tamamlanmış, teslime hazır özel yapım bir motoryat: 13 metrede 5 metrelik sıra dışı bir genişlik.",
      en: "A bespoke motor yacht, finished at our yard and ready for delivery — an unusual five metres of beam on a thirteen-metre hull.",
    },
    body: {
      tr: [
        "Cihangir S, seri üretimin kalıplarından uzak, tamamen özgün hatlarla ve yüksek mukavemetli çelik gövdeyle tasarlandı. Zorlu denizlerin ve hırçın iklimlerin öğrettiği dayanıklılık ilkesi, burada terzi usulü bir motoryata dönüşüyor.",
        "5,00 metrelik geniş gövde mimarisi sınıfının çok üzerinde bir iç hacim sağlıyor: iki müstakil lüks kamara, iki banyo ve üç tuvalet düzeniyle 12 kişiye kadar misafir ağırlanabiliyor. Panoramik flybridge ve geniş kıç güverte, açık denizde sosyalleşme alanı yaratıyor.",
        "Çift Cummins makine altyapısı 11 knot servis, 14 knot maksimum hız veriyor — dengeli, ekonomik ve güvenli bir seyir karakteri.",
      ],
      en: [
        "Cihangir S was drawn away from the moulds of series production: original lines throughout, on a high-tensile steel hull. The durability that hard seas and harsh weather teach, turned here into a bespoke motor yacht.",
        "Five metres of beam give her far more volume than her class suggests — two separate cabins, two bathrooms and three heads, with room for up to twelve guests. The panoramic flybridge and wide aft deck open the boat up offshore.",
        "Twin Cummins engines give 11 knots in service and 14 at maximum: a balanced, economical and safe passage character.",
      ],
    },
    specs: [
      { key: specKeys.year, value: v("2026", "2026") },
      { key: specKeys.design, value: v("Özel tasarım", "Custom") },
      { key: specKeys.hull, value: STEEL },
      { key: specKeys.loa, value: v("13,00 m", "13.00 m") },
      { key: specKeys.beam, value: v("5,00 m", "5.00 m") },
      { key: specKeys.depth, value: v("3,00 m", "3.00 m") },
      { key: specKeys.engine, value: v("2 x 200 HP Cummins", "2 x 200 HP Cummins") },
      { key: specKeys.engineHours, value: v("0 saat", "0 hours") },
      { key: specKeys.speed, value: v("11 knot seyir · 14 knot maks.", "11 kn cruise · 14 kn max") },
      { key: specKeys.cabins, value: v("2 lüks kamara", "2 luxury cabins") },
      { key: specKeys.heads, value: v("2 banyo · 3 tuvalet", "2 bathrooms · 3 heads") },
      { key: specKeys.capacity, value: v("12 kişi", "12 guests") },
      { key: specKeys.flag, value: v("T.C.", "Türkiye") },
    ],
    cover: local("fleet/cihangir-s/bow.jpg", "Cihangir S, baştan görünüm", "Cihangir S from ahead"),
    gallery: [
      local("fleet/cihangir-s/aft.jpg", "Kıç güverte ve flybridge", "The aft deck and flybridge"),
      local("fleet/cihangir-s/yard-aerial.jpg", "Tersane sahasında, teslim öncesi", "On the hard at the yard, before delivery"),
      local("fleet/cihangir-s/yard-profile.jpg", "Karada yan görünüm", "Profile on the hard"),
      local("fleet/cihangir-s/yard-bow.jpg", "Atölye önünde", "Outside the workshop"),
    ],
  },
  {
    slug: "ktu-35-feet",
    name: "KTÜ 35 FEET",
    statuses: ["ready-for-delivery", "in-production"],
    order: 6,
    featured: false,
    subtitle: { tr: "Gezi teknesi · 10,65 m", en: "Cruiser · 10.65 m" },
    loa: v("10,65 m", "10.65 m"),
    lede: {
      tr: "Zamansız bir siluet ve tek kamaralı sade bir yerleşim: gün boyu seyir için tasarlanmış, iç mekânı kişiselleştirilebilen bir gezi teknesi.",
      en: "A timeless silhouette and a single-cabin layout: a cruiser drawn for a day under way, with an interior you specify yourself.",
    },
    body: {
      tr: [
        "Geleneksel denizcilik mirasının ikonik hatlarını günümüzün minimalist lüks anlayışıyla birleştiren bir gövde mimarisi. Geniş cam yüzeyler içeriye maksimum doğal ışık sağlarken, ahşap güverte kaplamaları her adımda premium bir dokunuş bırakıyor.",
        "10 kişiye kadar misafir ağırlayan kokpit ve güverte tasarımı sosyalleşmek için ferah alanlar sunuyor; tam donanımlı tek kamara ise gün boyu süren seyirlerin ardından dinlenme imkânı veriyor. Paslanmaz çelik vardevelalar, tutamaklar ve kaymaz güverte yüzeyleri estetikten ödün vermeden güvenliği önde tutuyor.",
        "Gövde orantıları ve yerleşim planı sabit kalmak üzere; ahşap tonları, döşeme kumaşları, iç mekân renk paleti ve aydınlatma armatürleri yatırımcının vizyonuna göre şekilleniyor.",
      ],
      en: [
        "A hull architecture that sets the iconic lines of traditional seafaring against a contemporary, minimal idea of luxury. Large glazed surfaces carry daylight inside; the timber decking leaves a premium note underfoot.",
        "Cockpit and deck take up to ten guests with room to spare, while the fully fitted single cabin offers rest at the end of a long day. Stainless guardrails, handholds and non-slip deck surfaces keep safety ahead without conceding the look.",
        "Hull proportions and layout stay fixed; timber tones, upholstery, the interior palette and the light fittings are all specified to the owner's vision.",
      ],
    },
    specs: [
      { key: specKeys.loa, value: v("10,65 m", "10.65 m") },
      { key: specKeys.beam, value: v("3,60 m", "3.60 m") },
      { key: specKeys.depth, value: v("2,90 m", "2.90 m") },
      { key: specKeys.engine, value: v("2 x 200 HP Honda dıştan takma (maks. 400 HP)", "2 x 200 HP Honda outboard (400 HP max)") },
      { key: specKeys.cabins, value: v("1 kamara", "1 cabin") },
      { key: specKeys.heads, value: v("1 tuvalet · lavabo", "1 head · basin") },
      { key: specKeys.capacity, value: v("10 kişi", "10 guests") },
    ],
    cover: local("fleet/ktu-35-feet/profile.jpg", "KTÜ 35 FEET, yandan — tasarım görseli", "KTU 35 FEET in profile — design render"),
    gallery: [
      local("fleet/ktu-35-feet/aerial.jpg", "Seyir hâlinde, yukarıdan — tasarım görseli", "Under way, from above — design render"),
      local("fleet/ktu-35-feet/aft-deck.jpg", "Kıç güverte ve oturma grubu — tasarım görseli", "The aft deck and seating — design render"),
      local("fleet/ktu-35-feet/saloon.jpg", "Salon ve dümen yeri — tasarım görseli", "Saloon and helm — design render"),
      local("fleet/ktu-35-feet/cabin.jpg", "Kamara ve ıslak hacim — tasarım görseli", "Cabin and heads — design render"),
      local("fleet/ktu-35-feet/stern.jpg", "Kıçtan görünüm — tasarım görseli", "From astern — design render"),
      local("fleet/ktu-35-feet/foredeck.jpg", "Baş güverte güneşlik detayı — tasarım görseli", "Foredeck sunpad detail — design render"),
    ],
  },
  {
    slug: "my-14m",
    name: "MY 14M",
    statuses: ["ready-for-delivery", "in-production"],
    order: 5,
    featured: false,
    subtitle: { tr: "Klasik gezi yatı · 13,95 m", en: "Classic motor yacht · 13.95 m" },
    loa: v("13,95 m", "13.95 m"),
    lede: {
      tr: "Klasik çizgiler, modern teknoloji: geleneksel ahşap işçiliğini modern mühendislikle buluşturan 14 metrelik gezi yatı.",
      en: "Classic lines, modern technology — a fourteen-metre motor yacht that brings traditional joinery together with contemporary engineering.",
    },
    body: {
      tr: [
        "MY 14M, klasik ve zarif dış hatlarıyla ahşap detaylı lüks bir iç mekânı aynı tekne üzerinde topluyor. Kompozit gövde ve teak güverte, geleneksel görünümü modern malzeme performansıyla dengeliyor.",
        "Geniş ve konforlu güverte alanları, yüksek manevra kabiliyeti ve ekonomik yakıt tüketimi teknenin karakterini belirliyor. Çift 440 HP dizel ve V-drive şanzıman düzeni, 20 knot seyir ve 26 knot maksimum hız veriyor.",
        "Tekne CE Category B tasarım kategorisinde ve Türk Loydu sertifikalı olarak inşa ediliyor. Standart donanım 11 kW jeneratör, 16.000 BTU klima, çift filtreli yakıt sistemi, Class A seyir cihazları, tam donanımlı mutfak ve SOLAS'a uygun güvenlik ekipmanlarını kapsıyor.",
      ],
      en: [
        "MY 14M holds classic, elegant exterior lines and a timber-detailed interior in the same boat. A composite hull and teak decks balance the traditional look against modern material performance.",
        "Wide, comfortable deck areas, high manoeuvrability and economical fuel consumption set her character. Twin 440 HP diesels on V-drives give 20 knots in service and 26 at maximum.",
        "She is built to CE Category B and certified by Türk Loydu. Standard equipment covers an 11 kW generator, 16,000 BTU air conditioning, a twin-filter fuel system, Class A navigation electronics, a fully fitted galley and SOLAS-compliant safety gear.",
      ],
    },
    specs: [
      { key: specKeys.design, value: v("CE Category B", "CE Category B") },
      { key: specKeys.classification, value: v("Türk Loydu sertifikalı", "Türk Loydu certified") },
      { key: specKeys.hull, value: v("Kompozit · ahşap", "Composite · timber") },
      { key: specKeys.loa, value: v("13,95 m", "13.95 m") },
      { key: specKeys.lwl, value: v("13,15 m", "13.15 m") },
      { key: specKeys.beam, value: v("4,60 m", "4.60 m") },
      { key: specKeys.draught, value: v("0,90 m", "0.90 m") },
      { key: specKeys.engine, value: v("2 x 440 HP dizel · V-drive", "2 x 440 HP diesel · V-drive") },
      { key: specKeys.generators, value: v("1 x 11 kW", "1 x 11 kW") },
      { key: specKeys.speed, value: v("20 knot seyir · 26 knot maks.", "20 kn cruise · 26 kn max") },
      { key: specKeys.fuel, value: v("1.500 litre", "1,500 litres") },
      { key: specKeys.water, value: v("500 litre", "500 litres") },
      { key: specKeys.capacity, value: v("4 kişi", "4 guests") },
    ],
    cover: local("fleet/my-14m/profile.jpg", "MY 14M, yandan — tasarım görseli", "MY 14M in profile — design render"),
    gallery: [
      local("fleet/my-14m/cockpit.jpg", "Kıç güverte ve açık mutfak — tasarım görseli", "The aft deck and outdoor galley — design render"),
      local("fleet/my-14m/aerial-quarter.jpg", "Üstten üç çeyrek görünüm — tasarım görseli", "Three-quarter view from above — design render"),
      local("fleet/my-14m/aerial-bow.jpg", "Baş güverte ve teak kaplama — tasarım görseli", "The foredeck and teak laying — design render"),
      local("fleet/my-14m/top-view.jpg", "Üstten görünüm — tasarım görseli", "Plan view — design render"),
    ],
  },
  {
    slug: "pttra-42-5m",
    name: "PTTRA 42.5m",
    statuses: ["ready-for-delivery", "in-production"],
    order: 3,
    featured: true,
    subtitle: { tr: "Süperyat · 42,55 m", en: "Superyacht · 42.55 m" },
    loa: v("42,55 m", "42.55 m"),
    lede: {
      tr: "Karadeniz'in gemi inşa mirasını süperyat ölçeğine taşıyan projemiz: RINA klaslı, 42,55 metrelik karbon çelik gövde.",
      en: "The project that carries the Black Sea's shipbuilding inheritance to superyacht scale: a RINA-classed, 42.55-metre carbon steel hull.",
    },
    body: {
      tr: [
        "Yuvarlak karina (round bilge) karbon çelik gövde, en zorlu deniz koşullarında dahi sarsıntısız ve sessiz bir seyir için tasarlandı. RINA klaslaması — C, +HULL, OMACH, Y Private Yacht — uluslararası güvenlik ve inşa kalitesi standartlarını güvence altına alıyor.",
        "Dört güverte: ana güvertede tam genişlikte armatör süiti, panoramik ana salon ve profesyonel mutfak; üst güvertede deniz manzaralı spor salonu, çalışma odası, mescit ve sky lounge; sundeck'te jakuzi ve bar; alt güvertede dört misafir kabini ile hidrolik kıç kapağın açılmasıyla deniz seviyesine inen beach club ve bot garajı.",
        "Baş taraftaki mürettebat alanı, üç özel banyolu kabin, mürettebat yemek salonu ve çamaşırhaneyle 7-8 kişilik profesyonel ekibe kendi yaşam alanını sağlıyor.",
      ],
      en: [
        "The round-bilge carbon steel hull is drawn for a quiet, steady passage in the hardest conditions. RINA class — C, +HULL, OMACH, Y Private Yacht — underwrites international standards of safety and build quality.",
        "Four decks: a full-beam owner's suite, panoramic main saloon and professional galley on the main deck; a sea-view gym, study, prayer room and sky lounge above; a jacuzzi and wet bar on the sundeck; four guest cabins below, with a beach club and tender garage that open to sea level when the hydraulic transom drops.",
        "Forward, the crew area gives a professional team of seven or eight their own quarters: three en-suite cabins, a crew mess and a laundry.",
      ],
    },
    specs: [
      { key: specKeys.hull, value: v("Round bilge deplasman · karbon çelik gövde ve üst yapı", "Round-bilge displacement · carbon steel hull and superstructure") },
      { key: specKeys.loa, value: v("42,55 m", "42.55 m") },
      { key: specKeys.beam, value: v("8,30 m", "8.30 m") },
      { key: specKeys.draught, value: v("2,50 m", "2.50 m") },
      { key: specKeys.displacement, value: v("350 ton (%50 yük)", "350 t (50% load)") },
      { key: specKeys.classification, value: v("RINA C, +HULL, OMACH, Y Private Yacht", "RINA C, +HULL, OMACH, Y Private Yacht") },
      { key: specKeys.engine, value: v("2 x 1450 HP", "2 x 1450 HP") },
      { key: specKeys.speed, value: v("13 knot seyir · 16 knot maks.", "13 kn cruise · 16 kn max") },
      { key: specKeys.range, value: v("12 knotta 3.500 deniz mili", "3,500 nm at 12 knots") },
      { key: specKeys.fuel, value: v("60.000 litre", "60,000 litres") },
      { key: specKeys.water, value: v("11.000 litre", "11,000 litres") },
      { key: specKeys.generators, value: v("2 x 80 kW + 1 x 33 kW acil durum", "2 x 80 kW + 1 x 33 kW emergency") },
      { key: specKeys.capacity, value: v("10-12 misafir · 7-8 mürettebat", "10-12 guests · 7-8 crew") },
    ],
    cover: local("fleet/pttra-42-5m/hull.jpg", "PTTRA 42.5m gövdesi, tersane sundurmasında", "The PTTRA 42.5m hull under the yard shed"),
    gallery: [
      local("fleet/pttra-42-5m/shell.jpg", "Gövdenin tam boyu", "The hull along its full length"),
      local("fleet/pttra-42-5m/bow.jpg", "Baş bodoslama ve baş tonozu", "The stem and bulbous bow"),
      local("fleet/pttra-42-5m/stern.jpg", "Kıçtan görünüm ve pervane yatakları", "From astern, with the propeller apertures"),
      local("fleet/pttra-42-5m/quarter.jpg", "Kıç omuzluk ve üst yapı", "The quarter and superstructure"),
      local("fleet/pttra-42-5m/render-profile.jpg", "Tamamlandığında — tasarım görseli", "As completed — design render"),
      local("fleet/pttra-42-5m/render-suite.jpg", "Armatör süiti — tasarım görseli", "The owner's suite — design render"),
      local("fleet/pttra-42-5m/render-gym.jpg", "Deniz manzaralı spor salonu — tasarım görseli", "The sea-view gym — design render"),
      local("fleet/pttra-42-5m/render-lounge.jpg", "Sky lounge — tasarım görseli", "The sky lounge — design render"),
    ],
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

export const bespoke: BespokeContent = {
  kicker: { tr: "Terzi usulü", en: "Bespoke" },
  title: {
    tr: "Her teknenin iç mimarisi size göre şekillenir.",
    en: "Every interior is shaped around the owner.",
  },
  body: {
    tr: [
      "Filomuzdaki her tekne, gövde orantıları ve genel yerleşim planı sabit kalmak üzere, iç mekânı tamamen sizin vizyonunuza göre kurgulanarak inşa edilir. Seri üretimde bir modeli olduğu gibi almak zorundasınız; bizde teknenin karakterini siz belirlersiniz.",
      "Bu bir opsiyon listesi değil, çalışma biçimimizdir: tasarım aşamasından anahtar teslimine kadar her süreç kendi tersanemizde, sizinle birlikte yürütülür.",
    ],
    en: [
      "Every hull in our fleet is built with its proportions and general arrangement fixed, and its interior worked entirely to the owner's vision. Series production asks you to take a model as it comes; here you set the character of the boat.",
      "This is not an options list, it is how we work: from the first drawings to handover, every stage runs at our own yard, with you.",
    ],
  },
  points: [
    {
      title: { tr: "Malzeme ve renk", en: "Material and colour" },
      body: {
        tr: "Ahşap kaplamaların tonundan döşeme kumaşlarının dokusuna, iç mekân renk paletinden mermer ve taş seçimlerine kadar geniş bir yelpaze.",
        en: "From the tone of the timber veneers to the weave of the upholstery, the interior palette, the marble and the stone.",
      },
    },
    {
      title: { tr: "Aydınlatma ve donanım", en: "Lighting and fit-out" },
      body: {
        tr: "Aydınlatma armatürleri, mutfak ve ıslak hacim donanımı, ses ve seyir sistemleri; standart yerleşimi bozmadan entegre edilir.",
        en: "Light fittings, galley and bathroom equipment, audio and navigation systems — integrated without disturbing the standard layout.",
      },
    },
    {
      title: { tr: "Kullanım senaryosu", en: "How she will be used" },
      body: {
        tr: "Özel kullanım, charter ya da kurumsal davet: teknenin sosyal alanları ve kamara düzeni kullanım biçiminize göre planlanır.",
        en: "Private use, charter or corporate hospitality: the social spaces and cabin layout are planned around how the boat will live.",
      },
    },
  ],
  yachtNote: {
    tr: "Bu teknenin gövde orantıları ve genel yerleşim planı sabittir; iç mimarisi — malzeme, renk, kumaş, aydınlatma ve donanım — tamamen size göre şekillenir.",
    en: "This hull's proportions and general arrangement are fixed; the interior — materials, colours, fabrics, lighting and fit-out — is shaped entirely to your brief.",
  },
};

export const home: HomeContent = {
  heroImage: local(
    "fleet/zenday/stern-dusk.jpg",
    "Zenday, akşamüstü Boğaz'da demirli",
    "Zenday lying on the Bosphorus at dusk",
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
      value: "6",
      label: { tr: "Proje", en: "Projects" },
      note: {
        tr: "Zenday ve KTÜ 61 FEET teslim edildi, Cihangir S teslime hazır; KTÜ 35 FEET, MY 14M ve PTTRA 42.5m üretimde.",
        en: "Zenday and KTU 61 FEET delivered, Cihangir S ready for delivery; KTU 35 FEET, MY 14M and PTTRA 42.5m in build.",
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
      image: local(
        "fleet/pttra-42-5m/shell.jpg",
        "PTTRA 42.5m'in çelik gövdesi, tersane sundurmasında",
        "The steel hull of PTTRA 42.5m under the yard shed",
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
      image: local(
        "fleet/zenday/corridor.jpg",
        "Zenday'in kamara koridoru",
        "The cabin corridor aboard Zenday",
      ),
    },
    {
      href: "/news-and-events",
      kicker: { tr: "Haberler ve etkinlikler", en: "News and events" },
      title: { tr: "Yaklaşan etkinlikler", en: "Upcoming events" },
      body: {
        tr: "Bu sezon iskelede ve tersanede olacağımız tarihler.",
        en: "Where we will be alongside and at the yard this season.",
      },
      image: local(
        "fleet/zenday/profile.jpg",
        "Zenday, Boğaz'da seyir hâlinde",
        "Zenday under way on the Bosphorus",
      ),
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
  heroImage: local(
    "fleet/pttra-42-5m/shell.jpg",
    "PTTRA 42.5m'in gövdesi, tersanede",
    "The hull of PTTRA 42.5m at the yard",
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
      image: local(
        "fleet/ktu-35-feet/aft-deck.jpg",
        "KTÜ 35 FEET kıç güvertesi — tasarım görseli",
        "KTU 35 FEET aft deck — design render",
      ),
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
      image: local(
        "fleet/cihangir-s/yard-aerial.jpg",
        "Cihangir S, tersane sahasında",
        "Cihangir S on the hard at the yard",
      ),
    },
    {
      id: "history",
      kicker: "03",
      title: { tr: "Yüksek yerlilik oranı", en: "High domestic content" },
      body: {
        tr: "Yerel iş gücünü ve bölgesel yan sanayi imkânlarını kullanarak yüksek yerlilik oranına sahip projeler geliştiriyoruz.",
        en: "We draw on local labour and regional suppliers to develop projects with a high domestic content ratio.",
      },
      image: local(
        "yard/steel-frames.jpg",
        "Tersanede çelik gövde inşası, arkada Karadeniz",
        "Steel hulls under construction at the yard, the Black Sea beyond",
      ),
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
