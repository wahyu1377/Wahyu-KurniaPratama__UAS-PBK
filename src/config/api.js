// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  orders: `${API_BASE_URL}/orders`,
  customers: `${API_BASE_URL}/customers`,
  services: `${API_BASE_URL}/services`,
  users: `${API_BASE_URL}/users`,
};

export default API_BASE_URL;
