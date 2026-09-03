import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Content schema.
 *
 * Localisation is field-level: every translatable field is an object with `tr`
 * and `en` keys, which maps exactly onto the `L10n<T>` type the site already
 * uses. No plugin, no document duplication — one document per yacht, with both
 * languages side by side in the editor.
 */

const LOCALE_FIELDSET = [{ name: "translations", title: "TR / EN", options: { columns: 2 } }];

/** A short translatable string — headings, labels, names. */
const localeString = defineType({
  name: "localeString",
  title: "Metin (TR / EN)",
  type: "object",
  fieldsets: LOCALE_FIELDSET,
  fields: [
    defineField({ name: "tr", title: "Türkçe", type: "string", fieldset: "translations" }),
    defineField({ name: "en", title: "English", type: "string", fieldset: "translations" }),
  ],
});

/**
 * A translatable block of prose. Stored as plain text; blank lines separate
 * paragraphs. Deliberately simpler than Portable Text — the design renders
 * unstyled paragraphs and nothing else.
 */
const localeText = defineType({
  name: "localeText",
  title: "Paragraflar (TR / EN)",
  type: "object",
  description: "Paragrafları boş satırla ayırın.",
  fields: [
    defineField({ name: "tr", title: "Türkçe", type: "text", rows: 6 }),
    defineField({ name: "en", title: "English", type: "text", rows: 6 }),
  ],
});

/** An image plus translatable alt text. Alt text is content, not chrome. */
const siteImage = defineType({
  name: "siteImage",
  title: "Görsel",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternatif metin",
      type: "localeString",
      description: "Görseli göremeyenler ve arama motorları için kısa açıklama.",
    }),
  ],
});

const specRow = defineType({
  name: "specRow",
  title: "Teknik özellik",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Alan adı", type: "localeString" }),
    defineField({
      name: "value",
      title: "Değer",
      type: "localeString",
      description: 'Ondalık ayracı dile göre değişir: TR "34,0 m" · EN "34.0 m".',
    }),
  ],
  preview: {
    select: { title: "key.tr", subtitle: "value.tr" },
  },
});

const yacht = defineType({
  name: "yacht",
  title: "Yat",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Model / yat adı", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL adresi",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statuses",
      title: "Durum",
      description:
        "Bu yat hangi filo sekmelerinde görünsün? Birden fazla seçilebilir — " +
        "örneğin teslime hazır bir yat aynı anda yeni sipariş için de üretilebiliyorsa " +
        "ikisini birden işaretleyin. İlk işaretlediğiniz sekme, yat sayfasındaki " +
        "geri bağlantısının gittiği yerdir.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Teslim edildi", value: "delivered" },
          { title: "Teslime hazır", value: "ready-for-delivery" },
          { title: "Üretimde", value: "in-production" },
        ],
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Sıra",
      type: "number",
      description: "Kendi sekmesi içinde küçükten büyüğe sıralanır.",
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Ana sayfada öne çıkar",
      type: "boolean",
      description: "Yalnızca bir yat işaretlenmelidir.",
      initialValue: false,
    }),
    defineField({ name: "subtitle", title: "Alt başlık", type: "localeString" }),
    defineField({ name: "loa", title: "Tam boy (kartlarda görünür)", type: "localeString" }),
    defineField({ name: "lede", title: "Giriş cümlesi", type: "localeText" }),
    defineField({ name: "body", title: "Açıklama", type: "localeText" }),
    defineField({
      name: "specs",
      title: "Teknik özellikler",
      type: "array",
      of: [defineArrayMember({ type: "specRow" })],
    }),
    defineField({ name: "cover", title: "Kapak görseli", type: "siteImage" }),
    defineField({
      name: "gallery",
      title: "Galeri",
      type: "array",
      of: [defineArrayMember({ type: "siteImage" })],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "subtitle.tr", media: "cover" },
  },
});

