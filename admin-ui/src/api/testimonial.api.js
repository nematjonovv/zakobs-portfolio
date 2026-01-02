import api from "./interceptor.api";

export const getTestimonial = () => api.get("/api/testimonials")
export const postTestimonial = (data) => api.post("/api/testimonials", data)
export const deleteTestimonial = (id) => api.delete(`/api/testimonials/${id}`)
export const updateTestimonial = ({id, data}) => api.put(`/api/testimonials/${id}`, data)
