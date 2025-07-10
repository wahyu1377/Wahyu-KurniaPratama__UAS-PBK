import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import Login from "../views/Login.vue";

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: { template: "<div>Dashboard</div>" },
    },
    { path: "/login", name: "Login", component: Login },
  ],
});

describe("Login Component", () => {
  const createWrapper = () => {
    return mount(Login, {
      global: {
        plugins: [router, createPinia()],
      },
    });
  };

  it("should render login form correctly", () => {
    const wrapper = createWrapper();

    expect(wrapper.find("h2").text()).toBe("Laundry Management System");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("should show demo credentials", () => {
    const wrapper = createWrapper();

    const demoSection = wrapper.find(".demo-credentials");
    expect(demoSection.exists()).toBe(true);
    expect(demoSection.text()).toContain("Username: admin");
    expect(demoSection.text()).toContain("Password: admin123");
  });

  it("should update input values when typing", async () => {
    const wrapper = createWrapper();

    const usernameInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpass");

    expect(usernameInput.element.value).toBe("testuser");
    expect(passwordInput.element.value).toBe("testpass");
  });

  it("should show error message for invalid credentials", async () => {
    const wrapper = createWrapper();

    await wrapper.find('input[type="text"]').setValue("wrong");
    await wrapper.find('input[type="password"]').setValue("wrong");

    // Trigger form submission
    await wrapper.find("form").trigger("submit.prevent");

    // Wait for next tick to allow reactive updates
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error-message").exists()).toBe(true);
    expect(wrapper.find(".error-message").text()).toBe(
      "Invalid username or password"
    );
  });

  it("should handle successful login", async () => {
    const mockPush = vi.fn();
    router.push = mockPush;

    const wrapper = createWrapper();

    await wrapper.find('input[type="text"]').setValue("admin");
    await wrapper.find('input[type="password"]').setValue("admin123");

    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    // Should not show error message for valid credentials
    expect(wrapper.find(".error-message").exists()).toBe(false);
  });
});
