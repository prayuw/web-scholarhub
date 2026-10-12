/* =========================================================
   script.js — SATU-SATUNYA FILE JAVASCRIPT SCHOLARHUB
   =========================================================
   Struktur:
   1) BAGIAN GLOBAL : berjalan di semua halaman (sprite ikon,
      menu responsif, link aktif, modal, toast, utilitas).
   2) DATA DEMO     : lomba & beasiswa (dipakai halaman katalog).
   3) KODE HALAMAN  : tiap bagian dibungkus IIFE + cek
      document.body.dataset.page, sehingga hanya berjalan
      di halamannya masing-masing.
   ========================================================= */

/* =========================================================
   1) BAGIAN GLOBAL — berjalan di semua halaman
   ========================================================= */

/* 1a) Sprite ikon SVG (sekali definisi, dipakai semua halaman) */
const SPRITE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
  <symbol id="i-cap" viewBox="0 0 24 24"><path d="M12 3 1 8l11 5 9-4.1V15h2V8z"/><path d="M5 11v4c0 1.6 3.1 3 7 3s7-1.4 7-3v-4"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></symbol>
  <symbol id="i-book" viewBox="0 0 24 24"><path d="M12 6c-2-1.6-5-2-8-2v14c3 0 6 .4 8 2 2-1.6 5-2 8-2V4c-3 0-6 .4-8 2z"/><path d="M12 6v14"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3"/></symbol>
  <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/></symbol>
  <symbol id="i-rocket" viewBox="0 0 24 24"><path d="M12 2c4 2 6 5.5 6 10l-3 3H9l-3-3c0-4.5 2-8 6-10z"/><circle cx="12" cy="9" r="2"/><path d="M8 15l-2 5M16 15l2 5"/></symbol>
  <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5 9.5 18 20 6.5"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h16M13 5l7 7-7 7"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></symbol>
  <symbol id="i-wallet" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M5 20v-6M11 20V8M17 20v-10M3 20h18"/></symbol>
  <symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 12h6M9 16h6"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></symbol>
  <symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20h4L20 8l-4-4L4 16z"/><path d="M13 7l4 4"/></symbol>
  <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>
  <symbol id="i-upload" viewBox="0 0 24 24"><path d="M12 21V9M7 14l5-5 5 5M4 3h16"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></symbol>
  <symbol id="i-filter" viewBox="0 0 24 24"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></symbol>
  <symbol id="i-flask" viewBox="0 0 24 24"><path d="M9 3h6M10 3v5l-6 9a3 3 0 0 0 3 4.5h10a3 3 0 0 0 3-4.5l-6-9V3M7.5 14h9"/></symbol>
  <symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/></symbol>
  <symbol id="i-palette" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16" cy="10" r="1.2"/><path d="M12 21a3 3 0 0 0 0-6h-1.5"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 5-5"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/></symbol>
  <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></symbol>
  <symbol id="i-card" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></symbol>
