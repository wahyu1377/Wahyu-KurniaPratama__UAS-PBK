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

// Mock console to avoid noise
const consoleMock = {
  error: vi.fn(),
  log: vi.fn(),
  warn: vi.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(global, "console", {
  value: consoleMock,
  writable: true,
});

describe("Auth Store Tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    // Reset all mocks
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    consoleMock.error.mockClear();
  });

  it("should initialize with correct default values", () => {
    const store = useAuthStore();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
  });

  it("should handle successful login with correct credentials", async () => {
    const store = useAuthStore();
    const credentials = {
      username: "admin",
      password: "admin123",
    };

    const result = await store.login(credentials);

    expect(result.success).toBe(true);
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toBeTruthy();
    expect(store.user.username).toBe("admin");
    expect(store.user.name).toBe("Administrator");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(store.user)
    );
  });

  it("should handle failed login with wrong credentials", async () => {
    const store = useAuthStore();
    const credentials = {
      username: "wrong",
      password: "wrong",
    };

    const result = await store.login(credentials);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBe(null);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it("should handle logout correctly", () => {
    const store = useAuthStore();

    // Set initial authenticated state
    store.user = { id: 1, username: "admin", name: "Administrator" };
    store.isAuthenticated = true;

    // Logout
    store.logout();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("user");
  });

  it("should initialize auth from valid localStorage data", () => {
    const mockUser = {
      id: 1,
      username: "admin",
      name: "Administrator",
      role: "admin",
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    const store = useAuthStore();
    store.initAuth();

    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("user");
  });

  it("should handle null localStorage data", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const store = useAuthStore();
    store.initAuth();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
  });

  it("should handle invalid JSON in localStorage", () => {
    localStorageMock.getItem.mockReturnValue("invalid-json");

    const store = useAuthStore();
    store.initAuth();

    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("user");
    expect(consoleMock.error).toHaveBeenCalled();
  });

  it("should handle empty string credentials", async () => {
    const store = useAuthStore();
    const credentials = {
      username: "",
      password: "",
    };

    const result = await store.login(credentials);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
  });

  it("should handle missing credentials", async () => {
    const store = useAuthStore();
    const credentials = {};

    const result = await store.login(credentials);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
  });
});
