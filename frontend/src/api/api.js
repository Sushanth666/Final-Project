// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
// });

// // send token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;
// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://moviereviewapp-6tq7.onrender.com",
});

// attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