</svg>`;
document.body.insertAdjacentHTML("afterbegin", SPRITE_SVG);

/* 1b) Menu navigasi responsif */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const terbuka = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", terbuka);
  });
  navMenu
    .querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => navMenu.classList.remove("open")),
    );
}

/* 1c) Tandai link navbar yang aktif */
const halamanAktif = document.body.dataset.page;
document.querySelectorAll(".nav-link").forEach((a) => {
  if (a.dataset.nav === halamanAktif) a.classList.add("active");
});

/* 1d) Modal generik */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add("show");
  m.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const c = m.querySelector(".modal-close");
  if (c) c.focus();
}
function closeModal(m) {
  if (typeof m === "string") m = document.getElementById(m);
  if (!m) return;
  m.classList.remove("show");
  m.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
/* klik tombol [data-close] atau area gelap untuk menutup */
document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("modal-overlay")) {
    closeModal(e.target);
    return;
  }
  const t = e.target.closest("[data-close]");
  if (t) closeModal(t.closest(".modal-overlay"));
});
/* tombol Escape juga menutup modal */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape")
    document.querySelectorAll(".modal-overlay.show").forEach(closeModal);
});

/* 1e) Toast (notifikasi kecil) */
function showToast(pesan, tipe) {
  let box = document.getElementById("toastBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "toastBox";
    box.className = "toast-box";
    document.body.appendChild(box);
  }
  const el = document.createElement("div");
  el.className = "toast" + (tipe ? " " + tipe : "");
  const ikon = tipe === "sukses" ? "#i-check" : "#i-info";
  el.innerHTML = `<svg class="icon"><use href="${ikon}"></use></svg><span>${pesan}</span>`;
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 320);
  }, 3200);
}

/* 1f) Utilitas tanggal, mata uang, dan teks */
function inDays(n) {
  // tanggal ISO n hari dari sekarang (n negatif = masa lalu)
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function daysLeft(iso) {
  const a = new Date();
  a.setHours(0, 0, 0, 0);
  const b = new Date(iso + "T00:00:00");
  return Math.round((b - a) / 86400000);
}
function fmtRp(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function deadlineBadge(iso) {
  // badge sisa hari menuju deadline
  const d = daysLeft(iso);
  let cls = "",
    teks;
  if (d < 0) {
    cls = "badge-red";
    teks = "Ditutup";
  } else if (d === 0) {
    cls = "badge-red";
    teks = "Hari ini";
  } else if (d <= 7) {
    cls = "badge-red";
    teks = d + " hari lagi";
  } else if (d <= 14) {
    cls = "badge-yellow";
    teks = d + " hari lagi";
  } else {
    teks = d + " hari lagi";
  }
  return `<span class="badge ${cls}">${teks}</span>`;
}

/* 1g) Tahun footer otomatis */
document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

/* =========================================================
   2) DATA DEMO BERSAMA — lomba & beasiswa
   Seluruh entri adalah DATA CONTOH untuk demo tugas kuliah.
   Deadline dihitung relatif terhadap tanggal hari ini.
   Tautan pendaftaran mengarah ke example.com (belum diverifikasi).
   ========================================================= */
const DATA_LOMBA = [
  {
    id: "lmb-01",
    judul: "Kompetisi Karya Ilmiah Mahasiswa Nusantara",
    penyelenggara: "Lembaga Riset Pemuda (contoh)",
    kategori: "Karya Tulis Ilmiah",
    tingkat: "Nasional",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Total Rp 25.000.000",
    deadline: inDays(18),
    ditambahkan: inDays(-2),
    deskripsi:
      "Kompetisi penulisan karya tulis ilmiah lintas disiplin untuk mahasiswa D3 hingga S1. Peserta diadu dalam tahap proposal, revisi berdasarkan umpan balik juri, hingga presentasi final.",
    persyaratan: [
      "Mahasiswa aktif D3/S1 dari perguruan tinggi mana pun",
      "Karya tulis asli dan belum pernah dipublikasikan",
      "Tim beranggotakan 1-3 orang",
      "Berkas dikumpulkan melalui formulir pendaftaran daring",
    ],
    skill: ["Menulis", "Riset"],
    minat: ["Karya Tulis Ilmiah"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-karya-ilmiah",
  },
  {
    id: "lmb-02",
    judul: "Hackathon Smart City",
    penyelenggara: "Komunitas Teknologi Kota (contoh)",
    kategori: "Sains & Teknologi",
    tingkat: "Regional",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Modal pengembangan Rp 15.000.000",
    deadline: inDays(12),
    ditambahkan: inDays(-1),
    deskripsi:
      "Hackathon 48 jam untuk merancang solusi digital bagi permasalahan kota: transportasi, sampah, hingga layanan publik. Prototipe dinilai langsung oleh praktisi industri.",
    persyaratan: [
      "Tim 3-4 mahasiswa",
      "Mahasiswa aktif di wilayah regional terkait",
      "Membawa laptop sendiri selama acara",
      "Wajib hadir penuh selama 48 jam kompetisi",
    ],
    skill: ["Coding", "Analisis Data"],
    minat: ["Sains & Teknologi"],
    jurusan: [
      "Informatika",
      "Sistem Informasi",
      "Teknik Elektro",
      "Teknik Komputer",
    ],
    link: "https://example.com/daftar-hackathon",
  },
  {
    id: "lmb-03",
    judul: "Lomba Desain Poster Digital Nasional",
    penyelenggara: "Komunitas Desain Kampus (contoh)",
    kategori: "Seni & Desain",
    tingkat: "Nasional",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Hadiah utama Rp 5.000.000",
    deadline: inDays(9),
    ditambahkan: inDays(-4),
    deskripsi:
      "Kompetisi desain poster bertema pelestarian budaya lokal. Karya dinilai dari konsep, komposisi, dan kekuatan pesan visual.",
    persyaratan: [
      "Individu, mahasiswa aktif apa pun jurusannya",
      "Karya orisinal, dibuat khusus untuk lomba ini",
      "Format file JPG/PDF dengan resolusi minimal 300 dpi",
      "Melampirkan deskripsi konsep maksimal 150 kata",
    ],
    skill: ["Desain Grafis"],
    minat: ["Seni & Desain"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-desain-poster",
  },
  {
    id: "lmb-04",
    judul: "Business Plan Competition",
    penyelenggara: "Inkubator Bisnis Kampus (contoh)",
    kategori: "Bisnis & Startup",
    tingkat: "Nasional",
    biaya: "Berbayar",
    biayaDetail: "Rp 100.000 / tim",
    hadiah: "Total Rp 30.000.000 + inkubasi bisnis",
    deadline: inDays(24),
    ditambahkan: inDays(-6),
    deskripsi:
      "Kompetisi rencana bisnis untuk mahasiswa yang ingin memulai usaha. Finalis mendampingi pitching di hadapan investor dan mendapat sesi inkubasi intensif.",
    persyaratan: [
      "Tim 2-3 mahasiswa dari kampus yang sama",
      "Proposal bisnis 10-15 halaman sesuai template",
      "Membayar biaya pendaftaran per tim",
      "Siap melakukan pitching 10 menit bila lolos final",
    ],
    skill: ["Menulis", "Presentasi", "Analisis Data"],
    minat: ["Bisnis & Startup"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-business-plan",
  },
  {
    id: "lmb-05",
    judul: "Lomba Esai Pembangunan Berkelanjutan",
    penyelenggara: "Forum Pemuda Lingkungan (contoh)",
    kategori: "Sosial & Lingkungan",
    tingkat: "Nasional",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Total Rp 8.000.000",
    deadline: inDays(7),
    ditambahkan: inDays(-3),
    deskripsi:
      "Esai bertema solusi pembangunan berkelanjutan dari perspektif anak muda. Sepuluh esai terbaik diterbitkan dalam antologi digital.",
    persyaratan: [
      "Peserta individu, mahasiswa aktif S1/D3",
      "Esai 1.000-1.500 kata, bahasa Indonesia baku",
      "Mengacu minimal pada dua sumber rujukan",
      "Esai belum pernah diikutsertakan lomba lain",
    ],
    skill: ["Menulis", "Riset"],
    minat: ["Sosial & Lingkungan", "Karya Tulis Ilmiah"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-esai",
  },
  {
    id: "lmb-06",
    judul: "Competitive Programming Contest",
    penyelenggara: "Himpunan Mahasiswa Informatika (contoh)",
    kategori: "Sains & Teknologi",
    tingkat: "Nasional",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Total Rp 12.000.000",
    deadline: inDays(28),
    ditambahkan: inDays(-5),
    deskripsi:
      "Kompetisi pemrograman kompetitif bergaya kontes algoritmik 5 jam. Soal disusun dari level mudah hingga menantang dengan sistem penilaian otomatis.",
    persyaratan: [
      "Tim 3 mahasiswa dari kampus yang sama",
      "Peserta boleh dari jurusan apa pun",
      "Menguasai minimal satu bahasa pemrograman",
      "Mengikuti sesi briefing daring sebelum kontes",
    ],
    skill: ["Coding"],
    minat: ["Sains & Teknologi"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-cpc",
  },
  {
    id: "lmb-07",
    judul: "Global Startup Pitch Challenge",
    penyelenggara: "Youth Entrepreneur Network (contoh)",
    kategori: "Bisnis & Startup",
    tingkat: "Internasional",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Seed funding USD 5.000",
    deadline: inDays(40),
    ditambahkan: inDays(-8),
    deskripsi:
      "Tantangan pitching startup untuk mahasiswa di kawasan Asia Tenggara. Pitch dilakukan dalam bahasa Inggris melalui panggung daring.",
    persyaratan: [
      "Tim 1-4 mahasiswa",
      "Pitch deck maksimal 10 slide dalam bahasa Inggris",
      "Rekam video pitching 3 menit",
      "Produk minimal sudah berupa prototipe",
    ],
    skill: ["Presentasi", "Analisis Data"],
    minat: ["Bisnis & Startup"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-global-pitch",
  },
  {
    id: "lmb-08",
    judul: "Festival Video Pendek Edukasi",
    penyelenggara: "Dinas Pendidikan Kota (contoh)",
    kategori: "Seni & Desain",
    tingkat: "Lokal",
    biaya: "Gratis",
    biayaDetail: "Gratis",
    hadiah: "Total Rp 6.000.000",
    deadline: inDays(5),
    ditambahkan: inDays(-1),
    deskripsi:
      "Festival video pendek bertema edukasi literasi digital untuk pelajar dan mahasiswa di tingkat kota. Karya terbaik diputar di acara utama festival.",
    persyaratan: [
      "Peserta individu atau tim maksimal 3 orang",
      "Durasi video 3-5 menit",
      "Video dibuat khusus untuk festival ini",
      "Menyertakan link video yang dapat diakses juri",
    ],
    skill: ["Desain Grafis"],
    minat: ["Seni & Desain"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-video-edukasi",
  },
];

const DATA_BEASISWA = [
  {
    id: "bsw-01",
    nama: "Beasiswa Prestasi Akademik Nusantara",
    penyelenggara: "Yayasan Pendidikan Cahaya (contoh)",
    jenis: "Prestasi",
    jenjang: ["S1"],
    cakupan: "Nasional",
    semesterMin: 2,
    semesterMax: 6,
    deadline: inDays(21),
    ditambahkan: inDays(-2),
    deskripsi:
      "Beasiswa penuh untuk mahasiswa S1 berprestasi akademik dari keluarga kurang mampu, mencakup biaya kuliah dan uang saku bulanan.",
    persyaratan: [
      "IPK minimal 3,25",
      "Mahasiswa aktif semester 2-6",
      "Tidak sedang menerima beasiswa lain",
      "Berasal dari keluarga dengan penghasilan di bawah ketentuan",
    ],
    dokumen: [
      "Transkrip nilai",
      "KRS aktif",
      "Surat rekomendasi dosen",
      "Esai motivasi 500 kata",
    ],
    manfaat: [
      "Biaya kuliah penuh selama 1 tahun",
      "Uang saku Rp 1.500.000/bulan",
      "Program pengembangan kepemimpinan",
    ],
    minat: [],
    skill: [],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-prestasi",
  },
  {
    id: "bsw-02",
    nama: "Beasiswa Riset Teknologi Terapan",
    penyelenggara: "Pusat Inovasi Teknologi (contoh)",
    jenis: "Riset",
    jenjang: ["S1", "S2"],
    cakupan: "Nasional",
    semesterMin: 5,
    semesterMax: 8,
    deadline: inDays(34),
    ditambahkan: inDays(-4),
    deskripsi:
      "Dana riset bagi mahasiswa yang sedang mengerjakan tugas akhir atau penelitian di bidang teknologi terapan.",
    persyaratan: [
      "Sedang menyusun tugas akhir/tesis bertema teknologi",
      "Memiliki dosen pembimbing yang bersedia mengawasi",
      "Proposal riset maksimal 5 halaman",
      "IPK minimal 3,00",
    ],
    dokumen: [
      "Proposal riset",
      "Transkrip nilai",
      "Surat kesediaan pembimbing",
      "KTM aktif",
    ],
    manfaat: [
      "Dana riset hingga Rp 10.000.000",
      "Akses laboratorium mitra",
      "Publikasi gratis di jurnal mitra",
    ],
    minat: ["Sains & Teknologi"],
    skill: ["Riset", "Coding"],
    jurusan: [
      "Informatika",
      "Sistem Informasi",
      "Teknik Elektro",
      "Teknik Komputer",
    ],
    link: "https://example.com/daftar-beasiswa-riset",
  },
  {
    id: "bsw-03",
    nama: "Beasiswa Wirausaha Muda",
    penyelenggara: "Koperasi Mahasiswa Mandiri (contoh)",
    jenis: "Parsial",
    jenjang: ["S1"],
    cakupan: "Nasional",
    semesterMin: 4,
    semesterMax: 8,
    deadline: inDays(16),
    ditambahkan: inDays(-3),
    deskripsi:
      "Bantuan biaya kuliah bagi mahasiswa yang menjalankan usaha mikro dan ingin mengembangkannya sambil kuliah.",
    persyaratan: [
      "Memiliki usaha yang sudah berjalan minimal 6 bulan",
      "Mahasiswa aktif semester 4 ke atas",
      "Bersedia mengikuti kelas wirausaha wajib",
      "Lampiran foto/faktur usaha",
    ],
    dokumen: [
      "Bukti usaha",
      "Transkrip nilai",
      "KRS aktif",
      "Esai perjalanan usaha",
    ],
    manfaat: [
      "Bantuan biaya kuliah 50% per semester",
      "Mentoring bisnis bulanan",
      "Akses jaringan pemasaran koperasi",
    ],
    minat: ["Bisnis & Startup"],
    skill: ["Presentasi"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-wirausaha",
  },
  {
    id: "bsw-04",
    nama: "Beasiswa Seni dan Budaya",
    penyelenggara: "Dinas Kebudayaan Provinsi (contoh)",
    jenis: "Parsial",
    jenjang: ["D3", "S1"],
    cakupan: "Daerah",
    semesterMin: 2,
    semesterMax: 8,
    deadline: inDays(11),
    ditambahkan: inDays(-1),
    deskripsi:
      "Beasiswa untuk mahasiswa berbakat di bidang seni dan budaya daerah yang berkontribusi pada komunitas seni kampus.",
    persyaratan: [
      "Aktif di unit kegiatan seni kampus",
      "Portofolio karya seni (foto/video)",
      "Mahasiswa D3/S1 semester 2 ke atas",
      "Domisili di provinsi penyelenggara",
    ],
    dokumen: [
      "Portofolio karya",
      "Surat keterangan UKM seni",
      "Transkrip nilai",
      "Kartu keluarga",
    ],
    manfaat: [
      "Bantuan biaya kuliah 50% per semester",
      "Pelatihan seni intensif",
      "Panggung pementian tahunan",
    ],
    minat: ["Seni & Desain"],
    skill: ["Desain Grafis"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-seni",
  },
  {
    id: "bsw-05",
    nama: "Beasiswa Bantuan Biaya Pendidikan Daerah",
    penyelenggara: "Yayasan Peduli Pendidikan Lokal (contoh)",
    jenis: "Afirmasi",
    jenjang: ["D3", "S1"],
    cakupan: "Daerah",
    semesterMin: 1,
    semesterMax: 8,
    deadline: inDays(13),
    ditambahkan: inDays(-5),
    deskripsi:
      "Bantuan biaya pendidikan bagi mahasiswa berprestasi dari keluarga prasejahtera di tingkat kabupaten/kota.",
    persyaratan: [
      "Mahasiswa D3/S1 aktif",
      "Kartu bantuan pemerintah atau surat keterangan tidak mampu",
      "IPK minimal 2,75",
      "Berasal dari kabupaten/kota penyelenggara",
    ],
    dokumen: [
      "Kartu bantuan / surat keterangan",
      "Transkrip nilai",
      "KTM aktif",
      "Fotokopi rekening orang tua",
    ],
    manfaat: [
      "Bantuan biaya kuliah Rp 5.000.000/semester",
      "Bantuan biaya buku",
      "Konseling akademik",
    ],
    minat: [],
    skill: [],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-daerah",
  },
  {
    id: "bsw-06",
    nama: "Beasiswa Pertukaran Mahasiswa Internasional",
    penyelenggara: "Global Youth Exchange Institute (contoh)",
    jenis: "Parsial",
    jenjang: ["S1"],
    cakupan: "Internasional",
    semesterMin: 3,
    semesterMax: 6,
    deadline: inDays(45),
    ditambahkan: inDays(-7),
    deskripsi:
      "Beasiswa parsial program pertukaran satu semester ke universitas mitra di kawasan Asia dan Eropa.",
    persyaratan: [
      "Mahasiswa S1 semester 3-6",
      "Kemampuan bahasa Inggris (IELTS 6.0 atau TOEFL iBT 80)",
      "IPK minimal 3,00",
      "Surat rekomendasi dari fakultas",
    ],
    dokumen: [
      "Sertifikat bahasa",
      "Transkrip nilai",
      "Surat rekomendasi",
      "Paspor aktif",
    ],
    manfaat: [
      "Tanggungan tiket dan asrama",
      "Bantuan biaya hidup bulanan",
      "Sertifikat program internasional",
    ],
    minat: [],
    skill: ["Presentasi"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-exchange",
  },
  {
    id: "bsw-07",
    nama: "Beasiswa Penulis Muda",
    penyelenggara: "Rumah Literasi Nasional (contoh)",
    jenis: "Prestasi",
    jenjang: ["S1", "S2"],
    cakupan: "Nasional",
    semesterMin: 2,
    semesterMax: 8,
    deadline: inDays(26),
    ditambahkan: inDays(-2),
    deskripsi:
      "Beasiswa bagi mahasiswa yang aktif menulis dan telah menerbitkan karya di media kampus maupun nasional.",
    persyaratan: [
      "Memiliki minimal 2 karya terbit (esai/artikel/fiksi)",
      "Mahasiswa aktif S1/S2",
      "IPK minimal 3,00",
      "Berkomitmen menulis kolom bulanan selama masa beasiswa",
    ],
    dokumen: [
      "Tautan/lampiran karya terbit",
      "Transkrip nilai",
      "KTM aktif",
      "Esai motivasi",
    ],
    manfaat: [
      "Uang saku Rp 1.000.000/bulan",
      "Kelas penulisan profesional",
      "Kesempatan diterbitkan di antologi",
    ],
    minat: ["Karya Tulis Ilmiah"],
    skill: ["Menulis"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-penulis",
  },
  {
    id: "bsw-08",
    nama: "Beasiswa Pejuang Lingkungan",
    penyelenggara: "Green Campus Coalition (contoh)",
    jenis: "Prestasi",
    jenjang: ["S1"],
    cakupan: "Nasional",
    semesterMin: 2,
    semesterMax: 7,
    deadline: inDays(9),
    ditambahkan: inDays(-1),
    deskripsi:
      "Beasiswa bagi mahasiswa yang menjalankan proyek lingkungan nyata di kampus atau komunitasnya.",
    persyaratan: [
      "Memiliki proyek lingkungan berjalan",
      "Mahasiswa S1 semester 2-7",
      "Bersedia mempresentasikan proyek pada acara tahunan",
      "Laporan kemajuan proyek tiap 3 bulan",
    ],
    dokumen: [
      "Dokumentasi proyek",
      "Transkrip nilai",
      "Surat rekomendasi organisasi",
      "Esai dampak proyek",
    ],
    manfaat: [
      "Dana proyek Rp 7.500.000",
      "Bantuan biaya kuliah 1 semester",
      "Jaringan aktivis lingkungan nasional",
    ],
    minat: ["Sosial & Lingkungan", "Sains & Teknologi"],
    skill: ["Riset"],
    jurusan: ["Semua"],
    link: "https://example.com/daftar-beasiswa-lingkungan",
  },
];

/* =========================================================
   3) HALAMAN UTAMA (index.html)
   ========================================================= */
(function halamanUtama() {
  if (document.body.dataset.page !== "utama") return;

  /* Gabungkan data & beri label jenis */
  const SEMUA_PELUANG = [
    ...DATA_LOMBA.map((x) => ({ ...x, jenisItem: "lomba" })),
    ...DATA_BEASISWA.map((x) => ({
      ...x,
      judul: x.nama,
      jenisItem: "beasiswa",
    })),
  ];

  /* Rotator peluang di hero */
  (function rotator() {
    const wadah = document.getElementById("heroSlides");
    const dots = document.getElementById("heroDots");
    if (!wadah) return;

    const terdekat = [...SEMUA_PELUANG]
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
      .slice(0, 6);
    const jumlahSlide = Math.ceil(terdekat.length / 2);
    let idx = 0,
      timer = null;

    const slideHtml = (it) => {
      const isLomba = it.jenisItem === "lomba";
      return `<a class="hero-item" href="${isLomba ? "lomba" : "beasiswa"}.html?buka=${it.id}">
        <span class="badge badge-yellow">${
          isLomba
            ? "Lomba · " + escapeHtml(it.kategori)
            : "Beasiswa · " + it.jenis
        }</span>
        <strong>${escapeHtml(it.judul)}</strong>
        <small><svg class="icon"><use href="#i-calendar"></use></svg>
          ${fmtDate(it.deadline)} — ${daysLeft(it.deadline)} hari lagi</small>
      </a>`;
    };

    let htmlSlide = "";
    for (let i = 0; i < jumlahSlide; i++) {
      const isi = terdekat
        .slice(i * 2, i * 2 + 2)
        .map(slideHtml)
        .join("");
      htmlSlide += `<div class="hero-slide${i === 0 ? " aktif" : ""}">${isi}</div>`;
    }
    wadah.innerHTML = htmlSlide;

    dots.innerHTML = Array.from(
      { length: jumlahSlide },
      (_, i) =>
        `<button class="${i === 0 ? "aktif" : ""}" aria-label="Peluang ${i + 1}"></button>`,
    ).join("");

    const semuaSlide = wadah.querySelectorAll(".hero-slide");
    const semuaDot = dots.querySelectorAll("button");

    function tampil(i) {
      semuaSlide.forEach((s, n) => s.classList.toggle("aktif", n === i));
      semuaDot.forEach((d, n) => d.classList.toggle("aktif", n === i));
      idx = i;
    }
    function mulai() {
      clearInterval(timer);
      timer = setInterval(() => tampil((idx + 1) % jumlahSlide), 4200);
    }
    semuaDot.forEach((d, i) =>
      d.addEventListener("click", () => {
        tampil(i);
        mulai();
      }),
    );
    mulai();
  })();

  /* Statistik count-up saat terlihat */
  (function statistik() {
    const strip = document.querySelector(".stats-strip");
    if (!strip) return;

    function animasi(el) {
      const target = +el.dataset.count,
        durasi = 1300,
        mulai = performance.now();
      (function tick(t) {
        const p = Math.min(1, (t - mulai) / durasi);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); // ease-out
        if (p < 1) requestAnimationFrame(tick);
      })(mulai);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            strip.querySelectorAll("[data-count]").forEach(animasi);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(strip);
  })();

  /* Jumlah item per kategori */
  document.getElementById("count-snt").textContent = DATA_LOMBA.filter(
    (l) => l.kategori === "Sains & Teknologi",
  ).length;
  document.getElementById("count-bis").textContent = DATA_LOMBA.filter(
    (l) => l.kategori === "Bisnis & Startup",
  ).length;
  document.getElementById("count-seni").textContent = DATA_LOMBA.filter(
    (l) => l.kategori === "Seni & Desain",
  ).length;
  document.getElementById("count-bea").textContent = DATA_BEASISWA.length;

  /* Tab lomba / beasiswa terbaru */
  (function terbaru() {
    const grid = document.getElementById("terbaruGrid");
    const teksEl = document.getElementById("terbaruMoreTeks");
    const moreLink = document.getElementById("terbaruMoreLink");
    let tab = "lomba";

    function kartuItem(it) {
      const isLomba = it.jenisItem === "lomba";
      return `<a class="card item-card" href="${isLomba ? "lomba" : "beasiswa"}.html?buka=${it.id}">
        <div class="item-top">
          <span class="badge badge-dark">${isLomba ? escapeHtml(it.kategori) : it.jenis}</span>
          ${deadlineBadge(it.deadline)}
        </div>
        <h3>${escapeHtml(it.judul)}</h3>
        <p class="item-org">${escapeHtml(it.penyelenggara)}</p>
        <p class="item-meta"><svg class="icon"><use href="#i-calendar"></use></svg>
          Deadline ${fmtDate(it.deadline)}</p>
        <span class="item-link">Lihat detail <svg class="icon"><use href="#i-arrow"></use></svg></span>
      </a>`;
    }

    function render() {
      const sumber =
        tab === "lomba"
          ? DATA_LOMBA.map((x) => ({ ...x, jenisItem: "lomba" }))
          : DATA_BEASISWA.map((x) => ({
              ...x,
              judul: x.nama,
              jenisItem: "beasiswa",
            }));
      const items = [...sumber]
        .sort((a, b) =>
          (b.ditambahkan || "").localeCompare(a.ditambahkan || ""),
        )
        .slice(0, 4);
      grid.innerHTML = items.map(kartuItem).join("");
      moreLink.href = tab === "lomba" ? "lomba.html" : "beasiswa.html";
      teksEl.textContent = tab;
    }

    document.querySelectorAll(".tab-btn").forEach((b) =>
      b.addEventListener("click", () => {
        tab = b.dataset.tab;
        document
          .querySelectorAll(".tab-btn")
          .forEach((x) => x.classList.toggle("aktif", x === b));
        render();
      }),
    );
    render();
  })();
})();

/* =========================================================
   4) HALAMAN LOMBA (lomba.html)
   ========================================================= */
(function halamanLomba() {
  if (document.body.dataset.page !== "lomba") return;

  const listEl = document.getElementById("lombaList");
  const emptyEl = document.getElementById("emptyLomba");
  const cariEl = document.getElementById("cariLomba");
  const urutEl = document.getElementById("urutkan");
  const panel = document.getElementById("filterPanel");
  const dlSel = document.getElementById("filterDeadline");
  const modalBody = document.getElementById("modalBody");
  const KATEGORI = [...new Set(DATA_LOMBA.map((l) => l.kategori))];

  /* Render chip kategori (checkbox) secara dinamis */
  document.getElementById("kategoriChips").innerHTML = KATEGORI.map(
    (k) =>
      `<label class="chip"><input type="checkbox" name="kategori" value="${escapeHtml(k)}">
     <span>${escapeHtml(k)}</span></label>`,
  ).join("");

  /* Baca filter dari tampilan */
  function bacaFilter() {
    return {
      q: cariEl.value.trim().toLowerCase(),
      kategori: [
        ...panel.querySelectorAll('input[name="kategori"]:checked'),
      ].map((i) => i.value),
      tingkat: panel.querySelector('input[name="tingkat"]:checked').value,
      biaya: panel.querySelector('input[name="biaya"]:checked').value,
      deadlineMaks: dlSel.value ? +dlSel.value : null,
    };
  }

  /* Cek apakah satu lomba lolos filter */
  function cocok(l, f) {
    if (f.kategori.length && !f.kategori.includes(l.kategori)) return false;
    if (f.tingkat !== "Semua" && l.tingkat !== f.tingkat) return false;
    if (f.biaya !== "Semua" && l.biaya !== f.biaya) return false;
    if (f.deadlineMaks !== null && daysLeft(l.deadline) > f.deadlineMaks)
      return false;
    if (f.q) {
      const teks = (
        l.judul +
        " " +
        l.penyelenggara +
        " " +
        l.kategori +
        " " +
        l.deskripsi
      ).toLowerCase();
      if (!teks.includes(f.q)) return false;
    }
    return true;
  }

  /* Render daftar */
  function render() {
    const f = bacaFilter();
    let hasil = DATA_LOMBA.filter((l) => cocok(l, f));

    if (urutEl.value === "deadline")
      hasil.sort((a, b) => a.deadline.localeCompare(b.deadline));
    else if (urutEl.value === "baru")
      hasil.sort(
        (a, b) =>
          (b.ditambahkan || "").localeCompare(a.ditambahkan || "") ||
          a.deadline.localeCompare(b.deadline),
      );
    else hasil.sort((a, b) => a.judul.localeCompare(b.judul));

    document.getElementById("hasilCount").textContent =
      `Menampilkan ${hasil.length} dari ${DATA_LOMBA.length} lomba`;

    listEl.innerHTML = hasil.map(kartu).join("");
    emptyEl.hidden = hasil.length > 0;
  }

  /* Kartu satu lomba */
  function kartu(l) {
    return `<article class="row-card">
      <div>
        <div class="tag-row">
          <span class="badge badge-dark">${escapeHtml(l.kategori)}</span>
          <span class="badge">${l.tingkat}</span>
          <span class="badge ${l.biaya === "Gratis" ? "badge-green" : "badge-yellow"}">
            ${l.biaya === "Gratis" ? "Gratis" : escapeHtml(l.biayaDetail)}</span>
          ${deadlineBadge(l.deadline)}
        </div>
        <h3><button class="link-judul" data-buka="${l.id}">${escapeHtml(l.judul)}</button></h3>
        <p class="row-org"><svg class="icon"><use href="#i-map-pin"></use></svg>${escapeHtml(l.penyelenggara)}</p>
        <p class="row-desc">${escapeHtml(l.deskripsi)}</p>
        <p class="row-meta"><svg class="icon"><use href="#i-calendar"></use></svg>
          Deadline: <strong>${fmtDate(l.deadline)}</strong> · ${escapeHtml(l.hadiah)}</p>
      </div>
      <div class="row-side">
        <button class="btn btn-outline btn-sm" data-buka="${l.id}">
          <svg class="icon"><use href="#i-doc"></use></svg>Lihat Detail</button>
      </div>
    </article>`;
  }

  /* Modal detail */
  function tampilDetail(id) {
    const l = DATA_LOMBA.find((x) => x.id === id);
    if (!l) return;
    modalBody.innerHTML = `
      <span class="badge badge-solid">${escapeHtml(l.kategori)}</span>
      <h2 class="modal-title" id="modalJudul">${escapeHtml(l.judul)}</h2>
      <p class="modal-org"><svg class="icon"><use href="#i-map-pin"></use></svg>
        Diselenggarakan oleh ${escapeHtml(l.penyelenggara)}</p>
      <div class="meta-grid">
        <div><span>Tingkat</span><strong>${l.tingkat}</strong></div>
        <div><span>Biaya</span><strong>${l.biaya === "Berbayar" ? escapeHtml(l.biayaDetail) : "Gratis"}</strong></div>
        <div><span>Deadline</span><strong>${fmtDate(l.deadline)} ${deadlineBadge(l.deadline)}</strong></div>
        <div><span>Hadiah</span><strong>${escapeHtml(l.hadiah)}</strong></div>
      </div>
      <h3 class="modal-sub">Deskripsi</h3>
      <p class="modal-teks">${escapeHtml(l.deskripsi)}</p>
      <h3 class="modal-sub">Persyaratan</h3>
      <ul class="check-list">
        ${l.persyaratan
          .map(
            (p) => `<li><svg class="icon"><use href="#i-check"></use></svg>
          <span>${escapeHtml(p)}</span></li>`,
          )
          .join("")}
      </ul>
      <div class="modal-cta">
        <a class="btn btn-primary" href="${l.link}" target="_blank" rel="noopener">
          Daftar Sekarang <svg class="icon"><use href="#i-arrow"></use></svg></a>
        <button class="btn btn-outline" data-close>Tutup</button>
      </div>
      <div class="note"><svg class="icon"><use href="#i-info"></use></svg>
        <span>Tautan pendaftaran di atas adalah <b>tautan contoh (example.com)</b> yang belum
        diverifikasi. Pada versi produksi, ScholarHub hanya menampilkan tautan resmi penyelenggara.</span></div>`;
    openModal("modalDetail");
  }

  /* Event */
  cariEl.addEventListener("input", render);
  document.getElementById("btnCari").addEventListener("click", render);
  urutEl.addEventListener("change", render);
  panel.addEventListener("change", render);
  document
    .getElementById("toggleFilter")
    .addEventListener("click", () => panel.classList.toggle("open"));

  function resetFilter() {
    cariEl.value = "";
    urutEl.value = "deadline";
    dlSel.value = "";
    panel
      .querySelectorAll('input[name="kategori"]')
      .forEach((i) => (i.checked = false));
    panel.querySelector('input[name="tingkat"][value="Semua"]').checked = true;
    panel.querySelector('input[name="biaya"][value="Semua"]').checked = true;
    render();
    showToast("Filter telah direset.");
  }
  document.getElementById("resetFilter").addEventListener("click", resetFilter);
  document
    .getElementById("resetFilter2")
    .addEventListener("click", resetFilter);

  listEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-buka]");
    if (b) tampilDetail(b.dataset.buka);
  });

  /* Parameter URL (dari halaman utama) */
  const params = new URLSearchParams(location.search);
  const pk = params.get("kategori");
  if (pk && KATEGORI.includes(pk)) {
    const c = document.querySelector(`#kategoriChips input[value="${pk}"]`);
    if (c) c.checked = true;
  }
  render();
  const pb = params.get("buka");
  if (pb && DATA_LOMBA.some((x) => x.id === pb)) tampilDetail(pb);
})();

