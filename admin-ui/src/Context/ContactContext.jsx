import { createContext, useContext, useEffect, useState } from "react";
import { getContact, postContact, putContact } from "../api/contact.api";

const ContactContext = createContext(null);

export function ContactProvider({ children }) {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  

  const handleGet = async () => {
    try {
      setLoading(true);
      const res = await getContact();
      setContact(res.data || {});
      
    } catch (err) {
      setError({ text: err.message, key: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const res = await postContact(data);
      setSuccess({ text: res.data.message, key: Date.now() });
      await handleGet();
      clearMessages();
    } catch (err) {
      setError({
        text: err.response?.data?.message || err.message,
        key: Date.now(),
      });
      console.log(err);
      
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
      const res = await putContact({ id, data });
      setSuccess({ text: res.data.message, key: Date.now() });
      await handleGet();
      clearMessages();
      console.log(res);
      
    } catch (err) {
      setError({
        text: err.response?.data?.message || err.message,
        key: Date.now(),
      });      
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contact,
        handleCreate,
        handleUpdate,
        loading,
        success,
        error,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export const useContact = () => useContext(ContactContext);
