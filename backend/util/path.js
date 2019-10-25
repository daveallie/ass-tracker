const frontendUrl = process.env.NODE_ENV === "production"
  ? "https://asstracker.tech"
  : "http://localhost:3000";

module.exports = {
  frontendUrl
};
