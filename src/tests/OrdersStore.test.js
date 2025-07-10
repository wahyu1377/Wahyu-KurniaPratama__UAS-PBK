import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useOrdersStore } from "../stores/orders.js";

// Mock fetch
global.fetch = vi.fn();

describe("Orders Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should initialize with empty orders", () => {
    const store = useOrdersStore();
    expect(store.orders).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it("should calculate total orders correctly", () => {
    const store = useOrdersStore();
    store.orders = [
      { id: 1, status: "pending" },
      { id: 2, status: "completed" },
      { id: 3, status: "pending" },
    ];

    expect(store.totalOrders).toBe(3);
  });

  it("should calculate pending orders correctly", () => {
    const store = useOrdersStore();
    store.orders = [
      { id: 1, status: "pending" },
      { id: 2, status: "completed" },
      { id: 3, status: "pending" },
    ];

    expect(store.pendingOrders).toBe(2);
  });

  it("should calculate completed orders correctly", () => {
    const store = useOrdersStore();
    store.orders = [
      { id: 1, status: "pending" },
      { id: 2, status: "completed" },
      { id: 3, status: "completed" },
    ];

    expect(store.completedOrders).toBe(2);
  });

  it("should fetch orders successfully", async () => {
    const mockOrders = [
      { id: 1, customerName: "John Doe", status: "pending" },
      { id: 2, customerName: "Jane Smith", status: "completed" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockOrders),
    });

    const store = useOrdersStore();
    await store.fetchOrders();

    expect(store.orders).toEqual(mockOrders);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it("should handle fetch orders error", async () => {
    const errorMessage = "Network error";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    const store = useOrdersStore();
    await store.fetchOrders();

    expect(store.orders).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(errorMessage);
  });

  it("should add order successfully", async () => {
    const newOrderData = {
      customerName: "John Doe",
      service: "Wash & Dry",
      weight: 2.5,
    };

    const mockResponse = {
      ...newOrderData,
      id: 123,
      createdAt: "2024-01-01T00:00:00.000Z",
      status: "pending",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const store = useOrdersStore();
    const result = await store.addOrder(newOrderData);

    expect(result.success).toBe(true);
    expect(result.order).toEqual(mockResponse);
    expect(store.orders).toContain(mockResponse);
  });

  it("should handle add order error", async () => {
    const errorMessage = "Failed to add order";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    const store = useOrdersStore();
    const result = await store.addOrder({});

    expect(result.success).toBe(false);
    expect(result.message).toBe(errorMessage);
    expect(store.error).toBe(errorMessage);
  });
});
