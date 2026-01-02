import api from "./interceptor.api";

export const getRequests = () => api.get("/api/requests");
export const deleteRequests = (id) => api.delete(`/api/requests/${id}`);
