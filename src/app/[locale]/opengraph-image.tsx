import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const alt = brand.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Deliberately typographic — there is no logo file yet, and no
 * photograph we own, so the wordmark on the brand ground is the honest option.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBFAF8",
          border: "1px solid #171717",
        }}
      >
        <div style={{ fontSize: 84, letterSpacing: 40, color: "#171717" }}>
          {brand.wordmark}
        </div>
        <div style={{ fontSize: 24, letterSpacing: 18, color: "#737373", marginTop: 28 }}>
          {brand.wordmarkSub}
        </div>
        <div style={{ width: 120, height: 1, background: "#5B54A6", marginTop: 56 }} />
      </div>
    ),
    size,
  );
}
