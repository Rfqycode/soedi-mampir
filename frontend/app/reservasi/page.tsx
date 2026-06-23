// Ganti bagian UI loading, error, dan return utama dengan kode di bawah ini:

if (loading) return (
  <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
    <p className="text-slate-600 font-medium text-xs tracking-wider">Menyiapkan halaman...</p>
  </div>
);

if (error) return (
  <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl mb-3 mx-auto">⚠️</div>
    <h2 className="text-lg font-bold text-slate-800 mb-1">Gagal Memuat Data</h2>
    <p className="text-slate-500 max-w-sm text-xs mb-5">{error}</p>
    <button onClick={() => window.location.reload()} className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors">Segarkan Halaman</button>
  </div>
);

return (
  <main className="min-h-screen bg-[#F8FAFC] text-slate-800 pt-16 pb-20 px-4 font-sans antialiased">
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Atur Jadwal Kunjungan</h1>
        <p className="text-slate-500 text-sm mt-1">Silakan lengkapi formulir reservasi online di bawah ini.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: KAPSTER HORIZONTAL STYLE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">1. Pilih Kapster</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {kapsters.slice(0, 2).map((kapster) => {
              const isSelected = selectedKapster === kapster.id;
              const isDisabled = !kapster.status_aktif;
              return (
                <div key={kapster.id} onClick={() => !isDisabled && setSelectedKapster(kapster.id)}
                  className={`p-3 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${isDisabled ? "opacity-40 bg-slate-50 cursor-not-allowed border-transparent" : isSelected ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                    <img src={kapster.nama.toLowerCase().includes("fadil") ? "/images/bang_fadil.jpg" : "/images/bang_fredo.jpg"} alt={kapster.nama} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-800">{kapster.nama}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isDisabled ? "Tidak Aktif" : isSelected ? "Terpilih" : "Tersedia"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: LAYANAN LIST DESIGN */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">2. Pilih Layanan</h2>
          <div className="space-y-2">
            {layonans.map((layanan) => (
              <div key={layanan.id} onClick={() => setSelectedLayanan(layanan.id)}
                className={`p-3.5 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${selectedLayanan === layanan.id ? "border-indigo-600 bg-indigo-50/40" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${selectedLayanan === layanan.id ? "border-indigo-600 bg-indigo-600" : "border-slate-300 bg-white"}`}>
                    {selectedLayanan === layanan.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{layanan.nama_layanan}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{formatRupiah(layanan.harga)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 3: DATA & JAM */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Tanggal & Biodata</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Pilih Tanggal</label>
              <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Nama Lengkap</label>
                <input type="text" placeholder="John Doe" value={namaPelanggan} onChange={(e) => setNamaPelanggan(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">No. WhatsApp</label>
                <input type="tel" placeholder="08xxxx" value={nomorHp} onChange={(e) => setNomorHp(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>

          {/* JAM SLOTS PADA MINIMALIST */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-medium text-slate-600 block mb-2">Pilih Jam Kedatangan</label>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {slotWaktu.map((slot) => {
                const isBooked = jamSudahDipesan.includes(slot);
                return (
                  <button type="button" key={slot} disabled={isBooked || !tanggal || !selectedKapster} onClick={() => setJam(slot)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${!tanggal || !selectedKapster ? "bg-slate-50 text-slate-300 cursor-not-allowed" : isBooked ? "bg-slate-100 text-slate-400 line-through cursor-not-allowed" : jam === slot ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:bg-slate-300">
          {submitting ? "Memproses..." : "Selesaikan Reservasi"}
        </button>
      </form>
    </div>
  </main>
);