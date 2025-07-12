# Laundry Management System

Sistem manajemen laundry yang dibangun menggunakan Vue.js 3, Vue Router, Pinia, dan json-server untuk memenuhi persyaratan tugas UAS PBK.

## Fitur Utama

### 1. Dashboard

- Statistik ringkasan (total orders, pending orders, completed orders, total customers)
- Daftar order terbaru
- Grafik visual sederhana

### 2. Order Management

- Tambah order baru
- Edit status order
- Hapus order
- Filter dan pencarian order

### 3. Customer Management

- Daftar semua customer
- Tambah customer baru
- Edit informasi customer
- Hapus customer

### 4. Service Management

- Daftar layanan laundry
- Tambah layanan baru
- Edit layanan
- Hapus layanan

### 5. Reports & Analytics

- Laporan berdasarkan periode (hari, minggu, bulan, tahun)
- Statistik revenue dan order
- Grafik order berdasarkan status
- Layanan paling populer

### 6. Authentication

- Login system dengan demo credentials
- Route protection
- Session management

## Teknologi yang Digunakan

- **Vue.js 3** - Framework JavaScript
- **Vue Router** - Routing dengan history mode dan nested routes
- **Pinia** - State management
- **Vitest** - Unit testing
- **json-server** - Mock REST API
- **Vite** - Build tool dan development server

## Struktur API Endpoints

### Orders

- `GET /orders` - Mendapatkan semua order
- `POST /orders` - Menambah order baru
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Hapus order

### Customers

- `GET /customers` - Mendapatkan semua customer
- `POST /customers` - Menambah customer baru
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Hapus customer

### Services

- `GET /services` - Mendapatkan semua layanan
- `POST /services` - Menambah layanan baru
- `PUT /services/:id` - Update layanan
- `DELETE /services/:id` - Hapus layanan

### Users

- `GET /users` - Mendapatkan data user (untuk authentication)

## Instalasi dan Menjalankan Aplikasi

### Prerequisites

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. Clone repository
   \`\`\`bash
   git clone <repository-url>
   cd laundry-management-system
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Jalankan json-server (terminal pertama)
   \`\`\`bash
   npm run json-server
   \`\`\`

4. Jalankan development server (terminal kedua)
   \`\`\`bash
   npm run dev
   \`\`\`

5. Atau jalankan keduanya sekaligus
   \`\`\`bash
   npm run dev:full
   \`\`\`

### Menjalankan Testing

\`\`\`bash

# Jalankan unit tests

npm run test

# Jalankan tests dengan UI

npm run test:ui
\`\`\`

## Demo Credentials

- **Username:** admin
- **Password:** admin123

## Struktur Folder

\`\`\`
src/
├── components/ # Komponen reusable
│ ├── Header.vue
│ └── Sidebar.vue
├── views/ # Halaman utama
│ ├── Dashboard.vue
│ ├── Orders.vue
│ ├── Customers.vue
│ ├── Services.vue
│ ├── Reports.vue
│ └── Login.vue
├── stores/ # Pinia stores
│ ├── auth.js
│ └── orders.js
├── router/ # Vue Router configuration
│ └── index.js
├── tests/ # Unit tests
│ ├── OrdersStore.test.js
│ └── LoginComponent.test.js
├── App.vue # Root component
├── main.js # Entry point
└── style.css # Global styles
\`\`\`

## Fitur State Management (Pinia)

### Auth Store

- Mengelola state authentication
- Login/logout functionality
- Session persistence

### Orders Store

- Mengelola data orders
- CRUD operations untuk orders
- Computed properties untuk statistik
- Error handling

## Unit Testing

Aplikasi ini dilengkapi dengan unit tests menggunakan Vitest untuk:

1. **Orders Store Testing**

   - Test state initialization
   - Test computed properties (totalOrders, pendingOrders, completedOrders)
   - Test API calls (fetchOrders, addOrder, updateOrder, deleteOrder)
   - Test error handling

2. **Login Component Testing**
   - Test component rendering
   - Test form interactions
   - Test authentication flow
   - Test error messages

## Responsive Design

Aplikasi ini responsive dan dapat digunakan di:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Pengembangan Lebih Lanjut

Fitur yang dapat ditambahkan:

- Real-time notifications
- Print receipt functionality
- Advanced reporting dengan charts
- Multi-user roles
- Inventory management
- SMS/WhatsApp integration
- Payment gateway integration

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Nama: [Wahyu Kurnia Pratama]
NPM: [233510228]
Email: [wahyukurniapratama@studebt.uir.ac.id]

Project Link: [https://github.com/username/laundry-management-system](https://github.com/username/laundry-management-system)

