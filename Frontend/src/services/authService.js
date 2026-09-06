import apiClient from "../api/apiClient";

export const signup = (formData) =>
  apiClient.post("/auth/signup", formData).then((res) => res.data);

export const login = (formData) =>
  apiClient.post("/auth/login", formData).then((res) => res.data);
