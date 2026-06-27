import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #43B14A, #1E83D8)",
          color: "#fff",
          fontSize: 116,
          fontWeight: 700,
        }}
      >
        ✓
      </div>
    ),
    { ...size }
  );
}
