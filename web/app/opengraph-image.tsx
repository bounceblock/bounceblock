import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BounceBlock — Clean Leads. Higher Conversions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#FAF9F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -3 }}>
          <span style={{ color: "#14233D" }}>Bounce</span>
          <span style={{ color: "#2EA94E" }}>Block</span>
          <span style={{ color: "#1B7FD4" }}>.io</span>
        </div>
        <div style={{ marginTop: 16, fontSize: 36, color: "#46505F" }}>Clean Leads. Higher Conversions.</div>
        <div
          style={{
            marginTop: 44,
            display: "flex",
            background: "#E9F6EC",
            color: "#1E7E3A",
            padding: "14px 30px",
            borderRadius: 999,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          ✓ Email &amp; phone verification — one flat price
        </div>
      </div>
    ),
    { ...size }
  );
}
