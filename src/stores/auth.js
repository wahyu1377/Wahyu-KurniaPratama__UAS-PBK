import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  const login = async (credentials) => {
    try {
      // Simple demo authentication - check credentials
      if (
        credentials.username === "admin" &&
        credentials.password === "admin123"
      ) {
        const userData = {
          id: 1,
          name: "Administrator",
          username: "admin",
          role: "admin",
        };

        user.value = userData;
        isAuthenticated.value = true;
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        return { success: false, message: "Invalid username or password" };
      }
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
  };

  const initAuth = () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        user.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      // Clear invalid data
      localStorage.removeItem("user");
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
});
