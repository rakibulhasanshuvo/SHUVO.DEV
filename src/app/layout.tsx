import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: "../fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet-grotesk",
  display: "swap",
});
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibulhasanshuvo.com"),
  title: "Rakibul Hasan Shuvo | Cyber-Luxury Full-Stack Web Developer & Designer",
  description: "Portfolio of Muhammad Rakibul Hasan Shuvo, a Full-Stack Web Developer & Graphic Designer engineering high-performance, visually stunning Next.js and Supabase experiences.",
  keywords: ["Rakibul Hasan Shuvo", "Full-Stack Developer", "Next.js", "Tailwind CSS v4", "Supabase", "Cyber-Luxury Design", "React Developer", "Bangladesh Developer"],
  authors: [{ name: "Muhammad Rakibul Hasan Shuvo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Website JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rakibul Hasan Shuvo — Full-Stack Developer",
    "description": "Engineering high-performance, visually stunning custom web platforms with custom interactive graphics, custom scrapers, and Refine admin panels.",
    "url": "https://rakibulhasanshuvo.com", // Fallback URL
    "image": "https://rakibulhasanshuvo.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://github.com/rakibulhasanshuvo",
      "https://linkedin.com", // Fallback
      "https://upwork.com" // Fallback
    ],
    "priceRange": "$$"
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>

        {/* JSON-LD Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${satoshi.variable} ${cabinetGrotesk.variable} min-h-full flex flex-col bg-cyber-black text-white font-satoshi selection:bg-neon-cyan/30 selection:text-white`}>
        <Providers>
          <Navbar />
          <div className="pt-24 flex-1 flex flex-col relative">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

