"use client";

import Link from "next/link";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Home() {
  // ==========================================
  // DATA UNTUK LAYANAN (SERVICES)
  // ==========================================
  const daftarLayanan = [
    { id: 1, nama: "POTONG", harga: "60k", deskripsi: "Potong rambut standar dengan hasil presisi." },
    { id: 2, nama: "POTONG + KERAMAS", harga: "80k", deskripsi: "Potong rambut lengkap dengan cuci bersih." },
    { id: 3, nama: "BOOKING + KERAMAS", harga: "100k", deskripsi: "Amankan jadwal bebas antri ditambah cuci." },
    { id: 4, nama: "CREAMBATH", harga: "80k", deskripsi: "Perawatan kulit kepala dan rambut agar rileks." },
    { id: 5, nama: "COLORING", harga: "300-400k", deskripsi: "Pewarnaan rambut profesional." },
    { id: 6, nama: "PERMING", harga: "300-400k", deskripsi: "Styling keriting rambut permanen." },
    { id: 7, nama: "DOWN PERM", harga: "200k", deskripsi: "Meluruskan rambut bagian samping." },
    { id: 8, nama: "CUKUR DI RUMAH", harga: "200-300k", deskripsi: "Layanan home service langsung ke tempatmu." }
  ];

  return (
    <main className="font-sans bg-[#F5F3EC] text-[#1A1A1A]">

      {/* =========================================
          1. HERO SECTION 
          ========================================= */}
      <section className="pt-28 pb-32 px-6 relative overflow-hidden">
        {/* Dekorasi Aksen */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8E4D8] rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:justify-between w-full relative z-10">

          {/* Teks Kiri */}
          <div className="lg:w-[55%] space-y-8">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-600">
                Premium Grooming di Sangatta
              </p>
            </div>

            <h1 className="text-6xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tighter uppercase text-[#1A1A1A]">
              Gaya Rambut <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] to-gray-400">
                Terbaik
              </span> <br />
              Di Kota Ini.
            </h1>

            <p className="text-gray-600 text-lg max-w-md leading-relaxed font-medium">
              Kami fokus pada kenyamanan, presisi, dan detail untuk menciptakan gaya yang membuatmu tampil penuh percaya diri.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link href="/reservasi" className="inline-block px-10 py-4 rounded-full bg-[#1A1A1A] text-white font-bold tracking-widest uppercase hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Book Now
              </Link>
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-4 border-[#F5F3EC] object-cover" src="/images/model_1.jpg" alt="Client" />
                <img className="w-12 h-12 rounded-full border-4 border-[#F5F3EC] object-cover" src="/images/model_2.jpg" alt="Client" />
                <div className="w-12 h-12 rounded-full border-4 border-[#F5F3EC] bg-gray-300 flex items-center justify-center text-xs font-bold">+2K</div>
              </div>
            </div>
          </div>

          {/* Gambar Kanan (Geometric Cut) */}
          <div className="lg:w-[40%] mt-16 lg:mt-0 relative">
            <div className="w-full aspect-[4/5] bg-gray-200 rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img
                src="/images/hero1.jpg"
                alt="Hero Soedi Mampir"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 border-[10px] border-[#F5F3EC]/20 rounded-[2rem] pointer-events-none"></div>
            </div>

            {/* Badge Bintang Melayang */}
            <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-4">
              <div className="text-yellow-500 flex text-xl">
                ★★★★★
              </div>
              <p className="text-sm font-bold leading-tight">4.9/5 <br /><span className="text-gray-500 text-xs font-normal">Rata-rata Rating</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          1.5 FLOATING CARDS 
          ========================================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-10 lg:-mt-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-[#F5F3EC] rounded-full flex items-center justify-center text-xl group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">💈</div>
            <h3 className="text-3xl font-black">10+</h3>
            <p className="text-gray-500 text-sm font-medium">Tahun Pengalaman mencukur dengan kapster profesional bersertifikat.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-[#F5F3EC] rounded-full flex items-center justify-center text-xl group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">🕒</div>
            <h3 className="text-3xl font-black">13:00</h3>
            <p className="text-gray-500 text-sm font-medium">Buka setiap hari mulai dari jam 1 siang hingga jam 10 malam.</p>
          </div>

          <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase text-gray-400 font-bold">Konsultasi Gaya</p>
              <h3 className="text-2xl font-bold leading-tight">Mari Bicara Tentang Gaya Anda</h3>
            </div>
            <a href="https://wa.me/cc" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between w-full mt-6 bg-white/10 hover:bg-white text-white hover:text-black px-5 py-3 rounded-xl transition-all font-bold text-sm">
              Hubungi Kami <span>→</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================
          2. ABOUT SECTION 
          ========================================= */}
      <section className="bg-white py-32 px-6 border-y border-gray-200">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-black leading-[0.95] tracking-tighter uppercase text-[#1A1A1A]">
            DARI TERASLINE <br />
            <span className="inline-block border-b-8 border-gray-300 pb-2">MENJADI SOEDI MAMPIR</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">SEJAK 2016</span>
          </h2>
          <div className="max-w-2xl mx-auto pt-8">
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Berawal dari semangat di Terasline pada tahun 2016, kami tumbuh dan berevolusi menjadi <strong>SOEDI MAMPIR</strong>. Dengan konsep industrial modern di APT Pranoto, kami berkomitmen memberikan lebih dari sekadar jasa potong rambut kami memberikan identitas karakter terbaik untuk gaya Anda setiap hari.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          3. SERVICES SECTION (TERBARU)
          ========================================= */}
      <section id="services" className="bg-[#F5F3EC] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">OUR SERVICES</h2>
            <p className="text-gray-600 font-medium">Pilihan layanan terbaik untuk menunjang penampilanmu.</p>
          </div>

          {/* Grid Layanan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {daftarLayanan.map((layanan) => (
              <div key={layanan.id} className="group bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-xl mb-3 text-[#1A1A1A] leading-tight uppercase group-hover:text-blue-600 transition-colors">{layanan.nama}</h3>
                  <p className="text-sm text-gray-500 mb-6">{layanan.deskripsi}</p>
                </div>
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-[#1A1A1A] font-black text-2xl">Rp {layanan.harga}</span>
                  <Link href="/reservasi" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-colors">
                    ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          4. GALLERY SECTION 
          ========================================= */}
      <section id="gallery" className="bg-white py-32 border-t border-gray-200 overflow-hidden relative">

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% - 24px)); } 
          }
          .animate-scroll-infinite {
            animation: scroll-infinite 35s linear infinite;
          }
          .gallery-container:hover .animate-scroll-infinite {
            animation-play-state: paused;
          }
        `}} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              Inside Look
            </p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase">REAL RESULTS.<br />NO FILTERS.</h2>
          </div>
        </div>

        <div className="gallery-container flex overflow-hidden w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-6 pr-6 animate-scroll-infinite w-max">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={`grup1-${item}`}
                className="shrink-0 w-[280px] md:w-[350px] aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative group cursor-pointer"
              >
                <img
                  src={`/images/model_${item}.jpg`}
                  alt={`Model ${item}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-6 pr-6 animate-scroll-infinite w-max" aria-hidden="true">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={`grup2-${item}`}
                className="shrink-0 w-[280px] md:w-[350px] aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative group cursor-pointer"
              >
                <img
                  src={`/images/model_${item}.jpg`}
                  alt={`Model ${item}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5. FOOTER SECTION 
          ========================================= */}
      <footer className="bg-[#0A0A0A] text-white pt-24 pb-8 px-6 border-t border-gray-900 mt-20">
        <div className="max-w-7xl mx-auto">

          {/* Bagian Call To Action (Rayuan Terakhir) */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-16 mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
                SIAP TAMPIL <br /><span className="text-gray-600">MAKSIMAL?</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                Jangan biarkan rambut berantakan merusak harimu. Amankan kursimu sekarang dan rasakan pengalaman cukur premium di Sangatta.
              </p>
            </div>
            <Link href="/reservasi" className="px-10 py-5 rounded-full bg-[#F5F3EC] text-[#0A0A0A] text-sm font-black tracking-widest uppercase hover:bg-white transition-all hover:scale-105 shadow-[0_0_40px_rgba(245,243,236,0.15)] flex-shrink-0">
              RESERVASI SEKARANG!
            </Link>
          </div>

          {/* Bagian Grid Info Minimalis */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-400 mb-20">
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Lokasi Kami</h4>
              <p className="leading-relaxed">Jl. APT Pranoto<br />Belakang Indomaret<br />Sangatta Utara, Kutai Timur</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Kontak</h4>
              <p className="leading-relaxed">0857-5342-4792<br />web.soedimampir@gmail.com</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Jam Operasional</h4>
              <p className="leading-relaxed">Setiap Hari<br />13:00 - 23:00 WITA</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Sosial Media</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/soedi_mampir/" className="hover:text-white transition-colors underline underline-offset-4">Instagram</a>
                <a href="https://wa.me/6285753424792" className="hover:text-white transition-colors underline underline-offset-4">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-black uppercase tracking-widest">
            <p>© 2026 SOEDI MAMPIR BARBERSHOP.</p>
            <p>BUILT WITH PASSION.</p>
          </div>

        </div>
      </footer>
    </main>
  );
}