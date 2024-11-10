import { useLocalStorage } from "@hooks/useLocalStorage";
import { describe, expect, it } from "vitest";

describe("useLocalStorage", () => {
  it("should set and get item from localStorage", () => {
    const { setItem, getItem } = useLocalStorage("test");
    setItem("random-value");
    expect(getItem()).toBe("random-value");
  });
  it("should remove item from localStorage and return undefined", () => {
    const { removeItem, getItem } = useLocalStorage("test");
    removeItem();
    expect(getItem()).toBe(undefined);
  });
});
