import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );

        // Retry the original request
        return await privateClient(originalRequest);
      } catch (refreshError) {
        // The refresh token is invalid or expired
        // Removing the user from local storage will trigger a redirect to the login page
        window.localStorage.removeItem("user");
        const event = new CustomEvent("localStorageChange", {
          detail: {
            key: "user",
          },
        });
        window.dispatchEvent(event);
        toast.error(
          refreshError?.response?.data?.message || "Token refresh failed.",
        );
        return Promise.reject(
          refreshError?.response?.data?.message || "Token refresh failed.",
        );
      }
    }
    return Promise.reject(
      error?.response?.data?.message ||
        "Something went wrong. Please try again later!",
    );
  },
);

export default privateClient;
