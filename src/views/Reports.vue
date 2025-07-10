<template>
  <div class="reports">
    <h2>Reports & Analytics</h2>

    <div class="report-filters">
      <div class="filter-group">
        <label>Date Range:</label>
        <select v-model="selectedPeriod" @change="generateReport">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      </div>
    </div>

    <div class="report-stats">
      <div class="stat-card">
        <h3>Total Revenue</h3>
        <p class="stat-number">Rp {{ formatPrice(reportData.totalRevenue) }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Orders</h3>
        <p class="stat-number">{{ reportData.totalOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Completed Orders</h3>
        <p class="stat-number">{{ reportData.completedOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Average Order Value</h3>
        <p class="stat-number">
          Rp {{ formatPrice(reportData.averageOrderValue) }}
        </p>
      </div>
    </div>

    <div class="report-charts">
      <div class="chart-container">
        <h3>Orders by Status</h3>
        <div v-if="filteredOrders.length > 0" class="simple-chart">
          <div
            v-for="status in ordersByStatus"
            :key="status.name"
            class="chart-bar"
          >
            <div class="bar-label">{{ status.name }}</div>
            <div
              class="bar"
              :style="{ width: status.percentage + '%', backgroundColor: getStatusColor(status.name.toLowerCase()) }"
            >
              <span class="bar-value">{{ status.count }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          <p>No orders found for the selected period</p>
        </div>
      </div>

      <div class="chart-container">
        <h3>Popular Services</h3>
        <div v-if="filteredOrders.length > 0" class="simple-chart">
          <div
            v-for="service in popularServices"
            :key="service.name"
            class="chart-bar"
          >
            <div class="bar-label">{{ service.name }}</div>
            <div
              class="bar"
              :style="{ width: service.percentage + '%', backgroundColor: getServiceColor(service.name) }"
            >
              <span class="bar-value">{{ service.count }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          <p>No services data for the selected period</p>
        </div>
      </div>
    </div>

    <div class="detailed-report">
      <h3>Detailed Report</h3>
      <div class="report-summary">
        <div class="summary-item">
          <strong>Period:</strong> {{ getPeriodLabel() }}
        </div>
        <div class="summary-item">
          <strong>Total Orders:</strong> {{ reportData.totalOrders }}
        </div>
        <div class="summary-item">
          <strong>Success Rate:</strong> {{ getSuccessRate() }}%
        </div>
        <div class="summary-item">
          <strong>Most Popular Service:</strong> {{ getMostPopularService() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const selectedPeriod = ref('month')
const orders = ref([])
const filteredOrders = ref([])
const reportData = ref({
  totalRevenue: 0,
  totalOrders: 0,
  completedOrders: 0,
  averageOrderValue: 0
})

const ordersByStatus = computed(() => {
  if (filteredOrders.value.length === 0) return []

  const statusCounts = {}
  filteredOrders.value.forEach(order => {
    statusCounts[order.status] = (statusCounts[order.status] || 0) + 1
  })

  const total = filteredOrders.value.length
  return Object.entries(statusCounts)
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count)
})

const popularServices = computed(() => {
  if (filteredOrders.value.length === 0) return []

  const serviceCounts = {}
  filteredOrders.value.forEach(order => {
    serviceCounts[order.service] = (serviceCounts[order.service] || 0) + 1
  })

  const total = filteredOrders.value.length
  return Object.entries(serviceCounts)
    .map(([service, count]) => ({
      name: service,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const fetchOrders = async () => {
  try {
    const response = await fetch('http://localhost:3001/orders')
    if (!response.ok) throw new Error('Failed to fetch orders')
    orders.value = await response.json()
    generateReport()
  } catch (err) {
    console.error('Failed to fetch orders:', err)
  }
}

const generateReport = () => {
  const now = new Date()
  let filtered = []

  // Filter orders based on selected period
  switch (selectedPeriod.value) {
    case 'today':
      filtered = orders.value.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.toDateString() === now.toDateString()
      })
      break
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filtered = orders.value.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= weekAgo
      })
      break
    case 'month':
      filtered = orders.value.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === now.getMonth() &&
               orderDate.getFullYear() === now.getFullYear()
      })
      break
    case 'year':
      filtered = orders.value.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getFullYear() === now.getFullYear()
      })
      break
    case 'all':
    default:
      filtered = [...orders.value]
      break
  }

  filteredOrders.value = filtered

  // Calculate report data based on filtered orders
  const totalRevenue = filtered.reduce((sum, order) => sum + (order.totalPrice || 0), 0)
  const completedOrders = filtered.filter(order => order.status === 'completed').length

  reportData.value = {
    totalRevenue,
    totalOrders: filtered.length,
    completedOrders,
    averageOrderValue: filtered.length > 0 ? Math.round(totalRevenue / filtered.length) : 0
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const getStatusColor = (status) => {
  const colors = {
    'pending': '#f39c12',
    'processing': '#3498db',
    'completed': '#27ae60',
    'delivered': '#9b59b6',
    'cancelled': '#e74c3c'
  }
  return colors[status] || '#95a5a6'
}

const getServiceColor = (service) => {
  const colors = {
    'Wash & Dry': '#3498db',
    'Dry Clean': '#e74c3c',
    'Iron Only': '#f39c12',
    'Express': '#27ae60',
    'Premium': '#9b59b6'
  }
  return colors[service] || '#95a5a6'
}

const getPeriodLabel = () => {
  const labels = {
    'today': 'Today',
    'week': 'This Week',
    'month': 'This Month',
    'year': 'This Year',
    'all': 'All Time'
  }
  return labels[selectedPeriod.value] || 'Selected Period'
}

const getSuccessRate = () => {
  if (reportData.value.totalOrders === 0) return 0
  return Math.round((reportData.value.completedOrders / reportData.value.totalOrders) * 100)
}

const getMostPopularService = () => {
  if (popularServices.value.length === 0) return 'No data'
  return popularServices.value[0].name
}

onMounted(async () => {
  await fetchOrders()
})
</script>

<style scoped>
.reports {
  padding: 20px;
}

.report-filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 500;
  color: #2c3e50;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.filter-group select:focus {
  outline: none;
  border-color: #3498db;
}

.report-stats {
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

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1rem;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
  color: #3498db;
  margin: 10px 0 0 0;
}

.report-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-container h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.simple-chart {
  margin-top: 15px;
}

.chart-bar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.bar-label {
  width: 120px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #2c3e50;
  flex-shrink: 0;
}

.bar {
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  margin-left: 10px;
  min-width: 60px;
  transition: all 0.3s ease;
  position: relative;
}

.bar:hover {
  opacity: 0.8;
  transform: scaleX(1.02);
}

.bar-value {
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
  font-style: italic;
}

.detailed-report {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.detailed-report h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.report-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.summary-item {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #3498db;
}

.summary-item strong {
  color: #2c3e50;
}

/* Responsive Design */
@media (max-width: 768px) {
  .report-charts {
    grid-template-columns: 1fr;
  }

  .chart-container {
    padding: 15px;
  }

  .bar-label {
    width: 80px;
    font-size: 0.8rem;
  }

  .report-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-number {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .report-stats {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .report-summary {
    grid-template-columns: 1fr;
  }
}
</style>
