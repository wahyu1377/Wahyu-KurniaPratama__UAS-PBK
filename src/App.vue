<template>
  <div id="app">
    <div v-if="!isLoginPage" class="app-layout">
      <Sidebar />
      <div class="main-content">
        <Header />
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
    <div v-else class="login-layout">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const route = useRoute()
const authStore = useAuthStore()

const isLoginPage = computed(() => route.name === 'Login')

// Ensure all hooks are called at the top level
onMounted(() => {
  authStore.initAuth()
})
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.login-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
