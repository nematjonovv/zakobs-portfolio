import api from "./interceptor.api";

export const getBlog = () => api.get("/api/blog");
export const getPost = (id) => api.get(`/api/blog/${id}`);
export const postBlog = (data) => api.post("/api/blog", data);
export const deleteBlog = (id) => api.delete(`/api/blog/${id}`);
export const updateBlog = ({ id, data }) => api.post(`/api/blog/${id}`, data);
