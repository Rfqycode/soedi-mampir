"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Kapster {
  id: number;
  nama: string;
  spesialisasi?: string;
  status_aktif: boolean;
  foto?: string;
}

interface Layanan {
  id: number;
  nama_layanan: string;
  harga: number;
  durasi?: string;
}

export default function ReservasiPage() {
  const router = useRouter();

  // ==========================================
  // 1. SEMUA STATE HARUS DI PALING ATAS
  // ==========================================
  const [kapsters, setKapsters] = useState<Kapster[]>([]);
  const [layonans, setLayonans] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedKapster, setSelectedKapster] = useState<number | null>(null);
  const [selectedLayanan, setSelectedLayanan] = useState<number | null>(null);
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [nomorHp, setNomorHp] = useState("");

  const [jamSudahDipesan, setJamSudahDipesan] = useState<string[]>([]);
  const slotWaktu = [
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  // ==========================================
  // 2. SEMUA USE-EFFECT HARUS DI SINI
  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Ambil Data Kapster
        const resKapster = await fetch("https://soedi-mampir-production.up.railway.app/api/kapster/");
        if (!resKapster.ok) throw new Error("Gagal mengambil data kapster");
        const dataKapster = await resKapster.json();
        setKapsters(dataKapster);

        // 2. Ambil Data Layanan Langsung dari Django (KODE BARU)
        const resLayanan = await fetch("https://soedi-mampir-production.up.railway.app/api/layanan/");
        if (!resLayanan.ok) throw new Error("Gagal mengambil data layanan");
        const dataLayanan = await resLayanan.json();
        setLayonans(dataLayanan);

        setError(null);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan koneksi ke server.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tanggal && selectedKapster) {
      fetch(`https://soedi-mampir-production.up.railway.app/api/cek-jadwal/?tanggal=${tanggal}&kapster=${selectedKapster}`)
        .then(res => res.json())
        .then(data => {
          setJamSudahDipesan(data.jam_terisi || []);
          if (data.jam_terisi?.includes(jam)) setJam("");
        })
        .catch(err => console.error("Gagal cek jadwal:", err));
    } else {
      setJamSudahDipesan([]);
    }
  }, [tanggal, selectedKapster]);

  // ==========================================
  // 3. FUNGSI LOGIKA / HANDLER (API, dll)
  // ==========================================
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKapster || !selectedLayanan || !tanggal || !jam || !namaPelanggan || !nomorHp) {
      alert("Harap lengkapi semua data reservasi!");
      return;
    }

    const layananObj = layonans.find(l => l.id === selectedLayanan);
    const kapsterObj = kapsters.find(k => k.id === selectedKapster);
    const totalHarga = layananObj ? layananObj.harga : 0;
    const namaLayanan = layananObj ? layananObj.nama_layanan : "-";
    const namaKapster = kapsterObj ? kapsterObj.nama : "-";

    try {
      setSubmitting(true);
      const res = await fetch("https://soedi-mampir-production.up.railway.app/api/buat-pesanan/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pelanggan: namaPelanggan,
          no_whatsapp: nomorHp,
          kapster: selectedKapster,
          layanan: [selectedLayanan],
          tanggal,
          jam_booking: jam,
          total_harga: totalHarga
        }),
      });

      if (!res.ok) throw new Error("Gagal membuat reservasi.");

      const nomorWA = "6282358155538";
      const pesanText = `Halo Admin, saya ingin konfirmasi booking:\n\n*Nama:* ${namaPelanggan}\n*Kapster:* ${namaKapster}\n*Layanan:* ${namaLayanan}\n*Tanggal:* ${tanggal}\n*Jam:* ${jam}\n*Total:* ${formatRupiah(totalHarga)}`;
      window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanText)}`, "_blank");

      router.push('/sukses');
      setJamSudahDipesan([...jamSudahDipesan, jam]);
      setSelectedLayanan(null);
      setJam("");
      setNamaPelanggan("");
      setNomorHp("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // 4. BAGIAN TAMPILAN (UI)
  // ==========================================
  if (loading) return (
    <div className="min-h-screen bg-[#F5F3EC] flex flex-col items-center justify-center p-6">
      <div className="w-12 h-12 border-4 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[#1A1A1A] font-bold tracking-widest uppercase text-xs animate-pulse">Menghubungkan ke Server...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#F5F3EC] flex flex-col items-center justify-center p-6 text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <h2 className="text-2xl font-black uppercase tracking-tight text-red-600 mb-2">Gagal Memuat Data</h2>
      <p className="text-gray-600 max-w-md text-sm mb-6">{error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-full">Coba Lagi</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F5F3EC] text-[#1A1A1A] pt-28 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs font-black tracking-widest uppercase text-gray-400">Book Your Session</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            ATUR JADWAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] to-gray-400">CUKURMU</span>
          </h1>
          <div className="w-12 h-1 bg-[#1A1A1A] mx-auto mt-4"></div>
        </div>

        {successMessage && <div className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 rounded-3xl text-center font-bold shadow-sm animate-bounce">🎉 {successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* STEP 1: PILIH KAPSTER */}
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8 text-center flex items-center justify-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#F5F3EC] flex items-center justify-center text-sm font-bold">1</span>
              Pilih Kapster
            </h2>

            {/* Container Grid 2 Kolom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {kapsters.slice(0, 2).map((kapster) => {
                const isSelected = selectedKapster === kapster.id;
                const isDisabled = !kapster.status_aktif;

                return (
                  <div
                    key={kapster.id}
                    onClick={() => !isDisabled && setSelectedKapster(kapster.id)}
                    className={`relative group rounded-[1.5rem] overflow-hidden aspect-[3/4] transition-all duration-300 cursor-pointer border-4 ${isDisabled
                      ? "opacity-50 grayscale cursor-not-allowed border-transparent"
                      : isSelected
                        ? "border-[#1A1A1A] shadow-xl scale-[1.02]"
                        : "border-transparent hover:border-gray-200 hover:shadow-lg"
                      }`}
                  >
                    {/* Gambar Full Cover */}
                    <img
                      src={kapster.nama.toLowerCase().includes("fadil") ? "/images/bang_fadil.jpg" : "/images/bang_fredo.jpg"}
                      alt={kapster.nama}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Area Teks Nama (Gaya Overlay Bawah) */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-24 pb-6 px-6">
                      <div className={`inline-block px-5 py-3 rounded-xl transition-colors duration-300 ${isSelected ? "bg-[#1A1A1A] text-white" : "bg-white/20 backdrop-blur-md text-white"
                        }`}>
                        <h3 className="font-black text-lg uppercase tracking-wider leading-none mb-1">{kapster.nama}</h3>
                        <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                          {isDisabled ? "Tidak Tersedia" : isSelected ? "Kapster Terpilih" : "Pilih Kapster"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* STEP 2: PILIH LAYANAN */}
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F5F3EC] flex items-center justify-center text-xs">2</span>
              Pilih Layanan Treatment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layonans.map((layanan) => (
                <div key={layanan.id} onClick={() => setSelectedLayanan(layanan.id)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex justify-between items-center ${selectedLayanan === layanan.id ? "border-[#1A1A1A] bg-[#F5F3EC]/50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-400"}`}>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base">{layanan.nama_layanan}</h3>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-[#1A1A1A]">{formatRupiah(layanan.harga)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: WAKTU & BIODATA */}
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F5F3EC] flex items-center justify-center text-xs">3</span>
              Informasi Waktu & Kontak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500">Pilih Tanggal</label>
                <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1A1A1A] outline-none transition-all text-sm" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500">Nama Lengkap Anda</label>
                  <input type="text" value={namaPelanggan} onChange={(e) => setNamaPelanggan(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-500">Nomor WhatsApp</label>
                  <input type="tel" value={nomorHp} onChange={(e) => setNomorHp(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none text-sm" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2 mt-4 pt-4 border-t border-gray-100">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-4">Pilih Jam Kedatangan</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {slotWaktu.map((slot) => {
                    const isBooked = jamSudahDipesan.includes(slot);
                    return (
                      <button type="button" key={slot} disabled={isBooked || !tanggal || !selectedKapster} onClick={() => setJam(slot)}
                        className={`py-4 rounded-xl text-sm font-bold transition-all border-2 ${!tanggal || !selectedKapster ? "bg-gray-50 text-gray-300 border-transparent cursor-not-allowed" : isBooked ? "bg-gray-100 text-gray-400 border-transparent cursor-not-allowed line-through" : jam === slot ? "bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105" : "bg-white border-gray-200 hover:border-[#1A1A1A]"}`}>
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button type="submit" disabled={submitting} className={`w-full md:w-auto px-12 py-5 rounded-full text-white font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-md ${submitting ? "bg-gray-400" : "bg-[#1A1A1A] hover:bg-gray-800"}`}>
              {submitting ? "Memproses..." : "Konfirmasi Reservasi Sekarang"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}