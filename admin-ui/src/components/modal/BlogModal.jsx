import { useState } from "react";
import { createPortal } from "react-dom";
import { useBlog } from "../../Context/BlogContext";

function BlogModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { loading, handleCreate, setError } = useBlog();
  const [BlogObj, setBlogObj] = useState({
    blog_cover: null,
    title: "",
    subtitle: "",
    content: "",
  });
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBlogObj((prev) => ({
      ...prev,
      blog_cover: file,
    }));

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  const removeImage = () => {
    setPreview(null);
    setBlogObj((prev) => ({
      ...prev,
      blog_cover: null,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("blog_cover", BlogObj.blog_cover);
    data.append("title", BlogObj.title);
    data.append("subtitle", BlogObj.subtitle);
    data.append("content", BlogObj.content);

    try {
      await handleCreate(data);
      setBlogObj({ blog_cover: null });
      setPreview(null);
    } catch (error) {
      setError(error.message);
    } finally {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 dark-glassmorphism" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 h-auto pb-5 w-auto bg-white rounded-md">
        <div className="mb-4 flex items-center justify-between p-5">
          <h2 className="text-lg font-semibold">Add Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="bi bi-x text-3xl cursor-pointer"></i>
          </button>
        </div>

        <div className="px-5 min-h-120">
          <div className="flex gap-5 items-center mb-3">
            <label htmlFor="title" className="flex flex-col">
              Title
              <input
                className="w-90 border border-gray-400 py-2 px-3 rounded-md mt-2"
                id="title"
                type="text"
                placeholder="e.g Technology is evolving rapid...."
                onChange={(e) =>
                  setBlogObj((prev) => ({ ...prev, title: e.target.value }))
                }
                value={BlogObj.title}
              />
            </label>
            <label htmlFor="subtitle" className="flex flex-col">
              Subtitle
              <input
                className="w-90 border border-gray-400 py-2 px-3 rounded-md mt-2"
                id="subtitle"
                type="text"
                placeholder="e.g Technology Is Evolving Rapidly..."
                onChange={(e) =>
                  setBlogObj((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                value={BlogObj.subtitle}
              />
            </label>
          </div>
          <label htmlFor="content">
            Content
            <textarea
              placeholder="e.g. Technology is reshaping our world — new devices, smarter systems, and innovative applications are transforming how we live, work, and communicate. Artificial intelligence, virtual reality, and automation are no longer ideas of the future — they’re part of our daily lives. From wearable gadgets th"
              className="border border-gray-400 rounded-md w-full min-h-50 h-50 mt-2 py-2 px-3"
              onChange={(e) =>
                setBlogObj((prev) => ({ ...prev, content: e.target.value }))
              }
              value={BlogObj.content}
            />
          </label>
          <div>
            <p className="mb-3">Blog post cover</p>
            {preview ? (
              <div className="relative group h-32 shrink-0 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full p-2 object-contain rounded transition-opacity group-hover:opacity-40"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="
                      absolute 
                      inset-0 
                      flex 
                      items-center 
                      justify-center
                      opacity-0 
                      group-hover:opacity-100
                      transition
                      z-10
                    "
                >
                  <i className="bi bi-trash-fill bg-red-500 text-white px-2 py-1 cursor-pointer rounded text-lg"></i>
                </button>
              </div>
            ) : (
              <label
                htmlFor="avater"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-6 text-center transition hover:border-blue-500  h-32"
              >
                <input
                  id="avater"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  name="blog_cover"
                />

                <span className="text-sm whitespace-nowrap text-gray-600">
                  Click to upload
                </span>
                <span className="mt-1 text-xs text-gray-400">
                  PNG, JPG up to 5MB
                </span>
              </label>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`
    bg-[#8643DC] text-white 
    py-2 px-4 rounded-md mt-3
    min-w-[100px]
    w-full
    flex items-center 
    justify-center gap-2
    font-medium
    transition-all
    cursor-pointer
    z-50
    ${
      loading
        ? "opacity-80 cursor-wait"
        : "hover:bg-[#7a3bc7] active:bg-[#6b32b3] cursor-pointer"
    }
  `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BlogModal;