/* =========================================================
   5) HALAMAN BEASISWA (beasiswa.html)
   ========================================================= */
(function halamanBeasiswa() {
  if (document.body.dataset.page !== "beasiswa") return;

  const listEl = document.getElementById("beasiswaList");
  const emptyEl = document.getElementById("emptyBeasiswa");
  const cariEl = document.getElementById("cariBeasiswa");
  const urutEl = document.getElementById("urutkan");
  const panel = document.getElementById("filterPanel");
  const dlSel = document.getElementById("filterDeadline");
  const modalBody = document.getElementById("modalBody");

  function bacaFilter() {
    return {
      q: cariEl.value.trim().toLowerCase(),
      jenis: panel.querySelector('input[name="jenis"]:checked').value,
      jenjang: [...panel.querySelectorAll('input[name="jenjang"]:checked')].map(
        (i) => i.value,
      ),
      cakupan: panel.querySelector('input[name="cakupan"]:checked').value,
      deadlineMaks: dlSel.value ? +dlSel.value : null,
    };
  }

  function cocok(b, f) {
    if (f.jenis !== "Semua" && b.jenis !== f.jenis) return false;
    if (f.jenjang.length && !f.jenjang.some((j) => b.jenjang.includes(j)))
      return false;
    if (f.cakupan !== "Semua" && b.cakupan !== f.cakupan) return false;
    if (f.deadlineMaks !== null && daysLeft(b.deadline) > f.deadlineMaks)
      return false;
    if (f.q) {
      const teks = (
        b.nama +
        " " +
        b.penyelenggara +
        " " +
        b.deskripsi
      ).toLowerCase();
      if (!teks.includes(f.q)) return false;
    }
    return true;
  }

  function render() {
    const f = bacaFilter();
    let hasil = DATA_BEASISWA.filter((b) => cocok(b, f));

    if (urutEl.value === "deadline")
      hasil.sort((a, b) => a.deadline.localeCompare(b.deadline));
    else if (urutEl.value === "baru")
      hasil.sort(
        (a, b) =>
          (b.ditambahkan || "").localeCompare(a.ditambahkan || "") ||
          a.deadline.localeCompare(b.deadline),
      );
    else hasil.sort((a, b) => a.nama.localeCompare(b.nama));

    document.getElementById("hasilCount").textContent =
      `Menampilkan ${hasil.length} dari ${DATA_BEASISWA.length} beasiswa`;

    listEl.innerHTML = hasil.map(kartu).join("");
    emptyEl.hidden = hasil.length > 0;
  }

  function kartu(b) {
    return `<article class="row-card">
      <div>
        <div class="tag-row">
          <span class="badge badge-yellow">${b.jenis}</span>
          <span class="badge">${b.cakupan}</span>
          <span class="badge">${b.jenjang.join(" · ")}</span>
          ${deadlineBadge(b.deadline)}
        </div>
        <h3><button class="link-judul" data-buka="${b.id}">${escapeHtml(b.nama)}</button></h3>
        <p class="row-org"><svg class="icon"><use href="#i-map-pin"></use></svg>${escapeHtml(b.penyelenggara)}</p>
        <ul class="bea-syarat">
          ${b.persyaratan
            .slice(0, 2)
            .map(
              (p) => `<li>
            <svg class="icon"><use href="#i-check"></use></svg><span>${escapeHtml(p)}</span></li>`,
            )
            .join("")}
        </ul>
        <p class="row-meta"><svg class="icon"><use href="#i-calendar"></use></svg>
          Deadline: <strong>${fmtDate(b.deadline)}</strong></p>
      </div>
      <div class="row-side">
        <button class="btn btn-outline btn-sm" data-buka="${b.id}">
          <svg class="icon"><use href="#i-doc"></use></svg>Lihat Detail</button>
      </div>
    </article>`;
  }

  /* Modal detail + pemeriksaan persyaratan */
  function tampilDetail(id) {
    const b = DATA_BEASISWA.find((x) => x.id === id);
    if (!b) return;
    modalBody.innerHTML = `
      <span class="badge badge-solid">${b.jenis}</span>
      <h2 class="modal-title" id="modalJudul">${escapeHtml(b.nama)}</h2>
      <p class="modal-org"><svg class="icon"><use href="#i-map-pin"></use></svg>
        Diselenggarakan oleh ${escapeHtml(b.penyelenggara)}</p>
      <div class="meta-grid">
        <div><span>Jenis</span><strong>${b.jenis}</strong></div>
        <div><span>Jenjang</span><strong>${b.jenjang.join(", ")}</strong></div>
        <div><span>Cakupan</span><strong>${b.cakupan}</strong></div>
        <div><span>Deadline</span><strong>${fmtDate(b.deadline)} ${deadlineBadge(b.deadline)}</strong></div>
      </div>
      <h3 class="modal-sub">Manfaat</h3>
      <ul class="check-list">
        ${b.manfaat
          .map(
            (m) => `<li><svg class="icon"><use href="#i-check"></use></svg>
          <span>${escapeHtml(m)}</span></li>`,
          )
          .join("")}
      </ul>
      <h3 class="modal-sub">Persyaratan</h3>
      <ul class="check-list">
        ${b.persyaratan
          .map(
            (p) => `<li><svg class="icon"><use href="#i-check"></use></svg>
          <span>${escapeHtml(p)}</span></li>`,
          )
          .join("")}
      </ul>
      <h3 class="modal-sub">Dokumen yang dibutuhkan</h3>
      <ul class="doc-list">
        ${b.dokumen
          .map(
            (d) => `<li><svg class="icon"><use href="#i-doc"></use></svg>
          <span>${escapeHtml(d)}</span></li>`,
          )
          .join("")}
      </ul>
      <label class="agree-check">
        <input type="checkbox" id="setujuSyarat">
        <span>Saya telah membaca seluruh persyaratan di atas dan yakin <b>memenuhinya</b>.</span>
      </label>
      <div class="modal-cta">
        <a class="btn btn-primary" id="btnDaftarBea" href="${b.link}" target="_blank" rel="noopener">
          Daftar Sekarang <svg class="icon"><use href="#i-arrow"></use></svg></a>
        <button class="btn btn-outline" data-close>Tutup</button>
      </div>
      <div class="note"><svg class="icon"><use href="#i-info"></use></svg>
        <span>Tautan pendaftaran di atas adalah <b>tautan contoh (example.com)</b> yang belum
        diverifikasi. Periksa persyaratanmu terlebih dahulu sebelum mendaftar.</span></div>`;
    openModal("modalDetail");
  }

  /* tombol daftar hanya aktif setelah menandai persyaratan terpenuhi */
  modalBody.addEventListener("click", (e) => {
    const a = e.target.closest("#btnDaftarBea");
    if (a) {
      const c = modalBody.querySelector("#setujuSyarat");
      if (c && !c.checked) {
        e.preventDefault();
        showToast(
          "Centang dulu pernyataan bahwa kamu memenuhi persyaratan.",
          "peringatan",
        );
      }
    }
  });

  /* Event */
  cariEl.addEventListener("input", render);
  document.getElementById("btnCari").addEventListener("click", render);
  urutEl.addEventListener("change", render);
  panel.addEventListener("change", render);
  document
    .getElementById("toggleFilter")
    .addEventListener("click", () => panel.classList.toggle("open"));

  function resetFilter() {
    cariEl.value = "";
    urutEl.value = "deadline";
    dlSel.value = "";
    panel
      .querySelectorAll('input[name="jenjang"]')
      .forEach((i) => (i.checked = false));
    panel.querySelector('input[name="jenis"][value="Semua"]').checked = true;
    panel.querySelector('input[name="cakupan"][value="Semua"]').checked = true;
    render();
    showToast("Filter telah direset.");
  }
  document.getElementById("resetFilter").addEventListener("click", resetFilter);
  document
    .getElementById("resetFilter2")
    .addEventListener("click", resetFilter);

  listEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-buka]");
    if (b) tampilDetail(b.dataset.buka);
  });

  /* Parameter URL (dari halaman utama) */
  render();
  const pb = new URLSearchParams(location.search).get("buka");
  if (pb && DATA_BEASISWA.some((x) => x.id === pb)) tampilDetail(pb);
})();