const event = defineType({
  name: "event",
  title: "Haber / Etkinlik",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL adresi",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Tarih",
      type: "date",
      description:
        "Yaklaşan / Geçmiş ayrımı bu tarihten otomatik hesaplanır — elle seçilmez.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "Bitiş tarihi",
      type: "date",
      description: "Birden çok gün süren etkinlikler için. Tek günlükse boş bırakın.",
    }),
    defineField({ name: "location", title: "Yer", type: "localeString" }),
    defineField({ name: "excerpt", title: "Özet", type: "localeText" }),
    defineField({ name: "body", title: "Metin", type: "localeText" }),
    defineField({ name: "cover", title: "Kapak görseli", type: "siteImage" }),
  ],
  preview: {
    select: { title: "title.tr", subtitle: "date", media: "cover" },
  },
});

const dealerLocation = defineType({
  name: "dealerLocation",
  title: "Bayi / Servis",
  type: "document",
  fields: [
    defineField({ name: "city", title: "Şehir", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Firma adı", type: "string" }),
    defineField({
      name: "region",
      title: "Bölge",
      type: "string",
      options: {
        list: [
          { title: "Akdeniz", value: "mediterranean" },
          { title: "Kuzey Avrupa", value: "northern-europe" },
          { title: "Amerika", value: "americas" },
          { title: "Asya-Pasifik", value: "asia-pacific" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Yetki",
      type: "string",
      options: {
        list: [
          { title: "Bayi", value: "dealer" },
          { title: "Servis", value: "service" },
          { title: "Bayi · Servis", value: "both" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "address", title: "Adres", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-posta", type: "string" }),
    defineField({ name: "capabilities", title: "Hizmetler", type: "localeString" }),
    defineField({
      name: "coordinates",
      title: "Konum",
      type: "geopoint",
      description:
        "Haritada görünmesi için gereklidir. Boş bırakılırsa bu nokta haritaya çizilmez.",
    }),
  ],
  preview: {
    select: { title: "city", subtitle: "company" },
  },
});

const office = defineType({
  name: "office",
  title: "Ofis",
  type: "object",
  fields: [
    defineField({ name: "role", title: "Tanım", type: "localeString" }),
    defineField({ name: "city", title: "Şehir", type: "string" }),
    defineField({
      name: "addressLines",
      title: "Adres satırları",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-posta", type: "string" }),
    defineField({
      name: "coordinates",
      title: "Konum",
      type: "geopoint",
      description: "Girilirse iletişim sayfasında harita gösterilir.",
    }),
  ],
  preview: { select: { title: "city", subtitle: "role.tr" } },
});

const figure = defineType({
  name: "figure",
  title: "Rakam",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Rakam", type: "string" }),
    defineField({ name: "label", title: "Başlık", type: "localeString" }),
    defineField({ name: "note", title: "Açıklama", type: "localeString" }),
  ],
  preview: { select: { title: "value", subtitle: "label.tr" } },
});

const homeTile = defineType({
  name: "homeTile",
  title: "Kart",
  type: "object",
  fields: [
    defineField({ name: "href", title: "Bağlantı", type: "string", description: 'Örn. "/our-world"' }),
    defineField({ name: "kicker", title: "Üst etiket", type: "localeString" }),
    defineField({ name: "title", title: "Başlık", type: "localeString" }),
    defineField({ name: "body", title: "Metin", type: "localeString" }),
    defineField({ name: "image", title: "Görsel", type: "siteImage" }),
  ],
  preview: { select: { title: "title.tr", media: "image" } },
});

const homePage = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  fields: [
    defineField({ name: "heroImage", title: "Hero görseli", type: "siteImage" }),
    defineField({ name: "heroEyebrow", title: "Hero üst etiketi", type: "localeString" }),
    defineField({ name: "heroTitle", title: "Hero başlığı", type: "localeString" }),
    defineField({ name: "statement", title: "Manifesto", type: "localeText" }),
    defineField({ name: "statementBody", title: "Manifesto alt metni", type: "localeText" }),
    defineField({
      name: "figures",
      title: "Rakamlar",
      type: "array",
      of: [defineArrayMember({ type: "figure" })],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "tiles",
      title: "Kartlar",
      type: "array",
      of: [defineArrayMember({ type: "homeTile" })],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "closing", title: "Kapanış cümlesi", type: "localeText" }),
  ],
  preview: { prepare: () => ({ title: "Ana Sayfa" }) },
});

const pillar = defineType({
  name: "pillar",
  title: "Sütun",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Numara", type: "string" }),
    defineField({ name: "title", title: "Başlık", type: "localeString" }),
    defineField({ name: "body", title: "Metin", type: "localeString" }),
    defineField({ name: "image", title: "Görsel", type: "siteImage" }),
    defineField({ name: "href", title: "Bağlantı (opsiyonel)", type: "string" }),
  ],
  preview: { select: { title: "title.tr", subtitle: "kicker", media: "image" } },
});

const commitment = defineType({
  name: "commitment",
  title: "Taahhüt",
  type: "object",
  fields: [
    defineField({ name: "no", title: "Numara", type: "string" }),
    defineField({ name: "title", title: "Başlık", type: "localeString" }),
    defineField({ name: "body", title: "Metin", type: "localeString" }),
  ],
  preview: { select: { title: "title.tr", subtitle: "no" } },
});

const ourWorldPage = defineType({
  name: "ourWorldPage",
  title: "Dünyamız",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "localeString" }),
    defineField({ name: "heroImage", title: "Hero görseli", type: "siteImage" }),
    defineField({ name: "statement", title: "Manifesto", type: "localeText" }),
    defineField({ name: "statementBody", title: "Manifesto alt metni", type: "localeText" }),
    defineField({
      name: "pillars",
      title: "Sütunlar",
      type: "array",
      of: [defineArrayMember({ type: "pillar" })],
    }),
    defineField({
      name: "commitments",
      title: "Taahhütler",
      type: "array",
      of: [defineArrayMember({ type: "commitment" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Dünyamız" }) },
});

const bespokePoint = defineType({
  name: "bespokePoint",
  title: "Başlık",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "localeString" }),
    defineField({ name: "body", title: "Açıklama", type: "localeText" }),
  ],
  preview: { select: { title: "title.tr" } },
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({
      name: "offices",
      title: "Ofisler",
      type: "array",
      of: [defineArrayMember({ type: "office" })],
    }),
    defineField({
      name: "contactEmailTo",
      title: "İletişim formu alıcı adresi",
      type: "string",
      description:
        "Formdan gelen talepler bu adrese düşer. Buradan değiştirebilirsiniz — kod değişikliği gerekmez. Boş bırakılırsa CONTACT_EMAIL_TO ortam değişkeni kullanılır.",
      validation: (r) => r.email(),
    }),
    defineField({ name: "networkMap", title: "Harita yer tutucu görseli", type: "siteImage" }),
    defineField({ name: "contactMap", title: "İletişim harita görseli", type: "siteImage" }),
    defineField({
      name: "bespoke",
      title: "Kişiselleştirme bölümü",
      description:
        "Ana sayfadaki \"terzi usulü\" bölümü ve her yat sayfasının teknik özellikler altındaki notu. Tek yerden yazılır, iki yerde birden görünür.",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Üst etiket", type: "localeString" }),
        defineField({ name: "title", title: "Başlık", type: "localeString" }),
        defineField({
          name: "body",
          title: "Metin",
          type: "localeText",
          description: "Boş satır bırakarak paragraf ayırın.",
        }),
        defineField({
          name: "points",
          title: "Maddeler",
          type: "array",
          of: [defineArrayMember({ type: "bespokePoint" })],
          validation: (r) => r.max(4),
        }),
        defineField({
          name: "yachtNote",
          title: "Yat sayfalarındaki not",
          type: "localeText",
          description: "Tek cümle. Her yat sayfasında teknik özelliklerin altında görünür.",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Ayarları" }) },
});

export const schemaTypes = [
  // Reusable field types
  localeString,
  localeText,
  siteImage,
  specRow,
  office,
  figure,
  homeTile,
  pillar,
  commitment,
  bespokePoint,
  // Documents
  yacht,
  event,
  dealerLocation,
  homePage,
  ourWorldPage,
  siteSettings,
];
