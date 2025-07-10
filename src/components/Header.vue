<template>
  <header class="header">
    <div class="header-content">
      <h1>{{ pageTitle }}</h1>
      <div class="header-actions">
        <span>Welcome, {{ user?.name || 'User' }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const pageTitle = computed(() => {
  const titles = {
    'Dashboard': 'Dashboard',
    'Orders': 'Order Management',
    'Customers': 'Customer Management',
    'Services': 'Service Management',
    'Reports': 'Reports & Analytics'
  }
  return titles[route.name] || 'Laundry Management System'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
