import { isAuthenticated } from "@lib/isAuthenticated";
import { beforeEach, describe, expect, it } from "vitest";

describe("isAuthenticated", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it("should return true if localStorage contains a valid user", () => {
    // Set a valid user object in localStorage
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        displayName: "John Doe",
        email: "john.doe@example.com",
        createdAt: "01-01-2025",
        updatedAt: "01-01-2025",
      }),
    );

    // Check that the function returns true
    expect(isAuthenticated()).toBe(true);
  });

  it("should return false if localStorage contains 'null'", () => {
    // Set 'null' in localStorage
    window.localStorage.setItem("user", "null");

    // Check that the function returns false
    expect(isAuthenticated()).toBe(false);
  });

  it("should return false if localStorage is empty", () => {
    // No user set in localStorage
    expect(isAuthenticated()).toBe(false);
  });
});
