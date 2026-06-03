import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import komponen Navbar yang baru kita bikin
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soedi Mampir Barbershop",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar bakal muncul di atas semua halaman */}
        <Navbar />

        {/* children ini adalah isi dari masing-masing halaman (page.tsx) */}
        {children}
      </body>
    </html>
  );
}