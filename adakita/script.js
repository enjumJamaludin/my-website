// ===========================
// Data Jasa (dengan kontak WA & IG)
// ===========================
const services = [
  {
    id: 1,
    title: "Servis AC (Cuci + Isi Freon)",
    category: "AC",
    price: 200000,
    duration: "2–3 jam",
    rating: 4.7,
    desc: "Layanan servis lengkap termasuk pembersihan unit indoor/outdoor, isi freon, dan pengecekan kebocoran.",
    wa: "6285770765809",
    ig: "https://www.instagram.com/adakita5.id?utm_source=qr&igsh=NWJ5cmtyMW40d2l6"
  },
  {

    id: 2,
    title: "Bersih Rumah (Deep Cleaning)",
    category: "Cleaning",
    price: 150000,
    duration: "3 jam",
    rating: 4.6,
    desc: "Deep cleaning untuk kamar, dapur, kamar mandi, dan ruang tamu menggunakan peralatan profesional.",
    wa: "6285770765809",
    ig: "https://www.instagram.com/adakita5.id?utm_source=qr&igsh=NWJ5cmtyMW40d2l6"
  },
  {
    id: 3,
    title: "Pangkas Rambut Panggilan",
    category: "Hair",
    price: 50000,
    duration: "45 menit",
    rating: 4.4,
    desc: "Pangkas rambut modern dan rapi langsung di rumah, cocok untuk anak-anak dan dewasa.",
    wa: "6285770765809",
    ig: "https://www.instagram.com/adakita5.id?utm_source=qr&igsh=NWJ5cmtyMW40d2l6"
  },
  {
    id: 4,
    title: "Montir Motor Panggilan",
    category: "Mechanic",
    price: 90000,
    duration: "1 jam",
    rating: 4.5,
    desc: "Perbaikan ringan, ganti oli, dan servis umum motor langsung di lokasi Anda.",
    wa: "6285770765809",
    ig: "https://www.instagram.com/adakita5.id?utm_source=qr&igsh=NWJ5cmtyMW40d2l6"
  },
  {
    id: 5,
    title: "Tukang Ledeng (Perbaikan Bocor)",
    category: "Plumbing",
    price: 120000,
    duration: "1–2 jam",
    rating: 4.3,
    desc: "Perbaikan kebocoran air, ganti pipa rusak, atau pasang keran baru dengan cepat dan rapi.",
    wa: "6285770765809",
    ig: "https://www.instagram.com/adakita5.id?utm_source=qr&igsh=NWJ5cmtyMW40d2l6"
  },
  {
    id: 6,
    title: "Cuci Motor Panggilan",
    category: "Cleaning",
    price: 40000,
    duration: "30 menit",
    rating: 4.2,
    desc: "Cuci motor profesional di tempat Anda dengan hasil kinclong dan cepat.",
    wa: "6285770765809",
    ig: "https://www.instagram.com/adakita5.id?utm_source=qr&igsh=NWJ5cmtyMW40d2l6"
  }
];

// ===========================
// Utility: Format Rupiah
// ===========================
function formatRp(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

// ===========================
// Render Daftar Jasa
// ===========================
const container = document.getElementById("servicesContainer");

function renderServices(list) {
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = `
      <div class="col-span-full text-center text-slate-500">
        Tidak ada layanan ditemukan.
      </div>
    `;
    return;
  }

  list.forEach((s) => {
    const card = document.createElement("article");
    card.className =
      "bg-white rounded-lg p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition";

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between">
          <h4 class="font-semibold text-slate-800">${s.title}</h4>
          <span class="text-sm text-slate-500">${s.duration}</span>
        </div>
        <p class="mt-2 text-sm text-slate-600">${s.desc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <div>
          <div class="text-lg font-bold text-blue-600">${formatRp(s.price)}</div>
          <div class="text-xs text-slate-500">⭐ ${s.rating} • ${s.category}</div>
        </div>
        <div class="flex flex-col gap-2">
          <button 
            class="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition bookBtn"
            data-id="${s.id}">
            Pesan
          </button>
          <a href="${s.ig}" target="_blank" 
            class="px-3 py-2 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 text-center">
            Instagram
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Event klik tombol Pesan -> kirim ke WhatsApp
  document.querySelectorAll(".bookBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const svc = services.find((x) => x.id === id);

      const message = `Halo, saya ingin memesan layanan:\n\n*${svc.title}*\nHarga: ${formatRp(svc.price)}\nDurasi: ${svc.duration}\n\nApakah layanan ini tersedia hari ini?`;

      const waLink = `https://wa.me/${svc.wa}?text=${encodeURIComponent(message)}`;
      window.open(waLink, "_blank");
    });
  });
}

// ===========================
// Filter dan Sorting
// ===========================
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

function applyFilters() {
  const cat = categoryFilter.value;
  const sort = sortFilter.value;

  let result = services.filter((s) => !cat || s.category === cat);

  if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
  if (sort === "popular") result.sort((a, b) => b.rating - a.rating);

  renderServices(result);
}

categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
renderServices(services);

// ===========================
// Footer Tahun Otomatis
// ===========================
document.getElementById("year").textContent = new Date().getFullYear();

// ===========================
// Tombol Login (demo)
// ===========================
document.getElementById("openLogin").addEventListener("click", () => {
  alert("🔐 Fitur login akan tersedia di versi berikutnya.");
});
