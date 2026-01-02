import { createContext, useContext, useEffect, useState } from "react";
import { deleteRequests, getRequests } from "../api/request.api";

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState({});

  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  const handleGet = async () => {
    try {
      setLoading(true);
      const res = await getRequests();
      setRequests(res.data);
    } catch (error) {
      setError({ text: error.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await deleteRequests(id);
      const deleted = await res?.data;
      handleGet();

      setSuccess({ text: deleted.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setError({ text: error.message, key: Date.now() });
      console.log(error);

      clearMessages();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    handleGet();
  }, []);

  return (
    <RequestContext.Provider
      value={{ success, error, loading, requests, handleGet, handleDelete }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export const useRequests = () => useContext(RequestContext);
