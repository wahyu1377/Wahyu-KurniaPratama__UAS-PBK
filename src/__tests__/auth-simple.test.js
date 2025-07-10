import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "../stores/auth.js";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

describe("Auth Store Tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it("should initialize with correct default values", () => {
    const store = useAuthStore();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
  });

  it("should handle successful login", async () => {
    const store = useAuthStore();
    const credentials = {
      username: "admin",
      password: "admin123",
    };

    // Mock successful login (since we're using demo auth)
    const result = await store.login(credentials);

    expect(result.success).toBe(true);
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toBeTruthy();
    expect(store.user.username).toBe("admin");
  });

  it("should handle failed login", async () => {
    const store = useAuthStore();
    const credentials = {
      username: "wrong",
      password: "wrong",
    };

    const result = await store.login(credentials);

    expect(result.success).toBe(false);
    expect(result.message).toBeTruthy();
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBe(null);
  });

  it("should handle logout correctly", () => {
    const store = useAuthStore();

    // Set initial authenticated state
    store.user = { id: 1, username: "admin" };
    store.isAuthenticated = true;

    // Logout
    store.logout();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("user");
  });

  it("should initialize auth from localStorage", () => {
    const mockUser = { id: 1, username: "admin", name: "Administrator" };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    const store = useAuthStore();
    store.initAuth();

    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("user");
  });

  it("should handle invalid localStorage data", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const store = useAuthStore();
    store.initAuth();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
  });
});
