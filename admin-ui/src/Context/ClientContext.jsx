import { createContext, useContext, useEffect, useState } from "react";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../api/clients.api";

const ClientContext = createContext(null);

export function ClientProvider({ children }) {
  const [client, setClient] = useState({});
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
      const res = await getClients();
      setClient(res.data);
    } catch (error) {
      setErr({ text: error.message, key: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const res = await createClient(data);
      const client = await res?.data;
      await handleGet();
      setSuccess({ text: client?.message, key: Date.now() });
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
      const res = await deleteClient(id);
      const deleted = res?.data;
      await handleGet();
      setSuccess({
        text: deleted?.message || "Deleted",
        key: Date.now(),
      });
      clearMessages();
    } catch (error) {
      setErr({ text: error.response.data.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
      const res = await updateClient({ id, data });
      const updated = await res?.data;
      await handleGet();
      setSuccess({ text: updated.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setErr({ text: error.message, key: Date.now() });
      clearMessages();
    }
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <ClientContext.Provider
      value={{
        client,
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
    </ClientContext.Provider>
  );
}

export const useClients = () => useContext(ClientContext);
