<template>
  <div class="order-detail">
    <div class="detail-header">
      <button @click="goBack" class="btn btn-secondary">
        ← Back to Orders
      </button>
      <h2>Order Detail #{{ orderId }}</h2>
    </div>

    <div v-if="loading" class="loading">Loading order details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="order" class="order-info">
      <div class="info-card">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> {{ order.customerName }}</p>
        <p><strong>Phone:</strong> {{ order.phone }}</p>
      </div>

      <div class="info-card">
        <h3>Order Information</h3>
        <p><strong>Service:</strong> {{ order.service }}</p>
        <p><strong>Weight:</strong> {{ order.weight }} kg</p>
        <p>
          <strong>Price per kg:</strong> Rp {{ formatPrice(order.pricePerKg) }}
        </p>
        <p>
          <strong>Total Price:</strong> Rp {{ formatPrice(order.totalPrice) }}
        </p>
        <p>
          <strong>Status:</strong>
          <span :class="['status', order.status]">{{ order.status }}</span>
        </p>
        <p><strong>Date:</strong> {{ formatDate(order.createdAt) }}</p>
      </div>

      <div class="actions">
        <button @click="editOrder" class="btn btn-primary">Edit Order</button>
        <button @click="deleteOrder" class="btn btn-danger">
          Delete Order
        </button>
      </div>
    </div>

    <div v-else class="not-found">
      <h3>Order not found</h3>
      <p>The order you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const orderId = ref(route.params.id)
const order = ref(null)
const loading = ref(false)
const error = ref('')

const fetchOrder = async () => {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:3001/orders/${orderId.value}`)
    if (!response.ok) throw new Error('Order not found')
    order.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}

const goBack = () => {
  router.push('/orders')
}

const editOrder = () => {
  // Implement edit functionality
  console.log('Edit order:', order.value)
}

const deleteOrder = async () => {
  if (confirm('Are you sure you want to delete this order?')) {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId.value}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete order')
      router.push('/orders')
    } catch (err) {
      error.value = err.message
    }
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<style scoped>
.order-detail {
  padding: 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.order-info {
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
