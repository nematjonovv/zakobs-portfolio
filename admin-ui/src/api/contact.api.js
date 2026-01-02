import api from "./interceptor.api";

export const getContact = () => api.get("/api/contact");
export const postContact = (data) => api.post("/api/contact", {data});
export const putContact = ({ id, data }) => api.put(`/api/contact/${id}`, {data});
