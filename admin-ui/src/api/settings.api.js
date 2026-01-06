import api from "./interceptor.api";

export const getUser = () => api.get("/api/users");
export const delteUser = ({ id, data }) => api.delete(`/api/users/${id}`);
