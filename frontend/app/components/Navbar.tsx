"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    // ==========================================
    // 1. SEMUA STATE HARUS DI PALING ATAS
    // ==========================================
    const pathname = usePathname();

    // ==========================================
    // 4. BAGIAN TAMPILAN (UI)
    // ==========================================

    // LOGIKA PENYEMBUNYI: Kalau URL-nya /sukses, jangan tampilkan apa-apa (hilang)
    if (pathname === '/sukses') {
        return null;
    }

    return (
        <nav className="bg-barber-dark text-barber-cream w-full px-6 py-5 flex items-center justify-between border-b border-barber-slate/30">
            <header className="fixed top-0 inset-x-0 bg-[#0A0A0A] text-white z-50 shadow-xl">
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black tracking-widest uppercase text-white">
                        SOEDI MAMPIR
                    </Link>

                    {/* Tombol Kontras Tinggi */}
                    <Link href="/reservasi" className="px-9 py-4 rounded-full bg-[#F5F3EC] text-[#1A1A1A] text-xs font-black tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
                        RESERVASI SEKARANG!
                    </Link>
                </div>
            </header>
        </nav>
    );
}