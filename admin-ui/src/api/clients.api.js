import api from "./interceptor.api";

export const getClients = () => api.get("/api/clients");
export const createClient = (data) => api.post("/api/clients", data);
export const deleteClient = (id) => api.delete(`/api/clients/${id}`);
export const updateClient = ({ id, data }) => api.get(`/api/clients/${id}`, data);
