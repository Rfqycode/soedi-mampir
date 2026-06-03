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

            {/* Logo Barbershop */}
            <div className="text-2xl font-extrabold tracking-widest text-barber-peach">
                <Link href="/">SOEDI MAMPIR</Link>
            </div>

            {/* Tombol Book Now di kanan */}
            <div>
                <Link
                    href="/reservasi"
                    className="px-6 py-2 border border-barber-peach rounded-full hover:bg-barber-peach hover:text-barber-dark transition-all duration-300 text-sm font-bold"
                >
                    Book Now
                </Link>
            </div>
        </nav>
    );
}