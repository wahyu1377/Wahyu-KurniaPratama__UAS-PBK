<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>Laundry App</h2>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li>
          <router-link to="/" class="nav-link">
            <span class="icon">📊</span>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/orders" class="nav-link">
            <span class="icon">📋</span>
            Orders
          </router-link>
        </li>
        <li>
          <router-link to="/customers" class="nav-link">
            <span class="icon">👥</span>
            Customers
          </router-link>
        </li>
        <li>
          <router-link to="/services" class="nav-link">
            <span class="icon">🧺</span>
            Services
          </router-link>
        </li>
        <li>
          <router-link to="/reports" class="nav-link">
            <span class="icon">📈</span>
            Reports
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 0;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #34495e;
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
}
</style>
