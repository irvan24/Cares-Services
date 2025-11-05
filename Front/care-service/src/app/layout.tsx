import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Care Service - Lavage Auto Professionnel à Domicile",
  description:
    "Service de lavage automobile professionnel à domicile. Nettoyage extérieur, nettoyage intérieur et detailing complet avec produits écologiques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <CartProvider>
          <AuthProvider>{children}</AuthProvider>
        </CartProvider>
        {/* Script Calendly */}
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </body>
    </html>
  );
}
