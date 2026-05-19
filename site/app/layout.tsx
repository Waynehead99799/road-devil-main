import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  axes: ["wdth"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Road Devil® — A Vertically Integrated Vehicle Intelligence Platform",
  description:
    "Road Devil® has developed a proprietary vehicle safety and intelligence stack combining hardware, firmware and AI within a single controlled architecture.",
  metadataBase: new URL("https://road-devil.com"),
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Road Devil® — Vehicle Intelligence Platform",
    description:
      "A vertically integrated vehicle intelligence platform combining hardware, firmware and AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
