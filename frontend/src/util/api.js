import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://asstracker.tech/api"
    : "http://localhost:3001";

export const login = () => axios.post(`${API_URL}/auth/login`);

export const logout = () => axios.post(`${API_URL}/auth/logout`);

export const getAssets = () => axios.get(`${API_URL}/assets`).then(response => response.data);
