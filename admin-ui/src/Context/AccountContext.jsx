import { createContext, useContext, useEffect, useState } from "react";
import { delteUser, getUser } from "../api/settings.api";

const AccountContext = createContext(null);

export function AccountProvide({ children }) {
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});

  const clearMessages = () => {
    setTimeout(() => {
      setSucces(null);
      setError(null);
    }, 3000);
  };

  const handleGet = async () => {
    try {
      const res = await getUser();
      setUsers(res?.data);
    } catch (error) {
      setError({ text: error?.response?.data.message, key: Date.now() });
      clearMessages();
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const deleted = await delteUser(id);
      setSucces({ text: deleted.message, key: Date.now() });
      handleGet()
      clearMessages();
    } catch (error) {
      setError({ text: error.response?.data?.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <AccountContext.Provider value={{ error, success, loading, users , handleDelete}}>
      {children}
    </AccountContext.Provider>
  );
}

export const useAccount = () => useContext(AccountContext);
