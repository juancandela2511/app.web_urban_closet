import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URBAN CLOSET | Moda urbana  ",
  description: "No sigas la moda, conviértete en ella.",
  openGraph: {
    title: "FASHION Store",
    description: "Tu estilo, tus reglas, tu ciudad.",
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