/* =========================================================
   6) HALAMAN SCHOLARMATCH (scholarmatch.html)
   ========================================================= */
(function halamanScholarmatch() {
  if (document.body.dataset.page !== "scholarmatch") return;

  const form = document.getElementById("smForm");
  const placeholder = document.getElementById("hasilPlaceholder");
  const konten = document.getElementById("hasilKonten");
  const hasilList = document.getElementById("hasilList");
  const hasilSub = document.getElementById("hasilSub");
  const modalBody = document.getElementById("modalBody");

  /* Kumpulkan & validasi jawaban */
  function kumpulkan() {
    return {
      jurusan: document.getElementById("smJurusan").value,
      semester:
        (document.querySelector('input[name="semester"]:checked') || {})
          .value || "",
      minat:
        (document.querySelector('input[name="minat"]:checked') || {}).value ||
        "",
      skill: [...document.querySelectorAll('input[name="skill"]:checked')].map(
        (i) => i.value,
      ),
      jenis:
        (document.querySelector('input[name="jenis"]:checked') || {}).value ||
        "",
    };
  }

  function tandai(idWrap, pesan) {
    const w = document.getElementById(idWrap);
    w.classList.add("invalid");
    w.querySelector(".field-error").textContent = pesan;
  }
  function bersihkanTanda() {
    form.querySelectorAll(".field").forEach((w) => {
      w.classList.remove("invalid");
      const e = w.querySelector(".field-error");
      if (e) e.textContent = "";
    });
  }

  function validasi(j) {
    bersihkanTanda();
    let ok = true;
    if (!j.jurusan) {
      tandai("wrapJurusan", "Pilih jurusan/program studi kamu.");
      ok = false;
    }
    if (!j.semester) {
      tandai("wrapSemester", "Pilih semester kamu.");
      ok = false;
    }
    if (!j.minat) {
      tandai("wrapMinat", "Pilih satu minat utama.");
      ok = false;
    }
    if (j.skill.length === 0) {
      tandai("wrapSkill", "Pilih minimal satu keterampilan.");
      ok = false;
    }
    if (!j.jenis) {
      tandai("wrapJenis", "Pilih jenis peluang yang dicari.");
      ok = false;
    }
    return ok;
  }

  /* Skor kecocokan satu peluang */
  const SKOR_MAKS = 13; // 4 (minat) + 3 (jurusan) + 2+2 (skill) + 2 (semester)

  function hitungSkor(item, j, jenisItem) {
    let skor = 0;
    const alasan = [];

    if ((item.minat || []).includes(j.minat)) {
      skor += 4;
      alasan.push("sesuai minatmu di " + j.minat.toLowerCase());
    }
    const jurusanCocok =
      (item.jurusan || []).includes("Semua") ||
      (item.jurusan || []).includes(j.jurusan);
    if (jurusanCocok) {
      skor += 3;
      alasan.push("terbuka untuk jurusan " + j.jurusan);
    }
    const skillCocok = (item.skill || [])
      .filter((s) => j.skill.includes(s))
      .slice(0, 2);
    skillCocok.forEach((s) => {
      skor += 2;
      alasan.push("memanfaatkan keterampilan " + s.toLowerCase());
    });

    if (jenisItem === "lomba") {
      skor += 2;
      alasan.push("terbuka untuk semua semester");
    } else {
      const smt = +j.semester;
      if (smt >= item.semesterMin && smt <= item.semesterMax) {
        skor += 2;
        alasan.push(
          "rentang semester " +
            item.semesterMin +
            "–" +
            item.semesterMax +
            " mencakup semester kamu",
        );
      }
    }
    return { skor, alasan };
  }

  /* Jalankan pencocokan */
  function jalankanMatch(j) {
    const pool = [];
    if (j.jenis === "lomba" || j.jenis === "keduanya")
      DATA_LOMBA.forEach((x) => pool.push({ ...x, jenisItem: "lomba" }));
    if (j.jenis === "beasiswa" || j.jenis === "keduanya")
      DATA_BEASISWA.forEach((x) =>
        pool.push({ ...x, judul: x.nama, jenisItem: "beasiswa" }),
      );

    const dinilai = pool
      .map((item) => {
        const { skor, alasan } = hitungSkor(item, j, item.jenisItem);
        return { ...item, skor, alasan };
      })
      .filter((x) => x.skor > 0)
      .sort((a, b) => b.skor - a.skor || a.deadline.localeCompare(b.deadline))
      .slice(0, 5);

    placeholder.hidden = true;
    konten.hidden = false;
    hasilSub.textContent = `${dinilai.length} peluang cocok ditemukan dari ${pool.length} data demo
      — profil: ${j.jurusan}, semester ${j.semester}, minat ${j.minat}.`;
    hasilList.innerHTML = dinilai.map(kartuRekom).join("");
  }

  function kartuRekom(r) {
    const persen = Math.min(95, Math.round((r.skor / SKOR_MAKS) * 100));
    const isLomba = r.jenisItem === "lomba";
    return `<article class="rekom-card">
      <div class="rekom-head">
        <span class="badge badge-solid">${isLomba ? "Lomba" : "Beasiswa"}</span>
        <span class="skor"><span class="skor-bar"><i style="width:${persen}%"></i></span>
          <b>${persen}% cocok</b></span>
      </div>
      <h3>${escapeHtml(r.judul)}</h3>
      <p class="row-org"><svg class="icon"><use href="#i-map-pin"></use></svg>${escapeHtml(r.penyelenggara)}</p>
      <div class="tag-row" style="margin-bottom:0">
        ${
          isLomba
            ? `<span class="badge badge-dark">${escapeHtml(r.kategori)}</span>
             <span class="badge">${r.tingkat}</span>
             <span class="badge ${r.biaya === "Gratis" ? "badge-green" : "badge-yellow"}">${r.biaya}</span>`
            : `<span class="badge badge-yellow">${r.jenis}</span>
             <span class="badge">${r.cakupan}</span>
             <span class="badge">${r.jenjang.join(" · ")}</span>`
        }
        ${deadlineBadge(r.deadline)}
      </div>
      <p class="rekom-alasan"><svg class="icon"><use href="#i-spark"></use></svg>
        <span><b>Kenapa cocok:</b> ${r.alasan.join(", ")}.</span></p>
      <div class="row-meta" style="margin-bottom:14px">
        <svg class="icon"><use href="#i-calendar"></use></svg>
        Deadline: <strong>${fmtDate(r.deadline)}</strong></div>
      <button class="btn btn-outline btn-sm" data-buka="${r.id}" data-jenis="${r.jenisItem}">
        <svg class="icon"><use href="#i-doc"></use></svg>Lihat Detail</button>
    </article>`;
  }

  /* Modal detail (sesuai jenis peluang) */
  function tampilDetail(id, jenis) {
    const item =
      jenis === "lomba"
        ? DATA_LOMBA.find((x) => x.id === id)
        : DATA_BEASISWA.find((x) => x.id === id);
    if (!item) return;

    let html;
    if (jenis === "lomba") {
      html = `
        <span class="badge badge-solid">${escapeHtml(item.kategori)}</span>
        <h2 class="modal-title">${escapeHtml(item.judul)}</h2>
        <p class="modal-org">${escapeHtml(item.penyelenggara)}</p>
        <div class="meta-grid">
          <div><span>Tingkat</span><strong>${item.tingkat}</strong></div>
          <div><span>Biaya</span><strong>${item.biaya === "Berbayar" ? escapeHtml(item.biayaDetail) : "Gratis"}</strong></div>
          <div><span>Deadline</span><strong>${fmtDate(item.deadline)}</strong></div>
          <div><span>Hadiah</span><strong>${escapeHtml(item.hadiah)}</strong></div>
        </div>
        <h3 class="modal-sub">Persyaratan</h3>
        <ul class="check-list">${item.persyaratan
          .map(
            (p) =>
              `<li><svg class="icon"><use href="#i-check"></use></svg><span>${escapeHtml(p)}</span></li>`,
          )
          .join("")}</ul>`;
    } else {
      html = `
        <span class="badge badge-solid">${item.jenis}</span>
        <h2 class="modal-title">${escapeHtml(item.nama)}</h2>
        <p class="modal-org">${escapeHtml(item.penyelenggara)}</p>
        <div class="meta-grid">
          <div><span>Jenis</span><strong>${item.jenis}</strong></div>
          <div><span>Jenjang</span><strong>${item.jenjang.join(", ")}</strong></div>
          <div><span>Cakupan</span><strong>${item.cakupan}</strong></div>
          <div><span>Deadline</span><strong>${fmtDate(item.deadline)}</strong></div>
        </div>
        <h3 class="modal-sub">Persyaratan</h3>
        <ul class="check-list">${item.persyaratan
          .map(
            (p) =>
              `<li><svg class="icon"><use href="#i-check"></use></svg><span>${escapeHtml(p)}</span></li>`,
          )
          .join("")}</ul>`;
    }
    html += `
      <div class="modal-cta">
        <a class="btn btn-primary" href="${item.link}" target="_blank" rel="noopener">
          Daftar Sekarang <svg class="icon"><use href="#i-arrow"></use></svg></a>
        <button class="btn btn-outline" data-close>Tutup</button>
      </div>
      <div class="note"><svg class="icon"><use href="#i-info"></use></svg>
        <span>Tautan pendaftaran adalah <b>tautan contoh (example.com)</b> yang belum diverifikasi.</span></div>`;
    modalBody.innerHTML = html;
    openModal("modalDetail");
  }

  /* Event */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const j = kumpulkan();
    if (!validasi(j)) {
      showToast(
        "Lengkapi jawaban yang ditandai merah terlebih dahulu.",
        "peringatan",
      );
      const pertama = form.querySelector(".field.invalid");
      if (pertama)
        pertama.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    jalankanMatch(j);
    konten.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(
      "Pencocokan selesai — rekomendasi ditampilkan di sebelah kanan.",
      "sukses",
    );
  });

  document.getElementById("btnResetMatch").addEventListener("click", () => {
    form.reset();
    bersihkanTanda();
    konten.hidden = true;
    placeholder.hidden = false;
    showToast("Kuesioner dikosongkan.");
  });

  document.getElementById("btnPerbarui").addEventListener("click", () => {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("smJurusan").focus();
    showToast("Perbarui jawabanmu, lalu klik Cari Rekomendasi lagi.");
  });

  document.getElementById("btnIsiUlang").addEventListener("click", () => {
    form.reset();
    bersihkanTanda();
    konten.hidden = true;
    placeholder.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  hasilList.addEventListener("click", (e) => {
    const b = e.target.closest("[data-buka]");
    if (b) tampilDetail(b.dataset.buka, b.dataset.jenis);
  });
})();

/* =========================================================
   7) HALAMAN E-BOOK (ebook.html)
   ========================================================= */
(function halamanEbook() {
  if (document.body.dataset.page !== "ebook") return;

  /* Data produk (harga contoh) */
  const DATA_EBOOK = [
    {
      id: "eb-1",
      judul: "Panduan Lolos Karya Tulis Ilmiah",
      kategori: "Karya Tulis Ilmiah",
      harga: 59000,
      halaman: 96,
      cover: "cv-a",
      deskripsi:
        "Langkah demi langkah menyusun karya tulis ilmiah yang siap dilombakan — dari menemukan ide, menyusun argumen, hingga trik presentasi di hadapan juri.",
      bab: [
        "Menemukan ide penelitian yang kuat",
        "Struktur bab 1-3 yang logis",
        "Metodologi untuk pemula",
        "Memformat tabel & gambar",
        "Teknik menjawab pertanyaan juri",
      ],
    },
    {
      id: "eb-2",
      judul: "Panduan Proposal Bisnis",
      kategori: "Bisnis & Startup",
      harga: 49000,
      halaman: 84,
      cover: "cv-b",
      deskripsi:
        "Menyusun business plan yang dipercaya investor dan juri lomba: analisis pasar, model bisnis, proyeksi keuangan, dan seni pitching.",
      bab: [
        "Validasi ide sebelum menulis",
        "Analisis pasar & kompetitor",
        "Business model canvas",
        "Proyeksi keuangan sederhana",
        "Membuat pitch deck 10 slide",
      ],
    },
    {
      id: "eb-3",
      judul: "Panduan Persiapan Kompetisi",
      kategori: "Kompetisi Umum",
      harga: 39000,
      halaman: 72,
      cover: "cv-c",
      deskripsi:
        "Peta strategi menyonsong kompetisi apa pun: memilih lomba yang tepat, membangun tim solid, dan mengatur waktu persiapan.",
      bab: [
        "Memilih lomba sesuai profil",
        "Membangun tim yang kompak",
        "Timeline persiapan 8 minggu",
        "Mengelola mental saat lomba",
        "Evaluasi pasca-kompetisi",
      ],
    },
    {
      id: "eb-4",
      judul: "Panduan Persiapan Beasiswa",
      kategori: "Beasiswa",
      harga: 49000,
      halaman: 88,
      cover: "cv-d",
      deskripsi:
        "Kiat menyusun berkas beasiswa yang menonjol: esai motivasi, surat rekomendasi, dan simulasi wawancara seleksi.",
      bab: [
        "Memetakan beasiswa yang cocok",
        "Anatomi esai motivasi",
        "Meminta rekomendasi yang kuat",
        "Persiapan wawancara & LGD",
        "Kesalahan umum pendaftar",
      ],
    },
    {
      id: "eb-5",
      judul: "Panduan Esai & Opini",
      kategori: "Karya Tulis Ilmiah",
      harga: 35000,
      halaman: 64,
      cover: "cv-e",
      deskripsi:
        "Menulis esai dan opini yang tajam dan layak media: struktur argumen, gaya bahasa, dan cara mengirim ke media publik.",
      bab: [
        "Bedah esai vs opini",
        "Struktur argumen 5 bagian",
        "Gaya bahasa yang enak dibaca",
        "Mengirim ke media nasional",
        "Latihan dengan 10 prompt",
      ],
    },
    {
      id: "eb-6",
      judul: "Panduan Desain Kompetisi",
      kategori: "Seni & Desain",
      harga: 45000,
      halaman: 76,
      cover: "cv-f",
      deskripsi:
        "Memenangkan lomba desain dengan konsep kuat: riset visual, komposisi, dan menyusun deskripsi konsep yang meyakinkan juri.",
      bab: [
        "Membaca brief dengan cermat",
        "Riset visual & moodboard",
        "Prinsip komposisi poster",
        "Tipografi untuk kompetisi",
        "Menulis deskripsi konsep",
      ],
    },
  ];
  const KUNCI_PROMO = "MAHASISWA10";
  const KUNCI_SIMPAN = "scholarhub_pesanan_terakhir";

  const grid = document.getElementById("ebookGrid");
  const sect = document.getElementById("checkoutSection");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const stepper = document.getElementById("stepper");
  const modalBody = document.getElementById("modalBody");

  const state = {
    ebook: null,
    pembeli: {},
    promoOk: false,
    total: 0,
    metode: "Transfer Bank",
    nomor: "",
  };

  /* Render katalog */
  function sampul(e, mini) {
    return `<div class="ebook-cover ${e.cover}${mini ? " mini" : ""}">
      <span class="bc-tag">ScholarHub Press</span>
      <strong>${escapeHtml(e.judul)}</strong>
      <span class="bc-line"></span>
      <span class="bc-cat">${escapeHtml(e.kategori)}</span>
    </div>`;
  }
  grid.innerHTML = DATA_EBOOK.map(
    (e) => `
    <article class="ebook-card">
      ${sampul(e)}
      <div class="ebook-info">
        <span class="badge badge-yellow">${escapeHtml(e.kategori)}</span>
        <h3>${escapeHtml(e.judul)}</h3>
        <p>${escapeHtml(e.deskripsi)}</p>
        <p class="ebook-meta">${e.halaman} halaman · ${e.bab.length} bab</p>
        <div class="ebook-foot">
          <div class="harga"><strong>${fmtRp(e.harga)}</strong><span>harga contoh</span></div>
          <div class="ebook-btns">
            <button class="btn btn-outline btn-sm" data-detail="${e.id}">Lihat Detail</button>
            <button class="btn btn-primary btn-sm" data-beli="${e.id}">Beli Sekarang</button>
          </div>
        </div>
      </div>
    </article>`,
  ).join("");

  /* Modal detail e-book */
  function bukaDetail(id) {
    const e = DATA_EBOOK.find((x) => x.id === id);
    if (!e) return;
    modalBody.innerHTML = `<div class="ebook-detail">
      ${sampul(e)}
      <div>
        <span class="badge badge-yellow">${escapeHtml(e.kategori)}</span>
        <h2>${escapeHtml(e.judul)}</h2>
        <p class="modal-teks">${escapeHtml(e.deskripsi)}</p>
        <h3 class="modal-sub">Yang akan kamu pelajari</h3>
        <ul class="check-list">${e.bab
          .map(
            (b) =>
              `<li><svg class="icon"><use href="#i-check"></use></svg><span>${escapeHtml(b)}</span></li>`,
          )
          .join("")}
        </ul>
        <div class="ebook-detail-foot">
          <div class="harga"><strong>${fmtRp(e.harga)}</strong><span>harga contoh · ${e.halaman} halaman</span></div>
          <button class="btn btn-primary" data-beli="${e.id}">
            <svg class="icon"><use href="#i-wallet"></use></svg>Beli Sekarang</button>
        </div>
      </div>
    </div>`;
    openModal("modalDetail");
  }

  /* Navigasi langkah */
  function tampilLangkah(n) {
    [step1, step2, step3].forEach((p, i) => (p.hidden = i + 1 !== n));
    stepper.querySelectorAll("li").forEach((li) => {
      const s = +li.dataset.step;
      li.classList.toggle("aktif", s === n);
      li.classList.toggle("selesai", s < n);
    });
  }
  function mulaiBeli(id) {
    const e = DATA_EBOOK.find((x) => x.id === id);
    if (!e) return;
    state.ebook = e;
    state.promoOk = false;
    sect.hidden = false;
    tampilLangkah(1);
    sect.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`"${e.judul}" ditambahkan ke proses pembelian.`);
  }

  /* Langkah 1: validasi data pembeli */
  function tandai(id, pesan) {
    const w = document.getElementById(id);
    w.classList.add("invalid");
    w.querySelector(".field-error").textContent = pesan;
  }
  function bersihkan() {
    ["wrapNama", "wrapEmail", "wrapWa"].forEach((id) => {
      const w = document.getElementById(id);
      w.classList.remove("invalid");
      w.querySelector(".field-error").textContent = "";
    });
  }
  document.getElementById("btnLanjut1").addEventListener("click", () => {
    bersihkan();
    const nama = document.getElementById("ebNama").value.trim();
    const email = document.getElementById("ebEmail").value.trim();
    const wa = document.getElementById("ebWa").value.trim();
    let ok = true;
    if (nama.length < 3) {
      tandai("wrapNama", "Nama minimal 3 karakter.");
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tandai("wrapEmail", "Format email tidak valid.");
      ok = false;
    }
    if (!/^[0-9]{9,14}$/.test(wa)) {
      tandai("wrapWa", "Nomor WhatsApp 9-14 angka, tanpa spasi.");
      ok = false;
    }
    if (!ok) return;

    state.pembeli = { nama, email, wa };
    renderStep2();
    tampilLangkah(2);
  });

  /* Langkah 2: ringkasan & pembayaran */
  function renderStep2() {
    const e = state.ebook;
    state.total = state.promoOk ? Math.round(e.harga * 0.9) : e.harga;
    step2.innerHTML = `
      <h3 class="modal-sub" style="margin-top:0">Ringkasan pesanan</h3>
      <div class="ringkasan-item">${sampul(e, true)}
        <div><h4>${escapeHtml(e.judul)}</h4>
          <p>${escapeHtml(e.kategori)} · ${e.halaman} halaman · untuk ${escapeHtml(state.pembeli.nama)}</p></div>
        <strong>${fmtRp(e.harga)}</strong>
      </div>
      <div class="field">
        <label>Kode promo (opsional)</label>
        <div class="promo-row">
          <input type="text" id="promoInput" placeholder="Masukkan kode promo">
          <button class="btn btn-outline btn-sm" id="promoBtn" type="button">Terapkan</button>
        </div>
        <p class="field-hint" id="promoMsg">Coba kode <b>${KUNCI_PROMO}</b> untuk potongan 10%.</p>
      </div>
      <div class="total-row"><span>Subtotal</span><span>${fmtRp(e.harga)}</span></div>
      <div class="total-row" id="diskonRow" ${state.promoOk ? "" : "hidden"}>
        <span>Diskon promo (10%)</span><span>− ${fmtRp(e.harga - state.total)}</span></div>
      <div class="total-row grand"><span>Total</span><span>${fmtRp(state.total)}</span></div>
      <div class="field" style="margin-top:20px">
        <label>Metode pembayaran (semuanya simulasi)</label>
        <div class="chip-group">
          <label class="chip"><input type="radio" name="metode" value="Transfer Bank" checked>
            <span><svg class="icon"><use href="#i-card"></use></svg>Transfer Bank</span></label>
          <label class="chip"><input type="radio" name="metode" value="E-Wallet">
            <span><svg class="icon"><use href="#i-wallet"></use></svg>E-Wallet</span></label>
        </div>
      </div>
      <label class="agree-check">
        <input type="checkbox" id="simGagal">
        <span>Simulasikan pembayaran <b>gagal</b> (opsional, untuk menguji alur gagal)</span>
      </label>
      <div class="modal-cta">
        <button class="btn btn-outline" id="btnKembali2" type="button">Kembali</button>
        <button class="btn btn-primary" id="btnBayar" type="button">
          <svg class="icon"><use href="#i-shield"></use></svg>Bayar Sekarang</button>
      </div>
      <p class="fineprint">Pembayaran sepenuhnya simulasi — tidak ada uang sungguhan yang diproses.</p>`;

    step2.querySelector("#promoBtn").addEventListener("click", () => {
      const kode = step2
        .querySelector("#promoInput")
        .value.trim()
        .toUpperCase();
      const msg = step2.querySelector("#promoMsg");
      if (kode === KUNCI_PROMO) {
        state.promoOk = true;
        msg.innerHTML =
          "Kode <b>" + KUNCI_PROMO + "</b> diterapkan — potongan 10%.";
        msg.style.color = "var(--green)";
        showToast("Promo berhasil diterapkan.", "sukses");
      } else {
        state.promoOk = false;
        msg.innerHTML = "Kode tidak dikenal. Coba <b>" + KUNCI_PROMO + "</b>.";
        msg.style.color = "var(--red)";
      }
      renderStep2();
    });
    step2
      .querySelector("#btnKembali2")
      .addEventListener("click", () => tampilLangkah(1));
    step2.querySelector("#btnBayar").addEventListener("click", prosesBayar);
  }

  /* Langkah 3: proses, sukses, gagal */
  function prosesBayar() {
    state.metode = step2.querySelector('input[name="metode"]:checked').value;
    const gagal = step2.querySelector("#simGagal").checked;
    tampilLangkah(3);
    step3.innerHTML = `<div class="pay-result">
      <div class="spinner"></div>
      <h3 style="margin-top:18px">Memproses pembayaran…</h3>
      <p class="pay-sub">Menghubungi gateway pembayaran simulasi…</p></div>`;
    setTimeout(() => (gagal ? renderGagal() : renderSukses()), 2000);
  }

  function renderSukses(data) {
    state.nomor = data
      ? data.nomor
      : "SH-EK-" + Date.now().toString().slice(-6);
    const e = data
      ? DATA_EBOOK.find((x) => x.id === data.ebookId) || state.ebook
      : state.ebook;
    const total = data ? data.total : state.total;
    const metode = data ? data.metode : state.metode;
    const waktu = data ? data.waktu : new Date().toLocaleString("id-ID");

    step3.innerHTML = `<div class="pay-result">
      <div class="pay-icon"><svg class="icon"><use href="#i-check"></use></svg></div>
      <h3>Pembayaran Berhasil</h3>
      <p class="pay-sub">Ini adalah <b>simulasi</b> pembayaran — tidak ada transaksi nyata yang diproses.</p>
      <div class="meta-grid">
        <div><span>No. Pesanan</span><strong>${state.nomor}</strong></div>
        <div><span>Metode</span><strong>${escapeHtml(metode)} (simulasi)</strong></div>
        <div><span>Total</span><strong>${fmtRp(total)}</strong></div>
        <div><span>Waktu</span><strong>${waktu}</strong></div>
      </div>
      <div class="modal-cta">
        <button class="btn btn-primary" id="btnUnduh">
          <svg class="icon"><use href="#i-download"></use></svg>Unduh E-book Demo</button>
        <a class="btn btn-outline" href="ebook.html#katalogEbook">Kembali ke Katalog</a>
      </div>
      <div class="note info"><svg class="icon"><use href="#i-info"></use></svg>
        <span>File yang diunduh adalah <b>file contoh</b> berisi daftar isi. Di versi produksi,
        tautan unduh lengkap dikirim melalui email pembeli.</span></div>
    </div>`;
    step3
      .querySelector("#btnUnduh")
      .addEventListener("click", () => unduhDemo(e));

    if (!data) {
      // simpan status pesanan simulasi di browser
      localStorage.setItem(
        KUNCI_SIMPAN,
        JSON.stringify({
          nomor: state.nomor,
          ebookId: e.id,
          judul: e.judul,
          total,
          metode,
          waktu,
          status: "berhasil",
        }),
      );
      tampilStrip();
      showToast("Pembayaran berhasil (simulasi).", "sukses");
    }
  }

  function renderGagal() {
    step3.innerHTML = `<div class="pay-result">
      <div class="pay-icon merah"><svg class="icon"><use href="#i-close"></use></svg></div>
      <h3>Pembayaran Gagal</h3>
      <p class="pay-sub">Simulasi pembayaran gagal — silakan ulangi pembayaran atau batalkan pesanan.</p>
      <div class="modal-cta">
        <button class="btn btn-primary" id="btnUlang">Ulangi Pembayaran</button>
        <button class="btn btn-outline" id="btnBatalGagal">Batalkan</button>
      </div>
    </div>`;
    step3.querySelector("#btnUlang").addEventListener("click", () => {
      renderStep2();
      tampilLangkah(2);
      showToast("Centang kembali opsi gagal bila ingin menguji alur gagal.");
    });
    step3.querySelector("#btnBatalGagal").addEventListener("click", () => {
      sect.hidden = true;
      showToast("Pesanan dibatalkan.");
      document
        .getElementById("katalogEbook")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  /* Unduh e-book demo (file teks dibuat sendiri) */
  function unduhDemo(e) {
    const isi = `SCHOLARHUB — E-BOOK DEMO
================================
Judul   : ${e.judul}
Kategori: ${e.kategori}
Halaman : ${e.halaman} (demo)
Harga   : ${fmtRp(e.harga)} (harga contoh)

DAFTAR ISI
 ${e.bab.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Catatan: file ini hanya contoh untuk mendemokan alur pembelian.
Di versi produksi, pembeli menerima e-book lengkap (PDF/EPUB).
© ScholarHub — proyek demo mata kuliah.`;
    const url = URL.createObjectURL(new Blob([isi], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ScholarHub-Demo-" + e.id + ".txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* Strip pesanan terakhir (localStorage) */
  function tampilStrip() {
    try {
      const d = JSON.parse(localStorage.getItem(KUNCI_SIMPAN));
      if (!d) return;
      document.getElementById("stripSection").hidden = false;
      document.getElementById("stripIsi").innerHTML =
        `<svg class="icon"><use href="#i-check"></use></svg>
         <span>Pesanan terakhir (tersimpan di browser ini): <b>${escapeHtml(d.nomor)}</b> —
         ${escapeHtml(d.judul)} — Berhasil (simulasi).</span>
         <button class="link-btn" id="lihatPesananLalu">Lihat detail</button>`;
      document
        .getElementById("lihatPesananLalu")
        .addEventListener("click", () => {
          sect.hidden = false;
          renderSukses({
            nomor: d.nomor,
            ebookId: d.ebookId,
            total: d.total,
            metode: d.metode,
            waktu: d.waktu,
          });
          tampilLangkah(3);
          sect.scrollIntoView({ behavior: "smooth" });
        });
    } catch (err) {
      /* data rusak diabaikan */
    }
  }

  /* Event katalog & modal */
  document.addEventListener("click", (e) => {
    const d = e.target.closest("[data-detail]");
    if (d) bukaDetail(d.dataset.detail);
    const b = e.target.closest("[data-beli]");
    if (b) {
      closeModal("modalDetail");
      mulaiBeli(b.dataset.beli);
    }
  });
  document.getElementById("batalBeli").addEventListener("click", () => {
    sect.hidden = true;
    showToast("Proses pembelian dibatalkan.");
    document
      .getElementById("katalogEbook")
      .scrollIntoView({ behavior: "smooth" });
  });

  tampilStrip();
})();

/* =========================================================
   8) HALAMAN MENTORSHIP (mentorship.html)
   ========================================================= */
(function halamanMentorship() {
  if (document.body.dataset.page !== "mentorship") return;

  /* Data mentor contoh */
  const DATA_MENTOR = [
    {
      id: "mt-1",
      inisial: "AP",
      nama: "Dr. Andini Prameswari, M.Si.",
      bidang: "Karya Tulis Ilmiah & Riset",
      peran: "Dosen & juri lomba penelitian",
      harga: 150000,
      penuh: [1, 4],
      deskripsi:
        "Mendampingi mahasiswa dari pemilihan topik hingga lolos tahap penjurian. Telah menjadi juri lebih dari 30 lomba penelitian nasional.",
      layanan: [
        "Konsultasi topik & kerangka penelitian",
        "Review naskah karya tulis ilmiah",
        "Persiapan presentasi sidang/penjurian",
      ],
    },
    {
      id: "mt-2",
      inisial: "RH",
      nama: "Rizky Hidayat, S.T.",
      bidang: "Kompetisi Teknologi & Hackathon",
      peran: "Juara hackathon nasional",
      harga: 125000,
      penuh: [2, 6],
      deskripsi:
        "Praktisi software yang membantu tim mahasiswa menyusun arsitektur solusi dan pitch teknis untuk kompetisi pemrograman.",
      layanan: [
        "Perencanaan solusi & arsitektur",
        "Persiapan demo hari-H",
        "Strategi pitching teknis",
      ],
    },
    {
      id: "mt-3",
      inisial: "SA",
      nama: "Sarah Amelia, MBA",
      bidang: "Proposal Bisnis & Pitching",
      peran: "Praktisi startup",
      harga: 175000,
      penuh: [0, 5],
      deskripsi:
        "Membantu mahasiswa menyusun business plan dan pitch deck yang meyakinkan — dari validasi ide sampai proyeksi keuangan.",
      layanan: [
        "Review proposal bisnis",
        "Latihan pitching 1-lawan-1",
        "Penyusunan pitch deck",
      ],
    },
    {
      id: "mt-4",
      inisial: "BN",
      nama: "Bagas Nugraha, M.Psi.",
      bidang: "Beasiswa & Studi Lanjut",
      peran: "Alumni dua beasiswa internasional",
      harga: 100000,
      penuh: [3, 7],
      deskripsi:
        "Memandu kandidat beasiswa menyusun esai motivasi, mempersiapkan wawancara, dan membangun profil akademik yang kuat.",
      layanan: [
        "Review esai motivasi",
        "Simulasi wawancara beasiswa",
        "Perencanaan profil akademik",
      ],
    },
  ];

  /* Jadwal demo (dibuat relatif hari ini) */
  function buatJadwal() {
    const jam = ["10.00–11.00", "13.00–14.00", "16.00–17.00"];
    const slot = [];
    [1, 2, 4].forEach((h) =>
      jam.forEach((j) => slot.push({ tanggal: inDays(h), jam: j })),
    );
    return slot;
  }
  const SEMUA_JADWAL = buatJadwal();
  const KUNCI_SIMPAN = "scholarhub_booking_terakhir";

  const grid = document.getElementById("mentorGrid");
  const sect = document.getElementById("bookingSection");
  const sumEl = document.getElementById("bookingSummary");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const stepper = document.getElementById("stepper");
  const profilBody = document.getElementById("profilBody");

  const state = { mentor: null, slot: null, data: {}, nomor: "" };

  /* Render kartu mentor */
  grid.innerHTML = DATA_MENTOR.map(
    (m) => `
    <article class="mentor-card">
      <div class="mentor-ava">${m.inisial}</div>
      <div class="mentor-info">
        <span class="badge badge-yellow" style="align-self:flex-start">Mentor contoh</span>
        <h3>${escapeHtml(m.nama)}</h3>
        <p class="mentor-bidang"><svg class="icon"><use href="#i-target"></use></svg>${escapeHtml(m.bidang)}</p>
        <p>${escapeHtml(m.deskripsi)}</p>
        <div class="mentor-foot">
          <div class="harga"><strong>${fmtRp(m.harga)}</strong><span>per sesi · 60 menit</span></div>
          <button class="btn btn-primary btn-sm" data-profil="${m.id}">
            <svg class="icon"><use href="#i-users"></use></svg>Lihat Profil</button>
        </div>
      </div>
    </article>`,
  ).join("");

  /* Modal profil + pilih jadwal */
  function bukaProfil(id) {
    const m = DATA_MENTOR.find((x) => x.id === id);
    if (!m) return;
    state.mentor = m;
    state.slot = null;

    profilBody.innerHTML = `
      <div class="profil-head">
        <div class="mentor-ava">${m.inisial}</div>
        <div>
          <span class="badge badge-yellow">Mentor contoh</span>
          <h2 style="margin:8px 0 2px">${escapeHtml(m.nama)}</h2>
          <p class="profil-bidang">${escapeHtml(m.bidang)} · ${escapeHtml(m.peran)}</p>
        </div>
      </div>
      <p class="modal-teks">${escapeHtml(m.deskripsi)}</p>
      <h3 class="modal-sub">Layanan konsultasi</h3>
      <ul class="check-list">${m.layanan
        .map(
          (l) =>
            `<li><svg class="icon"><use href="#i-check"></use></svg><span>${escapeHtml(l)}</span></li>`,
        )
        .join("")}
      </ul>
      <h3 class="modal-sub">Jadwal tersedia <span style="font-weight:400;font-size:.8rem;color:var(--muted)">(slot penuh tidak dapat dipilih)</span></h3>
      <div class="jadwal-grid" id="jadwalGrid">
        ${SEMUA_JADWAL.map((s, i) => {
          const penuh = m.penuh.includes(i);
          return `<button type="button" class="jadwal-chip${penuh ? " penuh" : ""}"
            data-slot="${i}" ${penuh ? "disabled" : ""}>
            <svg class="icon"><use href="#i-calendar"></use></svg>
            ${fmtDate(s.tanggal)} · ${s.jam}${penuh ? " · Penuh" : ""}</button>`;
        }).join("")}
      </div>
      <div class="modal-cta">
        <button class="btn btn-primary disabled" id="pilihJadwalBtn" disabled>
          Pilih Jadwal &amp; Lanjut ke Booking
          <svg class="icon"><use href="#i-arrow"></use></svg></button>
      </div>
      <p class="fineprint">Jadwal dan ketersediaan bersifat contoh untuk demo.</p>`;
    openModal("modalProfil");

    const gridEl = profilBody.querySelector("#jadwalGrid");
    const btn = profilBody.querySelector("#pilihJadwalBtn");
    gridEl.addEventListener("click", (e) => {
      const c = e.target.closest(".jadwal-chip:not(.penuh)");
      if (!c) return;
      gridEl
        .querySelectorAll(".jadwal-chip")
        .forEach((x) => x.classList.remove("aktif"));
      c.classList.add("aktif");
      state.slot = SEMUA_JADWAL[+c.dataset.slot];
      btn.disabled = false;
      btn.classList.remove("disabled");
    });
    btn.addEventListener("click", () => {
      closeModal("modalProfil");
      mulaiBooking();
    });
  }

  /* Booking wizard */
  function mulaiBooking() {
    sect.hidden = false;
    renderRingkasan();
    tampilLangkah(1);
    sect.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderRingkasan() {
    const m = state.mentor,
      s = state.slot;
    sumEl.innerHTML = `
      <div class="mentor-ava">${m.inisial}</div>
      <div><strong>${escapeHtml(m.nama)}</strong>
        <p>${escapeHtml(m.bidang)} · ${fmtRp(m.harga)}/sesi (harga contoh)</p></div>
      <div class="booking-jadwal"><svg class="icon"><use href="#i-calendar"></use></svg>
        ${fmtDate(s.tanggal)} · ${s.jam} WIB</div>
      <button class="link-btn" id="gantiJadwal" type="button">Ganti jadwal / mentor</button>`;
    sumEl
      .querySelector("#gantiJadwal")
      .addEventListener("click", () => bukaProfil(state.mentor.id));
  }
  function tampilLangkah(n) {
    [step1, step2, step3].forEach((p, i) => (p.hidden = i + 1 !== n));
    stepper.querySelectorAll("li").forEach((li) => {
      const s = +li.dataset.step;
      li.classList.toggle("aktif", s === n);
      li.classList.toggle("selesai", s < n);
    });
  }

  /* Validasi langkah 1 */
  function tandai(id, pesan) {
    const w = document.getElementById(id);
    w.classList.add("invalid");
    w.querySelector(".field-error").textContent = pesan;
  }
  document.getElementById("btnLanjutBooking").addEventListener("click", () => {
    ["wrapNama", "wrapEmail", "wrapWa", "wrapTopik"].forEach((id) => {
      const w = document.getElementById(id);
      w.classList.remove("invalid");
      w.querySelector(".field-error").textContent = "";
    });
    const nama = document.getElementById("bkNama").value.trim();
    const email = document.getElementById("bkEmail").value.trim();
    const wa = document.getElementById("bkWa").value.trim();
    const topik = document.getElementById("bkTopik").value.trim();
    let ok = true;
    if (nama.length < 3) {
      tandai("wrapNama", "Nama minimal 3 karakter.");
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tandai("wrapEmail", "Format email tidak valid.");
      ok = false;
    }
    if (!/^[0-9]{9,14}$/.test(wa)) {
      tandai("wrapWa", "Nomor WhatsApp 9-14 angka.");
      ok = false;
    }
    if (topik.length < 20) {
      tandai("wrapTopik", "Jelaskan kebutuhan minimal 20 karakter.");
      ok = false;
    }
    if (!ok) return;

    state.data = { nama, email, wa, topik };
    renderStep2();
    tampilLangkah(2);
  });

  /* Langkah 2: pembayaran */
  function renderStep2() {
    const m = state.mentor;
    step2.innerHTML = `
      <h3 class="modal-sub" style="margin-top:0">Ringkasan &amp; pembayaran</h3>
      <div class="total-row"><span>Sesi mentoring — ${escapeHtml(m.nama)}</span><span>${fmtRp(m.harga)}</span></div>
      <div class="total-row"><span>Jadwal</span><span>${fmtDate(state.slot.tanggal)} · ${state.slot.jam} WIB</span></div>
      <div class="total-row grand"><span>Total</span><span>${fmtRp(m.harga)}</span></div>
      <div class="field" style="margin-top:20px">
        <label>Metode pembayaran (semuanya simulasi)</label>
        <div class="chip-group">
          <label class="chip"><input type="radio" name="metode" value="Transfer Bank" checked>
            <span><svg class="icon"><use href="#i-card"></use></svg>Transfer Bank</span></label>
          <label class="chip"><input type="radio" name="metode" value="E-Wallet">
            <span><svg class="icon"><use href="#i-wallet"></use></svg>E-Wallet</span></label>
        </div>
      </div>
      <label class="agree-check">
        <input type="checkbox" id="simGagalMentor">
        <span>Simulasikan pembayaran <b>gagal</b> (opsional, untuk menguji alur gagal)</span>
      </label>
      <div class="modal-cta">
        <button class="btn btn-outline" id="btnKembaliBooking" type="button">Kembali</button>
        <button class="btn btn-primary" id="btnBayarBooking" type="button">
          <svg class="icon"><use href="#i-shield"></use></svg>Bayar Sekarang</button>
      </div>
      <p class="fineprint">Pembayaran sepenuhnya simulasi — tidak ada uang sungguhan yang diproses.</p>`;
    step2
      .querySelector("#btnKembaliBooking")
      .addEventListener("click", () => tampilLangkah(1));
    step2.querySelector("#btnBayarBooking").addEventListener("click", () => {
      const metode = step2.querySelector('input[name="metode"]:checked').value;
      const gagal = step2.querySelector("#simGagalMentor").checked;
      tampilLangkah(3);
      step3.innerHTML = `<div class="pay-result">
        <div class="spinner"></div>
        <h3 style="margin-top:18px">Memproses pembayaran…</h3></div>`;
      setTimeout(() => (gagal ? renderGagal() : renderSukses(metode)), 2000);
    });
  }

  /* Langkah 3: gagal */
  function renderGagal() {
    step3.innerHTML = `<div class="pay-result">
      <div class="pay-icon merah"><svg class="icon"><use href="#i-close"></use></svg></div>
      <h3>Pembayaran Gagal</h3>
      <p class="pay-sub">Simulasi pembayaran gagal — ulangi pembayaran atau batalkan booking.</p>
      <div class="modal-cta">
        <button class="btn btn-primary" id="btnUlangBooking">Ulangi Pembayaran</button>
        <button class="btn btn-outline" id="btnBatalBookingGagal">Batalkan</button>
      </div>
    </div>`;
    step3.querySelector("#btnUlangBooking").addEventListener("click", () => {
      renderStep2();
      tampilLangkah(2);
    });
    step3
      .querySelector("#btnBatalBookingGagal")
      .addEventListener("click", resetBooking);
  }

  /* Langkah 3: sukses */
  function renderSukses(metode, dataSimpan) {
    const m = state.mentor,
      s = state.slot;
    const kode = dataSimpan
      ? dataSimpan.kode
      : "SH-MT-" + Date.now().toString().slice(-6);
    const total = dataSimpan ? dataSimpan.harga : m.harga;
    const jadwalLabel = dataSimpan
      ? dataSimpan.jadwalLabel
      : `${fmtDate(s.tanggal)} · ${s.jam} WIB`;
    state.nomor = kode;

    step3.innerHTML = `<div class="pay-result">
      <div class="pay-icon"><svg class="icon"><use href="#i-check"></use></svg></div>
      <h3>Booking Berhasil</h3>
      <p class="pay-sub">Nomor booking <b>${kode}</b> — pembayaran simulasi, tidak ada transaksi nyata.</p>
      <div class="meta-grid">
        <div><span>Mentor</span><strong>${escapeHtml(m.nama)}</strong></div>
        <div><span>Jadwal</span><strong>${jadwalLabel}</strong></div>
        <div><span>Durasi</span><strong>60 menit · daring</strong></div>
        <div><span>Total</span><strong>${fmtRp(total)}</strong></div>
      </div>
      <div class="note info"><svg class="icon"><use href="#i-info"></use></svg>
        <span>Booking ini simulasi — mentor contoh tidak benar-benar akan menghubungi kamu.</span></div>
      <div class="note"><svg class="icon"><use href="#i-info"></use></svg>
        <span>Sesi mentoring <b>tidak termasuk akses e-book</b> — e-book merupakan produk terpisah
        yang dibeli di <a href="ebook.html"><b>katalog e-book</b></a>.</span></div>
      <div class="modal-cta">
        <button class="btn btn-primary" id="btnUnduhBooking">
          <svg class="icon"><use href="#i-download"></use></svg>Unduh Bukti Booking (demo)</button>
        <a class="btn btn-outline" href="mentorship.html#mentorSection">Kembali ke Daftar Mentor</a>
      </div>
    </div>`;
    step3.querySelector("#btnUnduhBooking").addEventListener("click", () => {
      const isi = `SCHOLARHUB — BUKTI BOOKING (DEMO)
====================================
Kode booking : ${kode}
Mentor        : ${m.nama} (mentor contoh)
Jadwal        : ${jadwalLabel}
Durasi        : 60 menit, daring
Total         : ${fmtRp(total)} (pembayaran simulasi)
Pemesan       : ${state.data.nama || "-"}
Kebutuhan     : ${state.data.topik || "-"}

Catatan: dokumen ini hanya contoh untuk mendemokan alur booking.
© ScholarHub — proyek demo mata kuliah.`;
      const url = URL.createObjectURL(new Blob([isi], { type: "text/plain" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "ScholarHub-Booking-" + kode + ".txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });

    if (!dataSimpan) {
      localStorage.setItem(
        KUNCI_SIMPAN,
        JSON.stringify({
          kode,
          mentor: m.nama,
          jadwalLabel,
          harga: m.harga,
          status: "berhasil",
        }),
      );
      tampilStrip();
      showToast("Booking berhasil (simulasi).", "sukses");
    }
  }

  function resetBooking() {
    sect.hidden = true;
    document
      .getElementById("mentorSection")
      .scrollIntoView({ behavior: "smooth" });
    showToast("Booking dibatalkan.");
  }
  document
    .getElementById("batalBooking")
    .addEventListener("click", resetBooking);

  /* Strip booking terakhir (localStorage) */
  function tampilStrip() {
    try {
      const d = JSON.parse(localStorage.getItem(KUNCI_SIMPAN));
      if (!d) return;
      document.getElementById("stripSection").hidden = false;
      document.getElementById("stripIsi").innerHTML =
        `<svg class="icon"><use href="#i-check"></use></svg>
         <span>Booking terakhir (tersimpan di browser ini): <b>${escapeHtml(d.kode)}</b> —
         ${escapeHtml(d.mentor)}, ${escapeHtml(d.jadwalLabel)} — Berhasil (simulasi).</span>
         <button class="link-btn" id="lihatBookingLalu">Lihat detail</button>`;
      document
        .getElementById("lihatBookingLalu")
        .addEventListener("click", () => {
          // untuk menampilkan ulang, pilih mentor & jadwal terdekat sebagai konteks
          state.mentor = DATA_MENTOR[0];
          state.slot = SEMUA_JADWAL[0];
          state.data = {};
          sect.hidden = false;
          renderSukses("Transfer Bank", d);
          tampilLangkah(3);
          sect.scrollIntoView({ behavior: "smooth" });
        });
    } catch (err) {
      /* abaikan */
    }
  }

  /* Event */
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-profil]");
    if (b) bukaProfil(b.dataset.profil);
  });

  tampilStrip();
})();

/* =========================================================
   9) HALAMAN PUBLIKASI EVENT (publikasi-event.html)
   ========================================================= */
(function halamanPublikasi() {
  if (document.body.dataset.page !== "publikasi") return;

  const KUNCI_SIMPAN = "scholarhub_event_terakhir";
  const HARGA_PROMOSI = 150000;

  const form = document.getElementById("formEvent");
  const fSect = document.getElementById("formSection");
  const rSect = document.getElementById("ringkasanSection");
  const bSect = document.getElementById("bayarSection");
  const sSect = document.getElementById("statusSection");
  const rData = document.getElementById("ringkasanData");
  const rPoster = document.getElementById("ringkasanPoster");
  const bBody = document.getElementById("bayarBody");
  const sBody = document.getElementById("statusBody");

  const state = { data: null, poster: null };

  /* Deadline minimal hari ini */
  const evDeadline = document.getElementById("evDeadline");
  evDeadline.min = inDays(0);

  /* Pratinjau poster */
  document.getElementById("evPoster").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const img = document.getElementById("posterPreview");
    if (!file) {
      img.hidden = true;
      img.src = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.hidden = false;
    };
    reader.readAsDataURL(file);
  });

  /* Pilih paket dari kartu */
  document.querySelectorAll("[data-paket]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const radio = document.querySelector(
        `input[name="paket"][value="${btn.dataset.paket}"]`,
      );
      if (radio) radio.checked = true;
      showToast(
        `Paket ${btn.dataset.paket === "gratis" ? "Gratis" : "Promosi"} dipilih.`,
      );
      fSect.scrollIntoView({ behavior: "smooth", block: "start" });
    }),
  );

  /* Validasi kelengkapan formulir */
  function tandai(id, pesan) {
    const w = document.getElementById(id);
    w.classList.add("invalid");
    w.querySelector(".field-error").textContent = pesan;
  }
  function bersihkan() {
    form.querySelectorAll(".field").forEach((w) => {
      w.classList.remove("invalid");
      const e = w.querySelector(".field-error");
      if (e) e.textContent = "";
    });
  }

  function validasiForm() {
    bersihkan();
    const v = (id) => document.getElementById(id).value.trim();
    let ok = true;
    if (v("evPenyelenggara").length < 3) {
      tandai("wrapPenyelenggara", "Nama penyelenggara minimal 3 karakter.");
      ok = false;
    }
    if (v("evNama").length < 6) {
      tandai("wrapNama", "Nama event minimal 6 karakter.");
      ok = false;
    }
    if (!v("evKategori")) {
      tandai("wrapKategori", "Pilih kategori event.");
      ok = false;
    }
    if (!v("evDeadline")) {
      tandai("wrapDeadline", "Isi deadline pendaftaran.");
      ok = false;
    }
    if (v("evDeskripsi").length < 10) {
      tandai("wrapDeskripsi", "Deskripsi minimal 10 karakter.");
      ok = false;
    }
    if (!/^https?:\/\/.+\..+/.test(v("evLink"))) {
      tandai(
        "wrapLink",
        "Tautan harus diawali http:// atau https:// dan valid.",
      );
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("evEmail"))) {
      tandai("wrapEmail", "Format email tidak valid.");
      ok = false;
    }
    if (!/^[0-9]{9,14}$/.test(v("evWa"))) {
      tandai("wrapWa", "Nomor WhatsApp 9-14 angka.");
      ok = false;
    }

    const file = document.getElementById("evPoster").files[0];
    if (!file) {
      tandai("wrapPoster", "Unggah poster event (gambar).");
      ok = false;
    } else if (!file.type.startsWith("image/")) {
      tandai("wrapPoster", "File harus berupa gambar.");
      ok = false;
    } else if (file.size > 2 * 1024 * 1024) {
      tandai("wrapPoster", "Ukuran poster maksimal 2 MB.");
      ok = false;
    }

    if (!document.querySelector('input[name="paket"]:checked')) {
      tandai("wrapPaket", "Pilih salah satu paket.");
      ok = false;
    }
    return ok;
  }

  /* Kirim formulir → ringkasan */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validasiForm()) {
      showToast(
        "Lengkapi data yang ditandai merah terlebih dahulu.",
        "peringatan",
      );
      const pertama = form.querySelector(".field.invalid");
      if (pertama)
        pertama.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const img = document.getElementById("posterPreview");
    state.data = {
      penyelenggara: document.getElementById("evPenyelenggara").value.trim(),
      nama: document.getElementById("evNama").value.trim(),
      kategori: document.getElementById("evKategori").value,
      deadline: document.getElementById("evDeadline").value,
      deskripsi: document.getElementById("evDeskripsi").value.trim(),
      link: document.getElementById("evLink").value.trim(),
      email: document.getElementById("evEmail").value.trim(),
      wa: document.getElementById("evWa").value.trim(),
      paket: document.querySelector('input[name="paket"]:checked').value,
      posterDataUrl: img.hidden ? null : img.src,
    };
    tampilRingkasan();
    showToast("Data lengkap — periksa ringkasan pengajuan.");
  });

  function tampilRingkasan() {
    const d = state.data;
    rData.innerHTML = `
      <div><dt>Penyelenggara</dt><dd>${escapeHtml(d.penyelenggara)}</dd></div>
      <div><dt>Nama event</dt><dd>${escapeHtml(d.nama)}</dd></div>
      <div><dt>Kategori</dt><dd>${d.kategori}</dd></div>
      <div><dt>Deadline</dt><dd>${fmtDate(d.deadline)}</dd></div>
      <div class="lebar"><dt>Tautan pendaftaran</dt><dd>${escapeHtml(d.link)}</dd></div>
      <div><dt>Email panitia</dt><dd>${escapeHtml(d.email)}</dd></div>
      <div><dt>WhatsApp</dt><dd>${escapeHtml(d.wa)}</dd></div>
      <div><dt>Paket</dt><dd>${
        d.paket === "gratis"
          ? "Paket Gratis · Rp 0"
          : "Paket Promosi · " + fmtRp(HARGA_PROMOSI) + " (harga contoh)"
      }</dd></div>
      <div class="lebar"><dt>Deskripsi</dt><dd>${escapeHtml(d.deskripsi)}</dd></div>`;
    rPoster.innerHTML = d.posterDataUrl
      ? `<img src="${d.posterDataUrl}" alt="Poster event">`
      : "";

    fSect.hidden = true;
    rSect.hidden = false;
    bSect.hidden = true;
    sSect.hidden = true;
    rSect.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.getElementById("btnEditData").addEventListener("click", () => {
    rSect.hidden = true;
    fSect.hidden = false;
    fSect.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Ajukan → gratis: periksa; promosi: bayar */
  document.getElementById("btnAjukanSekarang").addEventListener("click", () => {
    if (state.data.paket === "gratis") mulaiPemeriksaan();
    else {
      rSect.hidden = true;
      bSect.hidden = false;
      renderBayar();
    }
  });

  /* Pembayaran paket promosi */
  function renderBayar() {
    bBody.innerHTML = `
      <div class="total-row grand" style="margin-top:16px">
        <span>Total (harga contoh)</span><span>${fmtRp(HARGA_PROMOSI)}</span></div>
      <div class="field" style="margin-top:20px">
        <label>Metode pembayaran (semuanya simulasi)</label>
        <div class="chip-group">
          <label class="chip"><input type="radio" name="metodeEv" value="Transfer Bank" checked>
            <span><svg class="icon"><use href="#i-card"></use></svg>Transfer Bank</span></label>
          <label class="chip"><input type="radio" name="metodeEv" value="E-Wallet">
            <span><svg class="icon"><use href="#i-wallet"></use></svg>E-Wallet</span></label>
        </div>
      </div>
      <label class="agree-check">
        <input type="checkbox" id="simGagalEv">
        <span>Simulasikan pembayaran <b>gagal</b> (opsional, untuk menguji alur gagal)</span>
      </label>
      <div class="modal-cta">
        <button class="btn btn-outline" id="btnKembaliBayar" type="button">Kembali</button>
        <button class="btn btn-primary" id="btnBayarEv" type="button">
          <svg class="icon"><use href="#i-shield"></use></svg>Bayar Sekarang</button>
      </div>
      <p class="fineprint">Pembayaran sepenuhnya simulasi — tidak ada uang sungguhan yang diproses.</p>`;
    bBody.querySelector("#btnKembaliBayar").addEventListener("click", () => {
      bSect.hidden = true;
      rSect.hidden = false;
    });
    bBody.querySelector("#btnBayarEv").addEventListener("click", () => {
      const gagal = bBody.querySelector("#simGagalEv").checked;
      bBody.innerHTML = `<div class="pay-result">
        <div class="spinner"></div>
        <h3 style="margin-top:18px">Memproses pembayaran…</h3></div>`;
      setTimeout(() => {
        if (gagal) {
          bBody.innerHTML = `<div class="pay-result">
            <div class="pay-icon merah"><svg class="icon"><use href="#i-close"></use></svg></div>
            <h3>Pembayaran Gagal</h3>
            <p class="pay-sub">Simulasi pembayaran gagal — ulangi pembayaran atau batalkan pengajuan.</p>
            <div class="modal-cta">
              <button class="btn btn-primary" id="btnUlangEv">Ulangi Pembayaran</button>
              <button class="btn btn-outline" id="btnBatalEv">Batalkan</button>
            </div></div>`;
          bBody
            .querySelector("#btnUlangEv")
            .addEventListener("click", renderBayar);
          bBody.querySelector("#btnBatalEv").addEventListener("click", () => {
            bSect.hidden = true;
            rSect.hidden = false;
            showToast(
              "Pembayaran dibatalkan — pengajuan kembali ke ringkasan.",
            );
          });
        } else {
          showToast(
            "Pembayaran berhasil (simulasi) — melanjutkan ke pemeriksaan.",
            "sukses",
          );
          mulaiPemeriksaan();
        }
      }, 2000);
    });
  }

  /* Pemeriksaan admin (simulasi dengan aturan jujur) */
  function mulaiPemeriksaan() {
    rSect.hidden = true;
    bSect.hidden = true;
    sSect.hidden = false;
    sBody.innerHTML = `
      <div class="tahap-wrap">
        <div class="tahap selesai">
          <span class="tahap-ic"><svg class="icon"><use href="#i-check"></use></svg></span>
          <div><strong>Pengajuan diterima</strong><p>Data event dan poster berhasil dikirim.</p></div>
        </div>
        <div class="tahap aktif">
          <span class="tahap-ic"><span class="spinner kecil"></span></span>
          <div><strong>Sedang diperiksa admin</strong>
          <p>Simulasi — pemeriksaan memeriksa panjang deskripsi (min. 60 karakter),
          format tautan pendaftaran, dan tanggal deadline.</p></div>
        </div>
        <div class="tahap">
          <span class="tahap-ic"><svg class="icon"><use href="#i-clock"></use></svg></span>
          <div><strong>Hasil pemeriksaan</strong><p>Akan tampil otomatis setelah pemeriksaan selesai.</p></div>
        </div>
      </div>`;
    sSect.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(cekHasil, 2800);
  }

  function cekHasil() {
    const d = state.data;
    const catatan = [];
    if (d.deskripsi.trim().length < 60)
      catatan.push(
        "Deskripsi event terlalu singkat. Tambahkan detail tujuan, mekanisme, atau hadiah agar layak tayang (minimal 60 karakter).",
      );
    if (!/^https?:\/\/.+\..+/.test(d.link))
      catatan.push(
        "Tautan pendaftaran tidak valid. Gunakan tautan lengkap yang diawali http:// atau https://.",
      );
    if (daysLeft(d.deadline) <= 0)
      catatan.push(
        "Tanggal deadline sudah terlewat. Perbarui dengan tanggal di masa depan.",
      );
    if (d.nama.trim().length < 6)
      catatan.push(
        "Nama event terlalu pendek. Gunakan nama yang deskriptif (minimal 6 karakter).",
      );

    if (catatan.length) renderRevisi(catatan);
    else renderDipublikasikan();
  }

  /* Hasil: perlu revisi */
  function renderRevisi(catatan, tanpaSimpan) {
    sBody.innerHTML = `
      <div class="note danger hasil-revisi"><svg class="icon"><use href="#i-info"></use></svg>
        <div><strong>Perlu revisi.</strong> Admin menemukan beberapa hal yang perlu diperbaiki:
        <ul>${catatan.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul></div>
      </div>
      <div class="modal-cta" style="margin-top:20px">
        <button class="btn btn-primary" id="btnPerbaiki">
          <svg class="icon"><use href="#i-edit"></use></svg>Perbaiki Data</button>
      </div>`;
    sBody.querySelector("#btnPerbaiki").addEventListener("click", () => {
      sSect.hidden = true;
      fSect.hidden = false; // nilai formulir tetap terisi
      fSect.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Perbaiki data sesuai catatan revisi, lalu kirim ulang.");
    });
    if (!tanpaSimpan) simpanStatus("revisi", catatan);
  }

  /* Hasil: dipublikasikan + statistik demo */
  function renderDipublikasikan(dataSimpan) {
    const d = dataSimpan || state.data;
    const paket = dataSimpan ? dataSimpan.paket : d.paket;
    sBody.innerHTML = `
      <div class="note success"><svg class="icon"><use href="#i-check"></use></svg>
        <span><strong>Event dipublikasikan!</strong> Pengajuan Anda lolos pemeriksaan admin
        (status <b>simulasi</b> — event tidak benar-benar tayang ke publik).</span></div>

      <h3 class="modal-sub">Beginilah tampilan event Anda di katalog</h3>
      <article class="row-card">
        <div>
          <div class="tag-row">
            <span class="badge badge-dark">${escapeHtml(d.kategori)}</span>
            ${paket === "promosi" ? '<span class="badge badge-solid">Direkomendasikan</span>' : ""}
            ${deadlineBadge(d.deadline)}
          </div>
          <h3>${escapeHtml(d.nama)}</h3>
          <p class="row-org"><svg class="icon"><use href="#i-map-pin"></use></svg>${escapeHtml(d.penyelenggara)}</p>
          <p class="row-desc">${escapeHtml(d.deskripsi)}</p>
          <p class="row-meta"><svg class="icon"><use href="#i-calendar"></use></svg>
            Deadline pendaftaran: <strong>${fmtDate(d.deadline)}</strong></p>
        </div>
        <div class="row-side">
          <a class="btn btn-outline btn-sm" href="${escapeHtml(d.link)}" target="_blank" rel="noopener">
            <svg class="icon"><use href="#i-arrow"></use></svg>Halaman Pendaftaran</a>
        </div>
      </article>

      <div class="stat3">
        <div><b>342</b><span>Dilihat</span></div>
        <div><b>87</b><span>Klik tautan</span></div>
        <div><b>24</b><span>Disimpan mahasiswa</span></div>
      </div>
      <h3 class="modal-sub" style="margin-top:24px">Klik per hari
        <span class="badge badge-soft">data demo</span></h3>
      <div class="mini-chart">
        <i style="height:38%"></i><i style="height:62%"></i><i style="height:47%"></i>
        <i style="height:74%"></i><i style="height:58%"></i><i style="height:86%"></i>
        <i style="height:79%"></i>
      </div>
      <div class="mini-chart-label">${label7Hari()
        .map((l) => `<span>${l}</span>`)
        .join("")}</div>
      <p class="fineprint">* Statistik klik merupakan data demo statis, bukan hasil pengukuran nyata.</p>

      <div class="modal-cta" style="margin-top:22px">
        <button class="btn btn-primary" id="btnEventBaru">
          <svg class="icon"><use href="#i-refresh"></use></svg>Ajukan Event Lain</button>
      </div>`;

    sBody.querySelector("#btnEventBaru").addEventListener("click", () => {
      sSect.hidden = true;
      fSect.hidden = false;
      form.reset();
      document.getElementById("posterPreview").hidden = true;
      fSect.scrollIntoView({ behavior: "smooth", block: "start" });
      localStorage.removeItem(KUNCI_SIMPAN);
      document.getElementById("stripSection").hidden = true;
      showToast("Formulir dikosongkan — siap untuk pengajuan baru.");
    });
    if (!dataSimpan) simpanStatus("dipublikasikan", []);
  }

  function label7Hari() {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const t = new Date();
      t.setDate(t.getDate() - i);
      out.push(t.getDate() + "/" + (t.getMonth() + 1));
    }
    return out;
  }

  /* Simpan & tampilkan status terakhir (localStorage) */
  function simpanStatus(status, catatan) {
    const d = state.data;
    localStorage.setItem(
      KUNCI_SIMPAN,
      JSON.stringify({
        penyelenggara: d.penyelenggara,
        nama: d.nama,
        kategori: d.kategori,
        deadline: d.deadline,
        deskripsi: d.deskripsi,
        link: d.link,
        paket: d.paket,
        status,
        catatan,
        waktu: new Date().toLocaleString("id-ID"),
      }),
    );
    tampilStrip();
  }

  function tampilStrip() {
    try {
      const d = JSON.parse(localStorage.getItem(KUNCI_SIMPAN));
      if (!d) return;
      const sukses = d.status === "dipublikasikan";
      document.getElementById("stripSection").hidden = false;
      document.getElementById("stripIsi").innerHTML = `
        <div class="note ${sukses ? "success" : "danger"}">
          <svg class="icon"><use href="${sukses ? "#i-check" : "#i-info"}"></use></svg>
          <span>Pengajuan terakhir (browser ini): <b>${escapeHtml(d.nama)}</b> — status:
          <b>${sukses ? "Dipublikasikan" : "Perlu revisi"}</b> (simulasi, ${escapeHtml(d.waktu)}).</span>
          <button class="link-btn" id="lihatEventLalu">${sukses ? "Lihat hasil" : "Perbaiki data"}</button>
        </div>`;
      document
        .getElementById("lihatEventLalu")
        .addEventListener("click", () => {
          fSect.hidden = true;
          rSect.hidden = true;
          bSect.hidden = true;
          sSect.hidden = false;
          if (sukses) renderDipublikasikan(d);
          else {
            state.data = d;
            renderRevisi(
              d.catatan || [
                "Lengkapi data pengajuan sesuai catatan sebelumnya.",
              ],
              true,
            );
          }
          sSect.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    } catch (err) {
      /* abaikan */
    }
  }

  /* Reset formulir juga mengosongkan pratinjau poster */
  document.getElementById("btnResetForm").addEventListener("click", () => {
    document.getElementById("posterPreview").hidden = true;
    bersihkan();
  });

  tampilStrip();
})();
