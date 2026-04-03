import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FASHION | Exclusividad y Estilo Atemporal",
  description: "Descubre la tienda de ropa premium donde la elegancia se encuentra con la modernidad.",
  openGraph: {
    title: "FASHION Store",
    description: "Elegancia en cada detalle.",
    images: ["/hero.png"],
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/ToastContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
