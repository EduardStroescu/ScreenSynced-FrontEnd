// Function to check if the user is authenticated befor accessing account

export function isAuthenticated() {
  const authData = window.localStorage.getItem("user");
  if (authData && authData !== "null") {
    return true;
  }
  return false;
}
