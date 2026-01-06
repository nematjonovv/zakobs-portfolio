import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [singleProject, setSingleProject] = useState("");
  const handleGet = async () => {
    try {
      const res = await api.get("/api/projects");
      setProjects(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, singleProject, setSingleProject, }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
