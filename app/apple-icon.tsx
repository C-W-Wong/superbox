import { ImageResponse } from "next/og";

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
          background: "#EAB308",
          color: "#0F172A",
          fontSize: 140,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.06em",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
