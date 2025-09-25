import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Service - Lavage Auto Professionnel à Domicile",
  description:
    "Service de lavage automobile professionnel à domicile. Lavage extérieur, nettoyage intérieur et detailing complet avec produits écologiques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Script Calendly */}
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </body>
    </html>
  );
}
