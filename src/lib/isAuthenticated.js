export function isAuthenticated() {
  const authData = window.localStorage.getItem("user");
  if (authData && authData !== "null") {
    return true;
  }
  return false;
}
