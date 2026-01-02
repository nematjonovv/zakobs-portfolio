import api from "./interceptor.api";

export const getProjects = () => api.get("/api/projects");
export const postProject = (data) => api.post("/api/projects", data);
export const deleteProject   = (id) => api.delete(`/api/projects/${id}`);
