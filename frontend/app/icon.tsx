import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export const alt = "JR Compliance";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 24% 18%, #168cf5 0, transparent 42%), linear-gradient(145deg, #03132f 0%, #06285f 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            border: "14px solid #8bdcff",
            borderRadius: "112px",
            boxShadow: "0 0 0 24px rgba(22, 140, 245, 0.28)",
            color: "#f8fcff",
            display: "flex",
            fontFamily: "Arial, sans-serif",
            fontSize: 176,
            fontWeight: 800,
            height: 312,
            justifyContent: "center",
            letterSpacing: "-18px",
            paddingRight: 18,
            width: 312,
          }}
        >
          JR
        </div>
      </div>
    ),
    size,
  );
}
