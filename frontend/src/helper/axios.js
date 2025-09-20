import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:3030/api",
  withCredentials: true,
});
