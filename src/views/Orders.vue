<template>
  <div class="orders">
    <div class="orders-header">
      <h2>Order Management</h2>
      <button @click="showAddModal = true" class="btn btn-primary">
        Add New Order
      </button>
    </div>

    <div v-if="loading" class="loading">Loading orders...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="orders-content">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Weight (kg)</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.phone }}</td>
            <td>{{ order.service }}</td>
            <td>{{ order.weight }}</td>
            <td>Rp {{ formatPrice(order.totalPrice) }}</td>
            <td>
              <select
                v-model="order.status"
                @change="updateOrderStatus(order.id, order.status)"
                class="status-select"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="delivered">Delivered</option>
              </select>
            </td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td>
              <button
                @click="editOrder(order)"
                class="btn btn-sm btn-secondary"
              >
                Edit
              </button>
              <button
                @click="deleteOrderConfirm(order.id)"
                class="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Order Modal -->
    <div
      v-if="showAddModal"
      class="modal-overlay"
      @click="showAddModal = false"
    >
      <div class="modal" @click.stop>
        <h3>Add New Order</h3>
        <form @submit.prevent="addNewOrder">
          <div class="form-group">
            <label>Customer Name:</label>
            <input v-model="newOrder.customerName" type="text" required />
          </div>
          <div class="form-group">
            <label>Phone:</label>
            <input v-model="newOrder.phone" type="tel" required />
          </div>
          <div class="form-group">
            <label>Service:</label>
            <select v-model="newOrder.service" required>
              <option value="">Select Service</option>
              <option value="Wash & Dry">Wash & Dry</option>
              <option value="Dry Clean">Dry Clean</option>
              <option value="Iron Only">Iron Only</option>
              <option value="Express">Express</option>
            </select>
          </div>
          <div class="form-group">
            <label>Weight (kg):</label>
            <input
              v-model.number="newOrder.weight"
              type="number"
              step="0.1"
              required
            />
          </div>
          <div class="form-group">
            <label>Price per kg:</label>
            <input
              v-model.number="newOrder.pricePerKg"
              type="number"
              required
            />
          </div>
          <div class="form-actions">
            <button
              type="button"
              @click="showAddModal = false"
              class="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Order</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOrdersStore } from '../stores/orders'

const ordersStore = useOrdersStore()

const orders = computed(() => ordersStore.orders)
const loading = computed(() => ordersStore.loading)
const error = computed(() => ordersStore.error)

const showAddModal = ref(false)
const newOrder = ref({
  customerName: '',
  phone: '',
  service: '',
  weight: 0,
  pricePerKg: 5000
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}

const addNewOrder = async () => {
  const orderData = {
    ...newOrder.value,
    totalPrice: newOrder.value.weight * newOrder.value.pricePerKg
  }

  const result = await ordersStore.addOrder(orderData)
  if (result.success) {
    showAddModal.value = false
    newOrder.value = {
      customerName: '',
      phone: '',
      service: '',
      weight: 0,
      pricePerKg: 5000
    }
  }
}

const updateOrderStatus = async (id, status) => {
  await ordersStore.updateOrder(id, { status })
}

const editOrder = (order) => {
  // Implement edit functionality
  console.log('Edit order:', order)
}

const deleteOrderConfirm = async (id) => {
  if (confirm('Are you sure you want to delete this order?')) {
    await ordersStore.deleteOrder(id)
  }
}

onMounted(() => {
  ordersStore.fetchOrders()
})
</script>

<style scoped>
.orders {
  padding: 20px;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.orders-table {
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-collapse: collapse;
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

.status-select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 5px;
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

.btn-sm {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.error {
  color: #e74c3c;
}
</style>
