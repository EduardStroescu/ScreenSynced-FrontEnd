import { useEffect, useState } from "react";

export const useLocalStorageSync = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get the initial value from localStorage or fallback to the provided initialValue
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.detail.key === key) {
        try {
          // Update the state when localStorage is updated
          const item = window.localStorage.getItem(key);
          setStoredValue(item ? JSON.parse(item) : initialValue);
        } catch (error) {
          setStoredValue(initialValue);
        }
      }
    };

    // Listen for changes in localStorage
    window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, [initialValue, key]);

  const setValue = (value) => {
    try {
      // Save the new value to localStorage
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      const event = new CustomEvent("localStorageChange", {
        detail: {
          key,
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      const event = new CustomEvent("localStorageChange", {
        detail: {
          key,
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue];
};
