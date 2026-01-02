import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteBlog,
  getBlog,
  getPost,
  postBlog,
  updateBlog,
} from "../api/blog.api";

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [blog, setBlog] = useState({});
  const [post, setPost] = useState({});
  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  const handleGet = async () => {
    try {
      setLoading(true);
      const res = await getBlog();
      setBlog(res.data);
    } catch (error) {
      setError({ text: error.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const res = await postBlog(data);
      const created = res.data;
      handleGet();
      console.log(created);
      setSuccess({ text: created.message, key: Date.now() });
      clearMessages();
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
      const res = await deleteBlog(id);
      const deleted = await res?.data;
      handleGet();
      setSuccess({ text: deleted.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setError({ text: error.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (id, data) => {
    try {
      setLoading(true);
      const res = await updateBlog({ id, data });
      const updated = await res.data;
      handleGet();
      setSuccess({ text: updated.message, key: Date.now() });
      clearMessages();
    } catch (error) {
      setError({ text: error.message, key: Date.now() });
      clearMessages();
    } finally {
      setLoading(false);
    }
  };

  const handleGetPost = async (id) => {
    try {
      const res = await getPost(id);
      const post = await res?.data;
      await setPost(post.data);
    } catch (error) {
      setError({ text: error.message, key: Date.now() });
    }
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <BlogContext.Provider
      value={{
        loading,
        error,
        success,
        blog,
        post,
        setError,
        handleCreate,
        handleDelete,
        handleUpdate,
        handleGetPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
