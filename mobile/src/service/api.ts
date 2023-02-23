import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => error
);
