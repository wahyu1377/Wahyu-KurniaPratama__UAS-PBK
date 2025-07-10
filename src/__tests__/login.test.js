import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import Login from "../views/Login.vue";

// Create a simple router for testing
const createTestRouter = () => {
  return createRouter({
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
};

describe("Login Component Tests", () => {
  const createWrapper = () => {
    const router = createTestRouter();
    const pinia = createPinia();

    return mount(Login, {
      global: {
        plugins: [router, pinia],
      },
    });
  };

  it("should render login form elements", () => {
    const wrapper = createWrapper();

    // Check if main elements exist
    expect(wrapper.find("h2").text()).toBe("Laundry Management System");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("should display demo credentials section", () => {
    const wrapper = createWrapper();

    const demoSection = wrapper.find(".demo-credentials");
    expect(demoSection.exists()).toBe(true);

    const demoText = demoSection.text();
    expect(demoText).toContain("Demo Credentials");
    expect(demoText).toContain("Username: admin");
    expect(demoText).toContain("Password: admin123");
  });

  it("should update input values correctly", async () => {
    const wrapper = createWrapper();

    const usernameInput = wrapper.find("#username");
    const passwordInput = wrapper.find("#password");

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpass");

    expect(usernameInput.element.value).toBe("testuser");
    expect(passwordInput.element.value).toBe("testpass");
  });

  it("should show login button with correct text", () => {
    const wrapper = createWrapper();

    const loginButton = wrapper.find('button[type="submit"]');
    expect(loginButton.text()).toBe("Login");
    expect(loginButton.attributes("disabled")).toBeUndefined();
  });

  it("should handle form submission", async () => {
    const wrapper = createWrapper();

    // Fill in wrong credentials
    await wrapper.find("#username").setValue("wrong");
    await wrapper.find("#password").setValue("wrong");

    // Submit form
    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    // Should show error message
    const errorMessage = wrapper.find(".error-message");
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe("Invalid username or password");
  });
});
