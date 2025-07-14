# Sistem Manajemen Laundry

Aplikasi web untuk mengelola bisnis laundry yang dibuat dengan Vue.js 3, Vue Router, Pinia, dan menggunakan mock data untuk demo. Proyek ini dibuat untuk memenuhi tugas UAS mata kuliah Pemrograman Berbasis Komponen (PBK).

## Deskripsi Proyek

Sistem Manajemen Laundry adalah aplikasi web yang membantu pemilik usaha laundry dalam mengelola operasional harian mereka. Aplikasi ini menyediakan fitur lengkap mulai dari pencatatan pesanan, manajemen pelanggan, pengaturan layanan, hingga laporan keuangan.

### Latar Belakang Masalah

Banyak usaha laundry masih menggunakan sistem pencatatan manual yang rentan terhadap kesalahan dan kehilangan data. Sistem manual juga menyulitkan dalam:
- Melacak status pesanan pelanggan
- Menghitung pendapatan dan keuntungan
- Mengelola data pelanggan
- Membuat laporan bisnis

Aplikasi ini hadir untuk mengatasi masalah tersebut dengan menyediakan sistem digital yang mudah digunakan.

## Fitur Utama

### 1. Dashboard
- Ringkasan statistik bisnis (total pesanan, pesanan pending, pesanan selesai, total pelanggan)
- Daftar pesanan terbaru
- Tampilan yang informatif dan mudah dipahami

### 2. Manajemen Pesanan
- Tambah pesanan baru dengan detail lengkap
- Edit dan hapus pesanan
- Update status pesanan (Pending → Processing → Completed → Delivered)
- Pencarian dan filter pesanan
- Kalkulasi otomatis total harga berdasarkan berat dan tarif

### 3. Manajemen Pelanggan
- Database pelanggan dengan informasi lengkap
- Riwayat pesanan per pelanggan
- Tambah, edit, dan hapus data pelanggan
- Tracking loyalitas pelanggan

### 4. Manajemen Layanan
- Katalog layanan laundry (Wash & Dry, Dry Clean, Iron Only, Express, Premium Care)
- Pengaturan harga per kilogram
- Estimasi waktu pengerjaan
- Deskripsi detail setiap layanan

### 5. Laporan dan Analitik
- Laporan pendapatan berdasarkan periode
- Grafik pesanan berdasarkan status
- Analisis layanan paling populer
- Filter laporan (hari ini, minggu ini, bulan ini, tahun ini, semua waktu)
- Statistik tingkat keberhasilan pesanan

### 6. Sistem Autentikasi
- Login dengan username dan password
- Perlindungan halaman dengan route guard
- Session management dengan localStorage

## Teknologi yang Digunakan

### Frontend
- **Vue.js 3** - Framework JavaScript dengan Composition API
- **Vue Router 4** - Routing dengan history mode dan navigation guard
- **Pinia** - State management yang modern dan ringan

### Development Tools
- **Vite** - Build tool yang cepat untuk development
- **Vitest** - Framework testing yang terintegrasi
- **@vue/test-utils** - Utilities untuk testing komponen Vue

### Styling
- **CSS3** - Styling dengan Flexbox dan Grid
- **Responsive Design** - Desain yang adaptif untuk semua ukuran layar

### Data Management
- **Mock Data** - Data simulasi untuk demo tanpa perlu backend server

## Struktur Folder

\`\`\`
src/
├── components/          # Komponen yang dapat digunakan ulang
│   ├── Header.vue      # Header aplikasi
│   └── Sidebar.vue     # Navigasi sidebar
├── views/              # Halaman utama aplikasi
│   ├── Dashboard.vue   # Halaman dashboard
│   ├── Orders.vue      # Manajemen pesanan
│   ├── Customers.vue   # Manajemen pelanggan
│   ├── Services.vue    # Manajemen layanan
│   ├── Reports.vue     # Laporan dan analitik
│   └── Login.vue       # Halaman login
├── stores/             # Pinia stores untuk state management
│   ├── auth.js        # State autentikasi
│   └── orders.js      # State manajemen pesanan
├── data/               # Mock data untuk demo
│   └── mockData.js    # Data simulasi
├── router/             # Konfigurasi Vue Router
│   └── index.js       # Definisi routes
├── __tests__/         # File-file testing
└── style.css          # Global styling
\`\`\`

## Cara Menjalankan Aplikasi

### Persyaratan Sistem
- Node.js versi 16 atau lebih baru
- npm atau yarn package manager

### Langkah Instalasi

1. **Clone atau download project**
\`\`\`bash
git clone [repository-url]
cd laundry-management-system
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Jalankan development server**
\`\`\`bash
npm run dev
\`\`\`

4. **Buka browser dan akses**
\`\`\`
http://localhost:5173
\`\`\`

### Kredensial Login Demo
\`\`\`
Username: admin
Password: admin123
\`\`\`

## Testing

### Menjalankan Unit Test
\`\`\`bash
# Jalankan semua test
npm run test

# Jalankan test dengan watch mode
npm run test:watch

# Jalankan test dengan UI
npm run test:ui
\`\`\`

### Coverage Testing
Proyek ini memiliki unit test untuk:
- Komponen Vue (Login, Sidebar, Header)
- Pinia stores (Auth, Orders)
- Router configuration
- Utility functions
- Basic functionality

## Build untuk Production

\`\`\`bash
# Build aplikasi
npm run build

# Preview build hasil
npm run preview
\`\`\`

File hasil build akan tersimpan di folder `dist/` dan siap untuk di-deploy.

## Deployment

### Deploy ke Vercel
1. Build aplikasi dengan `npm run build`
2. Upload folder `dist` ke Vercel
3. Aplikasi siap diakses

### Deploy ke Netlify
1. Connect repository GitHub ke Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## Data Demo

Aplikasi menggunakan mock data yang sudah disiapkan:
- **8 pesanan** dengan berbagai status dan layanan
- **6 pelanggan** dengan informasi lengkap
- **5 layanan** dengan harga yang berbeda
- **Total pendapatan** Rp 128.100 dari semua pesanan

## Fitur Responsive

Aplikasi ini dirancang responsive dan dapat digunakan di:
- **Desktop** (1200px ke atas): Layout penuh dengan sidebar
- **Tablet** (768px - 1199px): Layout yang disesuaikan
- **Mobile** (kurang dari 768px): Layout mobile-friendly

## Pengembangan Selanjutnya

Beberapa fitur yang bisa ditambahkan:
- Integrasi dengan database real (MySQL/PostgreSQL)
- Sistem notifikasi WhatsApp untuk pelanggan
- Laporan dalam format PDF/Excel
- Multi-branch untuk usaha dengan beberapa cabang
- Sistem inventory untuk tracking deterjen dan supplies
- Payment gateway untuk pembayaran online

## Kontribusi

Jika ingin berkontribusi pada proyek ini:
1. Fork repository
2. Buat branch baru untuk fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

Proyek ini menggunakan lisensi MIT. Silakan gunakan dan modifikasi sesuai kebutuhan.

## Kontak
Nama: [WAHYU KURNIA PRATAMA]
NIM: [233510228]
Email: [wahyukurniapratama@student.uir.ac.id]
GitHub:https://github.com/wahyu1377 

---

**Catatan**: Proyek ini dibuat untuk keperluan akademik sebagai tugas UAS mata kuliah Pemrograman Berbasis Komponen (PBK). Semua data yang digunakan adalah data simulasi untuk keperluan demo.

*Terakhir diupdate: Januari 2024*
