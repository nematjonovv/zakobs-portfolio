import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteTestimonial,
  getTestimonial,
  postTestimonial,
  updateTestimonial,
} from "../api/testimonial.api";

const TestimonialContext = createContext(null);

export function TestimonialProvider({ children }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setErr(null);
    }, 3000);
  };
  const handleGet = async () => {
    try {
      setLoading(true);
      const res = await getTestimonial();
      setTestimonials(res.data);
    } catch (error) {
      setErr({ text: error.message, key: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const res = await postTestimonial(data);
      const testimonial = res?.data;
      await handleGet();
      setSuccess({ text: testimonial.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setErr({ text: error?.response?.data.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await deleteTestimonial(id);
      const deleted = res?.data;
      await handleGet();
      setSuccess({ text: deleted.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setErr({ text: error?.response?.data.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
      const res = updateTestimonial();
      const updated = res?.data;
      await handleGet();
      setSuccess({ text: updated.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setErr({ text: error.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <TestimonialContext.Provider
      value={{
        testimonials,
        handleCreate,
        handleDelete,
        handleUpdate,
        err,
        success,
        loading,
        setErr,
      }}
    >
      {children}
    </TestimonialContext.Provider>
  );
}

export const useTestimonial = () => useContext(TestimonialContext);
