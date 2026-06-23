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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resKapster = await fetch("https://soedi-mampir-production.up.railway.app/api/kapster/");
        if (!resKapster.ok) throw new Error("Gagal mengambil data kapster");
        const dataKapster = await resKapster.json();
        setKapsters(dataKapster);

        const resLayanan = await fetch("https://soedi-mampir-production.up.railway.app/api/layanan/");
        if (!resLayanan.ok) throw new Error("Gagal mengambil data layanan");
        const dataLayanan = await resLayanan.json();
        setLayonans(dataLayanan);

        setError(null);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan koneksi ke server.");
      } finaly {
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

      let nomorWA = "6285753424792";
      if (kapsterObj) {
        const namaKapsterLower = kapsterObj.nama.toLowerCase();
        if (namaKapsterLower.includes("fadil")) {
          nomorWA = "6285753424792";
        } else if (namaKapsterLower.includes("fredo")) {
          nomorWA = "6282247091885";
        }
      }

      const pesanText = `Halo ${namaKapster}, saya ingin konfirmasi booking:\n\n*Nama:* ${namaPelanggan}\n*Layanan:* ${namaLayanan}\n*Tanggal:* ${tanggal}\n*Jam:* ${jam}\n*Total:* ${formatRupiah(totalHarga)}`;
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

  if (loading) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-amber-500 font-medium tracking-widest text-xs animate-pulse">MEMBUKA PINTU BARBER...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6 text-center text-white">
      <div className="text-4xl mb-4 text-amber-500">⚠️</div>
      <h2 className="text-xl font-bold tracking-wider uppercase mb-2">Koneksi Terganggu</h2>
      <p className="text-gray-400 max-w-md text-sm mb-6">{error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-amber-600 transition-all">Coba Lagi</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-gray-100 pt-24 pb-20 px-4 antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase">Premium Experience</span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide mt-2 mb-3 text-white">RESERVASI JADWAL</h1>
          <p className="text-gray-400 text-xs max-w-xs mx-auto">Pilih kapster andalan, treatment terbaik, dan waktu luangmu.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: KAPSTER */}
          <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
              <span className="text-amber-500 font-serif text-lg">I.</span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Pilih Professional Master</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {kapsters.slice(0, 2).map((kapster) => {
                const isSelected = selectedKapster === kapster.id;
                const isDisabled = !kapster.status_aktif;
                return (
                  <div
                    key={kapster.id}
                    onClick={() => !isDisabled && setSelectedKapster(kapster.id)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer transition-all duration-300 border ${isDisabled ? "opacity-30 grayscale cursor-not-allowed border-transparent" : isSelected ? "border-amber-500 ring-2 ring-amber-500/20 scale-[1.01]" : "border-neutral-800 hover:border-neutral-600"}`}
                  >
                    <img src={kapster.nama.toLowerCase().includes("fadil") ? "/images/bang_fadil.jpg" : "/images/bang_fredo.jpg"} alt={kapster.nama} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-5">
                      <h3 className="font-serif text-xl text-white">{kapster.nama}</h3>
                      <p className="text-[11px] text-amber-500 tracking-wider uppercase mt-1">
                        {isDisabled ? "SANGKUT/OFF" : isSelected ? "TERPILIH" : "READY TO CUT"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: LAYANAN */}
          <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
              <span className="text-amber-500 font-serif text-lg">II.</span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Pilih Menu Treatment</h2>
            </div>
            <div className="space-y-3">
              {layonans.map((layanan) => (
                <div key={layanan.id} onClick={() => setSelectedLayanan(layanan.id)} className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex justify-between items-center ${selectedLayanan === layanan.id ? "border-amber-500 bg-amber-500/5" : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"}`}>
                  <div>
                    <h3 className="font-medium text-sm text-gray-200">{layanan.nama_layanan}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Premium Service</p>
                  </div>
                  <span className="font-mono text-sm text-amber-500">{formatRupiah(layanan.harga)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: TANGGAL & KONTAK */}
          <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
              <span className="text-amber-500 font-serif text-lg">III.</span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">Waktu & Kontak</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Tanggal Datang</label>
                <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full p-3.5 rounded-xl border border-neutral-800 bg-neutral-900 text-sm text-gray-100 focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama..." value={namaPelanggan} onChange={(e) => setNamaPelanggan(e.target.value)} className="w-full p-3.5 rounded-xl border border-neutral-800 bg-neutral-900 text-sm text-gray-100 focus:border-amber-500 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">WhatsApp</label>
                  <input type="tel" placeholder="0812..." value={nomorHp} onChange={(e) => setNomorHp(e.target.value)} className="w-full p-3.5 rounded-xl border border-neutral-800 bg-neutral-900 text-sm text-gray-100 focus:border-amber-500 focus:outline-none" />
                </div>
              </div>

              {/* SLOT WAKTU */}
              <div className="md:col-span-2 mt-4 pt-4 border-t border-neutral-800">
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-3">Pilih Jam Operasional</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {slotWaktu.map((slot) => {
                    const isBooked = jamSudahDipesan.includes(slot);
                    return (
                      <button type="button" key={slot} disabled={isBooked || !tanggal || !selectedKapster} onClick={() => setJam(slot)}
                        className={`py-3 rounded-lg text-xs font-mono transition-all ${!tanggal || !selectedKapster ? "bg-neutral-950 text-neutral-700 cursor-not-allowed" : isBooked ? "bg-neutral-900 text-neutral-600 line-through cursor-not-allowed" : jam === slot ? "bg-amber-500 text-black font-bold" : "bg-neutral-900 border border-neutral-800 text-gray-300 hover:border-neutral-600"}`}>
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-amber-500/10 disabled:bg-neutral-800 disabled:text-gray-500">
            {submitting ? "MEMPROSES RESERVASI..." : "KONFIRMASI BOOKING VIA WA"}
          </button>
        </form>
      </div>
    </main>
  );
}