"use client";

/**
 * Last-resort boundary: catches errors thrown by the root layout itself, where
 * the locale layout (and therefore translations and site chrome) is not
 * available. Deliberately self-contained and untranslated.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 24px",
          background: "#FBFAF8",
          color: "#171717",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 300,
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "#737373" }}>
          MimarineYacht
        </p>
        <h1 style={{ margin: "26px 0 0", fontSize: 34, fontWeight: 200 }}>
          Bir şeyler ters gitti. · Something went wrong.
        </h1>
        <p style={{ marginTop: 24, fontSize: 16, lineHeight: 2, color: "#525252", maxWidth: "48ch" }}>
          Sayfa yüklenemedi. Lütfen tekrar deneyin. · The page could not be loaded. Please try again.
        </p>
        {error.digest && (
          <p style={{ marginTop: 12, fontSize: 12, letterSpacing: "0.16em", color: "#737373" }}>
            Ref: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 40,
            width: "fit-content",
            cursor: "pointer",
            background: "transparent",
            border: "1px solid #171717",
            padding: "16px 40px",
            fontSize: 11,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontFamily: "inherit",
          }}
        >
          Tekrar dene · Try again
        </button>
      </body>
    </html>
  );
}
