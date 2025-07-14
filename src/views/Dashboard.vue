<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Orders</h3>
        <p class="stat-number">{{ totalOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Pending Orders</h3>
        <p class="stat-number">{{ pendingOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Completed Orders</h3>
        <p class="stat-number">{{ completedOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Customers</h3>
        <p class="stat-number">{{ customers.length }}</p>
      </div>
    </div>

    <div class="recent-orders">
      <h3>Recent Orders</h3>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="retryFetch" class="btn btn-primary">Retry</button>
      </div>
      <table v-else class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.service }}</td>
            <td>
              <span :class="['status', order.status]">
                {{ order.status }}
              </span>
            </td>
            <td>{{ formatDate(order.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { mockCustomers } from '../data/mockData.js'

const ordersStore = useOrdersStore()
const customers = ref([...mockCustomers])

const totalOrders = computed(() => ordersStore.totalOrders)
const pendingOrders = computed(() => ordersStore.pendingOrders)
const completedOrders = computed(() => ordersStore.completedOrders)
const loading = computed(() => ordersStore.loading)
const error = computed(() => ordersStore.error)

const recentOrders = computed(() =>
  ordersStore.orders.slice(0, 5)
)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}

const retryFetch = async () => {
  await ordersStore.fetchOrders()
}

onMounted(async () => {
  await ordersStore.fetchOrders()
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
  margin: 10px 0 0 0;
}

.recent-orders {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.orders-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status.completed {
  background-color: #d4edda;
  color: #155724;
}

.status.processing {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status.delivered {
  background-color: #e2e3e5;
  color: #383d41;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #e74c3c;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
