import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/interceptor.api";

const ServiceContext = createContext(undefined);

export function ServiceProvider({ children }) {
  const [allServices, setAllService] = useState([]);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [editId, setEditId] = useState(null);
  const updateService = (data) => {
    setAllService(() => data);
  };

  const [error, serError] = useState(null)

  const addService = (newService) => {
    setAllService((prev) => [...prev, newService]);
  };

  const resetService = () => {
    setAllService([]);
  };

  useEffect(() => {
    if (allServices.length >= 6) {
      setShowAddBtn(false);
    } else {
      setShowAddBtn(true);
    }
  }, [allServices]);

  // delete service
  const deleteService = async (id) => {
    try {
      const res = await api.delete(`/api/services/${id}`);
      setAllService((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      serError({ text: error.response.data.message, key: Date.now() });
    }
  };

  const editService = (updatedService) => {
    setAllService((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
  };
  return (
    <ServiceContext.Provider
      value={{
        allServices,
        updateService,
        resetService,
        addService,
        showAddBtn,
        deleteService,
        editId,
        setEditId,
        editService,
        error
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("useMyContext must be used within MyProvider");
  return context;
};
