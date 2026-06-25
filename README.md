# SOLITECH Monitoring

SOLITECH Monitoring adalah aplikasi dasbor pemantauan kinerja dan kesehatan perangkat keras (hardware) komputer yang modern dan interaktif. Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah **Interaksi Manusia dan Komputer (IMK)** di Semester 4.

Aplikasi ini telah ditingkatkan dari proyek visual statis menjadi aplikasi dinamis yang sepenuhnya interaktif, serta dilengkapi dengan **Local Hardware Monitoring Agent (Backend)** opsional untuk membaca sensor perangkat keras secara nyata (real-time).

---

## 🚀 Fitur Utama

### 1. Dasbor Pemantauan Interaktif (Dashboard)
* **Metrik Real-time**: Menampilkan performa CPU (beban & suhu), GPU (beban & suhu), RAM (penggunaan & kapasitas), SSD (sisa kapasitas), dan status Baterai.
* **Integrasi Sensor Nyata**: Otomatis beralih dari data simulasi ke data sensor sistem nyata ketika Local Backend Agent dijalankan.
* **Notifikasi Global**: Lonceng notifikasi interaktif di header untuk mengakses pemberitahuan penting secara langsung.

### 2. Jadwal Pemeliharaan (Schedule)
* **Manajemen Tugas**: Tambah dan pantau tugas pemeliharaan perangkat keras (seperti ganti thermal paste, bersihkan debu, kalibrasi baterai).
* **Kalender Interaktif**: Memilih tanggal untuk memfilter tugas pemeliharaan spesifik pada hari tersebut.
* **Detail & Status Tugas**: Kartu detail tugas interaktif dengan status *badge* dinamis.

### 3. Pusat Panduan Teknis (Guide)
* **Filter & Pencarian Pintar**: Memfilter panduan berdasarkan kategori (Prosesor, Baterai, Kebersihan, Layar) dan kolom pencarian real-time.
* **Modal Detail Panduan**: Klik pada kartu panduan untuk membuka langkah-langkah pemeliharaan terperinci disertai visualisasi gambar yang relevan.
* **Diagnosa Mandiri (Hardware Scan)**: Fitur simulasi pemindaian komponen sistem dengan visualisasi radar pemindai dan laporan kesehatan sistem akhir.

### 4. Manajemen Profil & Perangkat (Profile)
* **Edit Profil**: Mengubah nama, email, dan mengunggah foto profil (avatar) secara langsung di browser.
* **Manajemen Perangkat Terhubung**:
  * Tambah perangkat baru dengan informasi tipe (PC, Mac, Mobile, Tablet, Server), lokasi, dan alamat IP.
  * Atur parameter pemantauan per perangkat (interval pemindaian, aktifkan/nonaktifkan alarm).
  * Putuskan koneksi perangkat dari daftar secara dinamis.
* **Log Aktivitas & Unduh CSV**: Pencatatan log aktivitas sistem dengan tombol **Unduh Log (.csv)** yang menghasilkan berkas laporan aktivitas secara instan untuk diunduh klien.
* **Pengaturan Cepat (Quick Settings)**: Akses ke tiga modal pengaturan tambahan:
  1. *Keamanan & Privasi* (Otentikasi dua faktor, enkripsi log).
  2. *Preferensi Notifikasi* (Batas alarm suhu, peringatan pemeliharaan).
  3. *Bantuan & Dukungan* (FAQ sistem pemantauan).

---

## 🛠️ Arsitektur & Teknologi

Proyek ini terbagi menjadi dua bagian utama:

1. **Frontend (Aplikasi Klien)**
   * **React** (Framework antarmuka komponen)
   * **Vite** (Build tool berkecepatan tinggi)
   * **Vanilla CSS** (Desain visual premium dengan tema gelap/terang adaptif)
   * **React Router DOM** (Navigasi halaman)

2. **Backend Agent (Pemindai Sensor Lokal)**
   * **Node.js** & **Express** (Server API lokal pada port `5000`)
   * **Systeminformation** (Library penjelajah telemetri sistem operasi untuk membaca beban CPU, suhu inti, RAM aktif, partisi SSD, dan kapasitas sel baterai)
   * **CORS** (Diaktifkan untuk komunikasi lintas asal yang aman antara frontend dan backend)

---

## 💻 Cara Menjalankan Proyek

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### 1. Menjalankan Aplikasi Frontend
1. Buka terminal di direktori utama proyek.
2. Instal dependensi frontend:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka alamat lokal yang tertera (biasanya `http://localhost:5173`) di browser Anda.

### 2. Menjalankan Backend Agent (Untuk Sensor Real-time)
1. Buka terminal baru dan masuk ke folder `agent`:
   ```bash
   cd agent
   ```
2. Instal dependensi backend:
   ```bash
   npm install
   ```
3. Jalankan server backend agent:
   ```bash
   npm start
   ```
4. Terminal akan menampilkan konfirmasi bahwa server berjalan di `http://localhost:5000`. Dasbor frontend Anda sekarang secara otomatis akan membaca sensor perangkat keras asli dari komputer Anda secara berkala.

---

*Catatan: Saat mengakses aplikasi melalui tautan publik seperti Vercel, browser modern mungkin memblokir pemanggilan API HTTP lokal (`http://localhost:5000`) karena kebijakan Mixed Content. Untuk mengujinya di tautan Vercel dari PC yang sama, Anda dapat mengizinkan "Insecure Content" pada setelan situs browser Anda.*
