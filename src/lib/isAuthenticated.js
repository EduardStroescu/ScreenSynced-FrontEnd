// Function to check if the user is authenticated befor accessing account

import { userSchema } from "./types";

export function isAuthenticated() {
  try {
    const authData = JSON.parse(window.localStorage.getItem("user"));
    const user = userSchema.parse(authData);
    if (user) {
      return true;
    }
  } catch (_) {
    /* empty */
  }
  window.localStorage.removeItem("user");
  const event = new CustomEvent("localStorageChange", {
    detail: {
      key: "user",
    },
  });
  window.dispatchEvent(event);
  return false;
}
