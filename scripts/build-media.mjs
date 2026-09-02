/**
 * Turns the client's originals in `mimarine/` into web assets under
 * `public/media/`.
 *
 * Three things happen here that matter:
 *   • EXIF is dropped (sharp's default). Several of these are phone photos and
 *     carried GPS coordinates and device serials into the repo otherwise.
 *   • Everything becomes progressive JPEG, so the 3 MB PNG renders stop being
 *     3 MB.
 *   • Source filenames use Turkish characters in decomposed form, which does
 *     not survive every filesystem call — so matching is done on a normalised
 *     copy of the name.
 *
 * The `my14m-*` sources are not originals: they were decoded out of
 * `MY_14m_presentation_rev02.pdf`, whose renders are stored as JPEG-2000
 * streams. If `mimarine/` is ever restored from scratch, extract them again
 * before running this.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "mimarine";
const OUT = path.join("public", "media");

/** Normalise a filename so "ktü" matches whichever way it was encoded. */
const norm = (s) => s.normalize("NFC").toLowerCase();

const originals = fs.readdirSync(SRC).map((f) => ({ file: f, key: norm(f) }));

function find(fragment) {
  const f = norm(fragment);
  const hit = originals.find((o) => o.key.includes(f));
  if (!hit) throw new Error(`no source matches "${fragment}"`);
  return path.join(SRC, hit.file);
}

/** dest → [source fragment, longest edge] */
const JOBS = {
  // ── Cihangir S · 13 m · ready for delivery ──────────────────────────────
  "fleet/cihangir-s/bow.jpg": ["cihangir 6", 2000],
  "fleet/cihangir-s/aft.jpg": ["cihangir s.jpeg", 2000],
  "fleet/cihangir-s/yard-aerial.jpg": ["cihangir s 2", 2000],
  "fleet/cihangir-s/yard-profile.jpg": ["cihangir s 4", 2000],
  "fleet/cihangir-s/yard-bow.jpg": ["cihangir s 3", 2000],

  // ── Zenday · 22,05 m · delivered ────────────────────────────────────────
  "fleet/zenday/stern-dusk.jpg": ["zenday arkadan", 2200],
  "fleet/zenday/aft-deck.jpg": ["zenday.jpeg", 1800],
  "fleet/zenday/saloon.jpg": ["zenday resto.jpeg", 2200],
  "fleet/zenday/corridor.jpg": ["zenday korido", 1600],
  "fleet/zenday/profile.jpg": ["zenday 2.jpeg", 1800],
  "fleet/zenday/overhead.jpg": ["zenday tepeden 2", 2200],
  "fleet/zenday/bow.jpg": ["zenday önden", 1800],

  // ── KTÜ 35 FEET · 10,65 m · in production (renders) ─────────────────────
  "fleet/ktu-35-feet/aft-deck.jpg": ["kıç güverte", 2200],
  "fleet/ktu-35-feet/saloon.jpg": ["kıçtan görünüm", 1800],
  "fleet/ktu-35-feet/cabin.jpg": ["kamara görünümü", 1800],
  "fleet/ktu-35-feet/foredeck.jpg": ["35 feet sunset", 2200],
  "fleet/ktu-35-feet/profile.jpg": ["4_26PM", 1600],
  "fleet/ktu-35-feet/aerial.jpg": ["4_24PM", 1600],
  "fleet/ktu-35-feet/stern.jpg": ["4_37PM", 1600],

  // ── PTTRA 42.5m · 42,55 m · in production ───────────────────────────────
  "fleet/pttra-42-5m/hull.jpg": ["pttra 42.5 metre", 2400],
  "fleet/pttra-42-5m/shell.jpg": ["pttra kabuk", 2400],
  "fleet/pttra-42-5m/bow.jpg": ["pttra 42.5.jpeg", 1800],
  "fleet/pttra-42-5m/stern.jpg": ["pttra 42.5 model", 2400],
  "fleet/pttra-42-5m/quarter.jpg": ["pttra.jpeg", 1800],
  "fleet/pttra-42-5m/render-profile.jpg": ["3_10PM", 1800],
  "fleet/pttra-42-5m/render-gym.jpg": ["6_45PM", 1800],
  "fleet/pttra-42-5m/render-suite.jpg": ["3_19PM", 1800],
  "fleet/pttra-42-5m/render-lounge.jpg": ["3_22PM", 1800],

  // ── KTÜ 61 FEET · 19,50 m · delivered ───────────────────────────────────
  "fleet/ktu-61-feet/profile.jpg": ["9_52PM", 1600],
  "fleet/ktu-61-feet/quarter.jpg": ["9_48PM", 1600],
  "fleet/ktu-61-feet/stern.jpg": ["9_57PM", 1600],
  "fleet/ktu-61-feet/yard.jpg": ["photo-2026-04-01", 1600],

  // ── MY 14M · 13,95 m · in production ────────────────────────────────────
  "fleet/my-14m/profile.jpg": ["my14m-profile", 2400],
  "fleet/my-14m/cockpit.jpg": ["my14m-cockpit", 2400],
  "fleet/my-14m/aerial-quarter.jpg": ["my14m-aerial-quarter", 2400],
  "fleet/my-14m/aerial-bow.jpg": ["my14m-aerial-bow", 2400],
  "fleet/my-14m/top-view.jpg": ["my14m-top-view", 2400],

  // ── The yard itself ─────────────────────────────────────────────────────
  "yard/steel-frames.jpg": ["whatsapp image", 1800],
};

(async () => {
  let bytesIn = 0;
  let bytesOut = 0;

  for (const [dest, [fragment, edge]] of Object.entries(JOBS)) {
    const src = find(fragment);
    const target = path.join(OUT, dest);
    fs.mkdirSync(path.dirname(target), { recursive: true });

    const meta = await sharp(src).metadata();
    const longest = Math.max(meta.width, meta.height);
    const resize =
      longest > edge
        ? meta.width >= meta.height
          ? { width: edge }
          : { height: edge }
        : null;

    await sharp(src)
      .rotate() // honour the EXIF orientation before it is stripped
      .resize(resize ?? {})
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(target);

    const a = fs.statSync(src).size;
    const b = fs.statSync(target).size;
    bytesIn += a;
    bytesOut += b;
    const out = await sharp(target).metadata();
    console.log(
      `${dest.padEnd(38)} ${String(out.width).padStart(4)}x${String(out.height).padEnd(4)} ` +
        `${String(Math.round(b / 1024)).padStart(4)} KB  (was ${Math.round(a / 1024)} KB)`,
    );
  }

  console.log(
    `\n${Object.keys(JOBS).length} files · ${Math.round(bytesIn / 1024 / 1024)} MB → ` +
      `${Math.round(bytesOut / 1024 / 1024)} MB`,
  );
})();
