import { createContext, useContext, useEffect, useState } from "react";
import { deleteProject, getProjects, postProject } from "../api/portfolio.api";

const ProjectContext = createContext(null);
function ProjectProvider({ children }) {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setErr(null);
    }, 3000);
  };

  const get = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(res.data);
    } catch (error) {
      setErr({ text: error.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data) => {
    try {
      setLoading(true);
      const res = await postProject(data);
      const projects = await res.data;
      await get();
      setSuccess({ text: projects.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setErr({ text: error.response.data.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const deleted = await deleteProject(id);
      await get();
      setSuccess({ text: deleted?.data.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setErr({ text: error.response.data.message, key: Date.now() });
      clearMessages();
    }
  };
  useEffect(() => {
    get();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, err, loading, createProject, success, handleDelete }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
export default ProjectProvider;
