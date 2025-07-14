import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { mockOrders } from "../data/mockData.js";

export const useOrdersStore = defineStore("orders", () => {
  // Initialize with mock data
  const orders = ref([...mockOrders]);
  const loading = ref(false);
  const error = ref(null);

  const totalOrders = computed(() => orders.value.length);
  const pendingOrders = computed(
    () => orders.value.filter((order) => order.status === "pending").length
  );
  const completedOrders = computed(
    () => orders.value.filter((order) => order.status === "completed").length
  );

  const fetchOrders = async () => {
    loading.value = true;
    error.value = null;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // In demo mode, just return the mock data
      // orders.value = [...mockOrders] // Already initialized
      loading.value = false;
    } catch (err) {
      error.value = "Failed to fetch orders";
      loading.value = false;
    }
  };

  const addOrder = async (orderData) => {
    loading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const newOrder = {
        ...orderData,
        id: Date.now(), // Generate unique ID
        createdAt: new Date().toISOString(),
        status: "pending",
        totalPrice: orderData.weight * orderData.pricePerKg,
      };

      orders.value.unshift(newOrder); // Add to beginning of array
      loading.value = false;
      return { success: true, order: newOrder };
    } catch (err) {
      error.value = "Failed to add order";
      loading.value = false;
      return { success: false, message: "Failed to add order" };
    }
  };

  const updateOrder = async (id, updates) => {
    loading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const index = orders.value.findIndex((order) => order.id === id);
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...updates };
        loading.value = false;
        return { success: true, order: orders.value[index] };
      } else {
        throw new Error("Order not found");
      }
    } catch (err) {
      error.value = "Failed to update order";
      loading.value = false;
      return { success: false, message: "Failed to update order" };
    }
  };

  const deleteOrder = async (id) => {
    loading.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const index = orders.value.findIndex((order) => order.id === id);
      if (index !== -1) {
        orders.value.splice(index, 1);
        loading.value = false;
        return { success: true };
      } else {
        throw new Error("Order not found");
      }
    } catch (err) {
      error.value = "Failed to delete order";
      loading.value = false;
      return { success: false, message: "Failed to delete order" };
    }
  };

  return {
    orders,
    loading,
    error,
    totalOrders,
    pendingOrders,
    completedOrders,
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
  };
});
