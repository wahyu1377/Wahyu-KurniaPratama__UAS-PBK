<template>
  <div class="customer-detail">
    <div class="detail-header">
      <button @click="goBack" class="btn btn-secondary">
        ← Back to Customers
      </button>
      <h2>Customer Detail</h2>
    </div>

    <div v-if="loading" class="loading">Loading customer details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="customer" class="customer-info">
      <div class="info-card">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> {{ customer.name }}</p>
        <p><strong>Phone:</strong> {{ customer.phone }}</p>
        <p><strong>Email:</strong> {{ customer.email }}</p>
        <p><strong>Address:</strong> {{ customer.address }}</p>
        <p><strong>Total Orders:</strong> {{ customer.totalOrders }}</p>
        <p>
          <strong>Member Since:</strong> {{ formatDate(customer.createdAt) }}
        </p>
      </div>

      <div class="info-card">
        <h3>Recent Orders</h3>
        <div v-if="customerOrders.length > 0">
          <div
            v-for="order in customerOrders"
            :key="order.id"
            class="order-item"
          >
            <div class="order-info">
              <span
                ><strong>#{{ order.id }}</strong> - {{ order.service }}</span
              >
              <span class="order-date">{{ formatDate(order.createdAt) }}</span>
            </div>
            <div class="order-status">
              <span :class="['status', order.status]">{{ order.status }}</span>
              <span class="order-price"
                >Rp {{ formatPrice(order.totalPrice) }}</span
              >
            </div>
          </div>
        </div>
        <div v-else class="no-orders">
          <p>No orders found for this customer.</p>
        </div>
      </div>

      <div class="actions">
        <button @click="editCustomer" class="btn btn-primary">
          Edit Customer
        </button>
        <button @click="deleteCustomer" class="btn btn-danger">
          Delete Customer
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <h3>Customer not found</h3>
      <p>The customer you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const customerId = ref(route.params.id)
const customer = ref(null)
const customerOrders = ref([])
const loading = ref(false)
const error = ref('')

const fetchCustomer = async () => {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:3001/customers/${customerId.value}`)
    if (!response.ok) throw new Error('Customer not found')
    customer.value = await response.json()

    // Fetch customer orders
    await fetchCustomerOrders()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const fetchCustomerOrders = async () => {
  try {
    const response = await fetch(`http://localhost:3001/orders?customerName=${customer.value.name}`)
    if (response.ok) {
      customerOrders.value = await response.json()
    }
  } catch (err) {
    console.error('Failed to fetch customer orders:', err)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}

const goBack = () => {
  router.push('/customers')
}

const editCustomer = () => {
  console.log('Edit customer:', customer.value)
}

const deleteCustomer = async () => {
  if (confirm('Are you sure you want to delete this customer?')) {
    try {
      const response = await fetch(`http://localhost:3001/customers/${customerId.value}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete customer')
      router.push('/customers')
    } catch (err) {
      error.value = err.message
    }
  }
}

onMounted(() => {
  fetchCustomer()
})
</script>

<style scoped>
.customer-detail {
  padding: 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.customer-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.info-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-card h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.info-card p {
  margin-bottom: 8px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-date {
  font-size: 0.8rem;
  color: #666;
}

.order-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
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

.order-price {
  font-size: 0.9rem;
  font-weight: bold;
  color: #3498db;
}

.no-orders {
  text-align: center;
  padding: 20px;
  color: #666;
}

.actions {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.error {
  color: #e74c3c;
}
</style>
