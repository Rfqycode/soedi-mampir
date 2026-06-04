"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  // ==========================================
  // 1. SEMUA STATE HARUS DI PALING ATAS
  // ==========================================
  // State untuk form login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State untuk Dashboard Bos
  const [daftarBooking, setDaftarBooking] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // ==========================================
  // 2. SEMUA USE-EFFECT HARUS DI SINI
  // ==========================================
  // Cek apakah Bang Fadil punya "ID Card" (Token) saat web dibuka
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Kalau isLoggedIn berubah jadi true (sukses login), langsung tarik data
  useEffect(() => {
    if (isLoggedIn) {
      fetchJadwal();
    }
  }, [isLoggedIn]);

  // ==========================================
  // 3. FUNGSI LOGIKA / HANDLER (API, dll)
  // ==========================================
  const fetchJadwal = async () => {
    setLoadingData(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch("https://soedi-mampir-production.up.railway.app/api/daftar-pesanan/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.ok) {
        const data = await res.json();
        setDaftarBooking(data);
      } else {
        console.error("Gagal ambil data. Token mungkin kedaluwarsa.");
      }
    } catch (err) {
      console.error("Error jaringan:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://soedi-mampir-production.up.railway.app/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setIsLoggedIn(true);
      } else {
        setError("Username atau password salah, Bang!");
      }
    } catch (err) {
      setError("Gagal terhubung ke server Django. Pastikan server nyala.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  // ==========================================
  // 4. BAGIAN TAMPILAN (UI)
  // ==========================================

  // TAMPILAN JIKA BELUM LOGIN
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F5F3EC] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-[2rem] border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Login Page</h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Khusus Owner & Staff</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 text-sm font-bold text-center rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1A1A1A] outline-none transition-all font-medium"
                placeholder="fadil_bos"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1A1A1A] outline-none transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-[#1A1A1A] text-white font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-400"
            >
              {loading ? "Mengecek..." : "Buka Pintu"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TAMPILAN DASHBOARD
  return (
    <main className="min-h-screen bg-[#F5F3EC] text-[#1A1A1A] px-8 pb-8 pt-40 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b-4 border-[#1A1A1A] pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            DASHBOARD
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-red-200 hover:bg-red-100 transition-colors"
          >
            Keluar (Logout)
          </button>
        </header>

        {/* Tabel Data Database */}
        <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase">Jadwal Masuk</h2>
            <button onClick={fetchJadwal} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black border px-3 py-1 rounded-lg">
              🔄 Refresh
            </button>
          </div>

          {loadingData ? (
            <div className="text-center py-12 text-gray-500 font-bold animate-pulse uppercase">Mengambil data dari brankas...</div>
          ) : daftarBooking.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-bold uppercase">Belum ada bookingan masuk.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 uppercase text-xs tracking-widest text-gray-500">
                  <tr>
                    <th className="p-4 rounded-tl-xl border-b-2">Pelanggan</th>
                    <th className="p-4 border-b-2">Kontak</th>
                    <th className="p-4 border-b-2">Kapster</th>
                    <th className="p-4 border-b-2">Tanggal & Waktu</th>
                    <th className="p-4 rounded-tr-xl border-b-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarBooking.map((booking, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-bg-50 transition-colors">
                      <td className="p-4 font-bold">{booking.nama_pelanggan}</td>
                      <td className="p-4 font-medium text-gray-600">{booking.no_whatsapp}</td>
                      <td className="p-4 font-bold text-[#1A1A1A]">
                        {booking.nama_kapster || `ID Kapster: ${booking.kapster}`}
                      </td>
                      <td className="p-4 font-medium text-gray-600">
                        <span className="bg-gray-200 px-2 py-1 rounded text-xs text-black mr-2">{booking.tanggal}</span>
                        {booking.jam_booking}
                      </td>
                      <td className="p-4 text-right font-black">
                        Rp {booking.total_harga?.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}