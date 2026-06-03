import Link from "next/link";

export default function Sukses() {
    return (
        <main className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-[#1a1a1a] border border-gray-800 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-fade-in-up">

                {/* Ikon Ceklis Hijau */}
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
                    Booking Berhasil!
                </h1>

                <div className="text-gray-400 space-y-4 text-sm leading-relaxed">
                    <p>Terima kasih telah menggunakan jasa Soedi Mampir Barbershop.</p>

                    {/* Kotak Peringatan Kuning */}
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 font-medium">
                        ⚠️ Harap datang <strong>30 menit</strong> sebelum jam booking Anda untuk konfirmasi dan persiapan. Jika terlambat, antrean dapat dialihkan.
                    </div>

                    <p>Kami telah meneruskan detail reservasi Anda ke WhatsApp Admin untuk proses lebih lanjut.</p>
                </div>

                <Link href="/" className="inline-block w-full py-4 mt-4 bg-white text-black font-bold tracking-widest uppercase rounded-xl hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    Kembali ke Beranda
                </Link>

            </div>
        </main>
    );
}