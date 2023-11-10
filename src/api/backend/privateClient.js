import axios from "axios";
import queryString from "query-string";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  const user = window.localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  const token = parsedUser.token;
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  },
);

export default privateClient;
