import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";

const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Dashboard",
        component: { template: "<div>Dashboard</div>" },
      },
      {
        path: "/orders",
        name: "Orders",
        component: { template: "<div>Orders</div>" },
      },
      {
        path: "/customers",
        name: "Customers",
        component: { template: "<div>Customers</div>" },
      },
    ],
  });
};

describe("Sidebar Component Tests", () => {
  it("should render navigation links correctly", () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [createTestRouter(), createPinia()],
      },
    });

    // Check if main navigation elements exist
    expect(wrapper.find("h2").text()).toBe("Laundry App");

    // Check navigation links
    const navLinks = wrapper.findAll(".nav-link");
    expect(navLinks.length).toBeGreaterThan(0);

    // Check specific links
    const linkTexts = navLinks.map((link) => link.text());
    expect(linkTexts).toContain("Dashboard");
    expect(linkTexts).toContain("Orders");
    expect(linkTexts).toContain("Customers");
    expect(linkTexts).toContain("Services");
    expect(linkTexts).toContain("Reports");
  });

  it("should have correct router-link attributes", () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [createTestRouter(), createPinia()],
      },
    });

    const dashboardLink = wrapper.find('a[href="/"]');
    const ordersLink = wrapper.find('a[href="/orders"]');

    expect(dashboardLink.exists()).toBe(true);
    expect(ordersLink.exists()).toBe(true);
  });
});

describe("Header Component Tests", () => {
  it("should render header elements correctly", () => {
    const router = createTestRouter();
    router.push("/"); // Set current route

    const wrapper = mount(Header, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    // Check if header elements exist
    expect(wrapper.find("h1").exists()).toBe(true);
    expect(wrapper.find(".logout-btn").exists()).toBe(true);
  });

  it("should display correct page title based on route", async () => {
    const router = createTestRouter();
    await router.push("/");

    const wrapper = mount(Header, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    const pageTitle = wrapper.find("h1");
    expect(pageTitle.text()).toBe("Dashboard");
  });

  it("should have logout button with correct text", () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [createTestRouter(), createPinia()],
      },
    });

    const logoutBtn = wrapper.find(".logout-btn");
    expect(logoutBtn.text()).toBe("Logout");
  });
});
