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
      <div v-else-if="error" class="error">{{ error }}</div>
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

const ordersStore = useOrdersStore()
const customers = ref([])

const totalOrders = computed(() => ordersStore.totalOrders)
const pendingOrders = computed(() => ordersStore.pendingOrders)
const completedOrders = computed(() => ordersStore.completedOrders)
const loading = computed(() => ordersStore.loading)
const error = computed(() => ordersStore.error)

const recentOrders = computed(() =>
  ordersStore.orders.slice(0, 5)
)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const fetchCustomers = async () => {
  try {
    const response = await fetch('http://localhost:3001/customers')
    customers.value = await response.json()
  } catch (err) {
    console.error('Failed to fetch customers:', err)
  }
}

onMounted(async () => {
  await ordersStore.fetchOrders()
  await fetchCustomers()
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

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #e74c3c;
}
</style>
