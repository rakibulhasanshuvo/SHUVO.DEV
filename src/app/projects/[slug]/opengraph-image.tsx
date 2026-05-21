import { ImageResponse } from "next/og";
import { projectsData } from "../data";

export const alt = "Case Study Detail | Rakibul Hasan Shuvo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = projectsData[slug] || {
    title: "Project Detail",
    subtitle: "Cyber-Luxury Web Engineering",
    category: "Full-Stack Development",
    roi: "High-Performance Integration",
    tech: ["Next.js", "TypeScript"],
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          backgroundImage: "linear-gradient(to bottom right, #000000, #09090b)",
          padding: "60px 80px",
          justifyContent: "space-between",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle glowing accent circles (simulated blur bg in Satori) */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "250px",
            backgroundColor: "rgba(0, 240, 255, 0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "300px",
            backgroundColor: "rgba(161, 0, 255, 0.06)",
            display: "flex",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "4px",
                color: "#ffffff",
              }}
            >
              SHUVO
            </span>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: "#00F0FF",
                marginLeft: "6px",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#00F0FF",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              padding: "6px 16px",
              borderRadius: "20px",
              backgroundColor: "rgba(0, 240, 255, 0.05)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Central Title and description Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 10,
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "900",
              margin: 0,
              padding: 0,
              letterSpacing: "-2px",
              lineHeight: "1.1",
              color: "#ffffff",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: 0,
              padding: 0,
              fontWeight: "300",
              maxWidth: "800px",
              lineHeight: "1.4",
            }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Metadata & Specs Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Tech Badges Container */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {project.tech.slice(0, 4).map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "rgba(255, 255, 255, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* ROI Stats Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                letterSpacing: "2px",
                color: "#A100FF",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              PERFORMANCE GAIN (ROI)
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "right",
                maxWidth: "350px",
              }}
            >
              {project.roi}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
