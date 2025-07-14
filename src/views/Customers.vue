<template>
  <div class="customers">
    <div class="customers-header">
      <h2>Customer Management</h2>
      <button @click="showAddModal = true" class="btn btn-primary">
        Add New Customer
      </button>
    </div>

    <div v-if="loading" class="loading">Loading customers...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="customers-content">
      <div class="customers-grid">
        <div
          v-for="customer in customers"
          :key="customer.id"
          class="customer-card"
        >
          <div class="customer-info">
            <h3>{{ customer.name }}</h3>
            <p><strong>Phone:</strong> {{ customer.phone }}</p>
            <p><strong>Email:</strong> {{ customer.email }}</p>
            <p><strong>Address:</strong> {{ customer.address }}</p>
            <p><strong>Total Orders:</strong> {{ customer.totalOrders }}</p>
            <p>
              <strong>Member Since:</strong>
              {{ formatDate(customer.createdAt) }}
            </p>
          </div>
          <div class="customer-actions">
            <button
              @click="editCustomer(customer)"
              class="btn btn-sm btn-secondary"
            >
              Edit
            </button>
            <button
              @click="deleteCustomer(customer.id)"
              class="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Customer Modal -->
    <div
      v-if="showAddModal"
      class="modal-overlay"
      @click="showAddModal = false"
    >
      <div class="modal" @click.stop>
        <h3>Add New Customer</h3>
        <form @submit.prevent="addNewCustomer">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="newCustomer.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Phone:</label>
            <input v-model="newCustomer.phone" type="tel" required />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="newCustomer.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Address:</label>
            <textarea
              v-model="newCustomer.address"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="form-actions">
            <button
              type="button"
              @click="showAddModal = false"
              class="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Add Customer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mockCustomers } from '../data/mockData.js'

const customers = ref([...mockCustomers])
const loading = ref(false)
const error = ref('')
const showAddModal = ref(false)

const newCustomer = ref({
  name: '',
  phone: '',
  email: '',
  address: ''
})

const fetchCustomers = async () => {
  loading.value = true
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300))
  loading.value = false
}

const addNewCustomer = async () => {
  try {
    const customer = {
      ...newCustomer.value,
      id: Date.now(),
      totalOrders: 0,
      createdAt: new Date().toISOString()
    }

    customers.value.unshift(customer)
    showAddModal.value = false
    newCustomer.value = { name: '', phone: '', email: '', address: '' }
  } catch (err) {
    error.value = "Failed to add customer"
  }
}

const editCustomer = (customer) => {
  console.log('Edit customer:', customer)
  // Implement edit functionality
}

const deleteCustomer = async (id) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    try {
      const index = customers.value.findIndex(c => c.id === id)
      if (index !== -1) {
        customers.value.splice(index, 1)
      }
    } catch (err) {
      error.value = "Failed to delete customer"
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID')
}

onMounted(() => {
  fetchCustomers()
})
</script>

<style scoped>
.customers {
  padding: 20px;
}

.customers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.customers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.customer-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;
}

.customer-card:hover {
  transform: translateY(-2px);
}

.customer-info h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.customer-info p {
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.customer-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
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
.form-group textarea {
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
