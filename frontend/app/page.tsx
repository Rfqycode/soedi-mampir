"use client";

import { useState } from "react";
import Link from "next/link";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Home() {
  // ==========================================
  // STATE & DATA UNTUK KATALOG
  // ==========================================
  const [kategoriAktif, setKategoriAktif] = useState("SEMUA");

  const daftarProduk = [
    { id: 1, nama: "Premium Oil-Based Pomade", kategori: "POMADE", harga: 120000, gambar: "https://images.unsplash.com/photo-1605497746444-1306509934ad?q=80&w=500&auto=format&fit=crop" },
    { id: 2, nama: "Water-Based Styling Pomade", kategori: "POMADE", harga: 110000, gambar: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=500&auto=format&fit=crop" },
    { id: 3, nama: "Texture Styling Powder", kategori: "POWDER", harga: 95000, gambar: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=500&auto=format&fit=crop" },
    { id: 4, nama: "Matte Texture Clay", kategori: "CLAY", harga: 135000, gambar: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=500&auto=format&fit=crop" }
  ];

  const produkTersaring = kategoriAktif === "SEMUA"
    ? daftarProduk
    : daftarProduk.filter(produk => produk.kategori === kategoriAktif);

  const daftarKategori = ["SEMUA", "POMADE", "POWDER", "CLAY"];

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
  };

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
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between w-full mt-6 bg-white/10 hover:bg-white text-white hover:text-black px-5 py-3 rounded-xl transition-all font-bold text-sm">
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

          {/* Typografi Raksasa */}
          <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-black leading-[0.95] tracking-tighter uppercase text-[#1A1A1A]">
            DARI TERASLINE <br />
            <span className="inline-block border-b-8 border-gray-300 pb-2">MENJADI SOEDI MAMPIR</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">SEJAK 2016</span>
          </h2>

          <div className="max-w-2xl mx-auto pt-8">
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Berawal dari semangat di Terasline pada tahun 2016, kami tumbuh dan berevolusi menjadi <strong>SOEDI MAMPIR</strong>. Dengan konsep industrial modern di APT Pranoto, kami berkomitmen memberikan lebih dari sekadar jasa potong rambut kami memberikan identitas karakter terbaik untuk gaya Anda setiap hari.
            </p>

            <div className="mt-10 flex items-center justify-center gap-12 text-center">
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          3. KATALOG SECTION 
          ========================================= */}
      <section id="katalog" className="bg-[#F5F3EC] py-32 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">ESSENTIALS FOR<br />GOOD STYLES</h2>
              <p className="text-gray-600 font-medium">Produk perawatan premium untuk styling harianmu.</p>
            </div>

            {/* Filter Tombol - Pill Style */}
            <div className="flex flex-wrap gap-3">
              {daftarKategori.map((kategori) => (
                <button
                  key={kategori}
                  onClick={() => setKategoriAktif(kategori)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${kategoriAktif === kategori
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white text-gray-500 border-gray-300 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                    }`}
                >
                  {kategori}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Produk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produkTersaring.map((produk) => (
              <div key={produk.id} className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="w-full h-64 bg-gray-100 p-6 flex items-center justify-center relative overflow-hidden">
                  <img src={produk.gambar} alt={produk.nama} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-2 block">{produk.kategori}</span>
                    <h3 className="font-bold text-lg mb-4 text-[#1A1A1A] leading-tight">{produk.nama}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-[#1A1A1A] font-black text-lg">{formatRupiah(produk.harga)}</span>
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-colors">
                      ↗
                    </button>
                  </div>
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
          {/* Gradient masking untuk light mode */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* GRUP 1 */}
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

          {/* GRUP 2 */}
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
      <footer className="bg-[#1A1A1A] pt-24 pb-12 px-6 rounded-t-[3rem] mt-[-2rem] relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">📍 Our Location</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Jl. APT Pranoto, belakang indomart<br />
                Kec. Sangatta Utara, Kabupaten Kutai Timur<br />
                Kalimantan Timur
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">📞 Get in Touch</h4>
              <p className="text-gray-400 text-sm">Phone: 0812 3456 7890</p>
              <p className="text-gray-400 text-sm mt-1">Email: hello@soedimampir.com</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">🕒 Working Hours</h4>
              <p className="text-gray-400 text-sm">Setiap Hari</p>
              <p className="text-gray-400 text-sm mt-1">13:00 – 23:00 </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <h2 className="text-2xl font-black text-white tracking-widest uppercase">
                SOEDI MAMPIR.
              </h2>
            </div>

            <div className="flex gap-4">
              <a href="https://www.instagram.com/soedi_mampir/" target="_blank" className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors">
                <SiInstagram size={20} />
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" className="p-3 bg-gray-800 rounded-full hover:bg-green-600 transition-colors">
                <SiWhatsapp size={20} />
              </a>
            </div>

            <div className="text-gray-500 text-xs md:text-sm text-center md:text-right">
              Copyright &copy; 2026 Soedi Mampir Barbershop. <br className="md:hidden" /> All Rights Reserved.
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}