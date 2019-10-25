export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://asstracker.tech/api"
    : "http://localhost:3001";
