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
          background: "#12212F",
          border: "1px solid rgba(242, 239, 232, 0.18)",
        }}
      >
        <div style={{ fontSize: 62, letterSpacing: 26, color: "#F2EFE8" }}>
          {brand.wordmark}
        </div>
        <div style={{ width: 120, height: 1, background: "#7FA9C4", marginTop: 52 }} />
      </div>
    ),
    size,
  );
}
