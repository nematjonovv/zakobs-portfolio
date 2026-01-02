import { useState } from "react";
import { createPortal } from "react-dom";
import { useProjects } from "../../Context/PortfolioContext";
import SuccessMessage from "../../utils/Messages/SuccessMessage";
import ErrorMessage from "../../utils/Messages/ErrorMessage";

function Modal({ isOpen, onClose, title = "Modal title" }) {
  if (!isOpen) return null;
  const { err, success, loading, createProject } = useProjects();
  const [projectObj, setProjectObj] = useState({
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectObj({ image: file });

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("projectImage", projectObj.image);
    try {
      await createProject(data);
      setProjectObj({ image: null });
      setPreview(null);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 dark-glassmorphism" onClick={onClose} />
      <div className="relative z-10 -top-30 w-full max-w-md h-auto rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="bi bi-x text-3xl cursor-pointer"></i>
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-500 w-64">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              name="projectImage"
            />

            <span className="text-sm text-gray-600">Click to upload</span>
            <span className="mt-1 text-xs text-gray-400">
              PNG, JPG up to 5MB
            </span>
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 h-32 w-32 rounded-md object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`
    bg-[#8643DC] text-white 
    py-2 px-6 rounded-md mt-5 
    min-w-[100px]
    flex items-center justify-center gap-2
    font-medium
    transition-all
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
    </div>,
    document.body
  );
}

export default Modal;
