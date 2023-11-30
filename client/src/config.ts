// TODO: This will have to be somewhere else when in Real World
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://spend-scout-server-cf62258d6b6f.herokuapp.com"
    : "http://localhost:4000";

export { API_URL };
