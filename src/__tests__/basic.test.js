import { describe, it, expect } from "vitest";

describe("Basic Test Suite", () => {
  it("should perform basic arithmetic", () => {
    expect(2 + 2).toBe(4);
    expect(5 - 3).toBe(2);
    expect(3 * 4).toBe(12);
  });

  it("should handle string operations", () => {
    const str = "Hello World";
    expect(str).toContain("World");
    expect(str.length).toBe(11);
  });

  it("should work with arrays", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr[0]).toBe(1);
    expect(arr).toContain(3);
  });

  it("should work with objects", () => {
    const obj = {
      name: "Laundry App",
      version: "1.0.0",
      active: true,
    };

    expect(obj).toHaveProperty("name");
    expect(obj.name).toBe("Laundry App");
    expect(obj.active).toBe(true);
  });
});
