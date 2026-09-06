import apiClient from "../api/apiClient";

export const sendContactMessage = (userId, data) =>
  apiClient.post(`/contact/${userId}`, data).then((res) => res.data);
