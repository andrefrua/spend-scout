// TODO: This will have to be somewhere else when in Real World
const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://192.168.2.233:4001"
    : "http://localhost:4000";

export { API_URL };
