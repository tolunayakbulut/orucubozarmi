import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Orucu Bozar Mı? - Diyanet Fetvalarına Göre Oruç Hükümleri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            ?
          </div>
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Orucu Bozar Mı?
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Diyanet fetvalarına göre oruçla ilgili
          sorularınızın cevabını anında öğrenin
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "22px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            ✅ Bozar
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "22px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            ❌ Bozmaz
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "22px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            ⚠️ Mezhebe Göre Değişir
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "24px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          orucubozarmi.com
        </div>
      </div>
    ),
    { ...size }
  );
}
