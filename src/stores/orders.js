import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref([]);
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
    try {
      const response = await fetch("http://localhost:3001/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      orders.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addOrder = async (orderData) => {
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: "pending",
        }),
      });

      if (!response.ok) throw new Error("Failed to add order");
      const newOrder = await response.json();
      orders.value.push(newOrder);
      return { success: true, order: newOrder };
    } catch (err) {
      error.value = err.message;
      return { success: false, message: err.message };
    }
  };

  const updateOrder = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update order");
      const updatedOrder = await response.json();
      const index = orders.value.findIndex((order) => order.id === id);
      if (index !== -1) {
        orders.value[index] = updatedOrder;
      }
      return { success: true, order: updatedOrder };
    } catch (err) {
      error.value = err.message;
      return { success: false, message: err.message };
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete order");
      orders.value = orders.value.filter((order) => order.id !== id);
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, message: err.message };
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
