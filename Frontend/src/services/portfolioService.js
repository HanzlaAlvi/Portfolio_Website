import apiClient from "../api/apiClient";

export const getMyPortfolio = () =>
  apiClient.get("/portfolio/me").then((res) => res.data);

export const savePortfolio = (data) =>
  apiClient.post("/portfolio", data).then((res) => res.data);
