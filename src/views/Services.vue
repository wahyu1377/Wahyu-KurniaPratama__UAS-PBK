<template>
  <div class="services">
    <div class="services-header">
      <h2>Service Management</h2>
      <button @click="showAddModal = true" class="btn btn-primary">
        Add New Service
      </button>
    </div>

    <div v-if="loading" class="loading">Loading services...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="services-content">
      <div class="services-grid">
        <div v-for="service in services" :key="service.id" class="service-card">
          <div class="service-info">
            <h3>{{ service.name }}</h3>
            <p class="price">Rp {{ formatPrice(service.price) }}/kg</p>
            <p><strong>Duration:</strong> {{ service.duration }}</p>
            <p class="description">{{ service.description }}</p>
          </div>
          <div class="service-actions">
            <button
              @click="editService(service)"
              class="btn btn-sm btn-secondary"
            >
              Edit
            </button>
            <button
              @click="deleteService(service.id)"
              class="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Service Modal -->
    <div
      v-if="showAddModal"
      class="modal-overlay"
      @click="showAddModal = false"
    >
      <div class="modal" @click.stop>
        <h3>Add New Service</h3>
        <form @submit.prevent="addNewService">
          <div class="form-group">
            <label>Service Name:</label>
            <input v-model="newService.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Price per kg (Rp):</label>
            <input v-model.number="newService.price" type="number" required />
          </div>
          <div class="form-group">
            <label>Duration:</label>
            <input
              v-model="newService.duration"
              type="text"
              required
              placeholder="e.g., 24 hours"
            />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea
              v-model="newService.description"
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
            <button type="submit" class="btn btn-primary">Add Service</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const services = ref([])
const loading = ref(false)
const error = ref('')
const showAddModal = ref(false)

const newService = ref({
  name: '',
  price: 0,
  duration: '',
  description: ''
})

const fetchServices = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/services')
    if (!response.ok) throw new Error('Failed to fetch services')
    services.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const addNewService = async () => {
  try {
    const response = await fetch('http://localhost:3001/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newService.value,
        id: Date.now()
      })
    })

    if (!response.ok) throw new Error('Failed to add service')
    const service = await response.json()
    services.value.push(service)
    showAddModal.value = false
    newService.value = { name: '', price: 0, duration: '', description: '' }
  } catch (err) {
    error.value = err.message
  }
}

const editService = (service) => {
  console.log('Edit service:', service)
}

const deleteService = async (id) => {
  if (confirm('Are you sure you want to delete this service?')) {
    try {
      const response = await fetch(`http://localhost:3001/services/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete service')
      services.value = services.value.filter(s => s.id !== id)
    } catch (err) {
      error.value = err.message
    }
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.services {
  padding: 20px;
}

.services-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.service-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-info h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 10px;
}

.description {
  color: #666;
  font-style: italic;
  margin-top: 10px;
}

.service-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
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
</style>
