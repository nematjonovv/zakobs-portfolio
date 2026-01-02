import { useState } from "react";
import { createPortal } from "react-dom";
import { useClients } from "../../Context/ClientContext";

function ClientModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const colors = [
    { color: "#faedcd" },
    { color: "#d4a373" },
    { color: "#abc4ff" },
    { color: "#b6ccfe" },
    { color: "#ccd5ae" },
    { color: "#e9edc9" },
    { color: "#fefae0" },
    { color: "#9381ff" },
    { color: "#dda15e" },
    { color: "#2a9d8f" },
    { color: "#f77f00" },
    { color: "#d62828" },
    { color: "#2b2d42" },
    { color: "#8d99ae" },
    { color: "#edf2f4" },
    { color: "#84a59d" },
    { color: "#f5cac3" },
    { color: "#f6bd60" },
    { color: "#a3b18a" },
    { color: "#dad7cd" },
    { color: "#fec89a" },
    { color: "#f9dcc4" },
    { color: "#f8edeb" },
    { color: "#fcd5ce" },
    { color: "#ffb5a7" },
  ];
  const { handleCreate, loading, setErr } = useClients();
  const [selectedColor, setSelectedColor] = useState(null);
  const [preview, setPreview] = useState(null);
  const [clientObj, setClientObj] = useState({
    clientImage: null,
    clientName: "",
    bgcolor: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setClientObj((prev) => ({
      ...prev,
      clientImage: file,
    }));

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const removeImage = () => {
    setPreview(null);
    setClientObj((prev) => ({
      ...prev,
      clientImage: null,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("clientImage", clientObj.clientImage);
    data.append("clientName", clientObj.clientName);
    data.append("bgcolor", selectedColor);

    try {
      await handleCreate(data);
      setClientObj({ image: null });
      setPreview(null);
    } catch (error) {
      setErr(error.message);
    } finally {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/60 dark-glassmorphism"
        onClick={onClose}
      />

      <div className="absolute left-1/2 top-30 -translate-x-1/2 w-120 h-auto bg-white z-50 p-5 rounded-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add your client</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="bi bi-x text-3xl cursor-pointer"></i>
          </button>
        </div>

        <div className="flex items-center gap-5">
          {preview ? (
            <div className="relative group h-32 w-32 shrink-0">
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded object-cover transition-opacity group-hover:opacity-40"
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
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-500 w-32 h-32">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                name="projectImage"
              />

              <span className="text-sm whitespace-nowrap text-gray-600">
                Click to upload
              </span>
              <span className="mt-1 text-xs text-gray-400">
                PNG, JPG up to 5MB
              </span>
            </label>
          )}
          {/* color & name */}
          <div>
            <input
              type="text"
              placeholder="Type your client name"
              className="border py-1 px-2 rounded outline-none mb-1"
              onChange={(e) =>
                setClientObj((prev) => ({
                  ...prev,
                  clientName: e.target.value,
                }))
              }
              value={clientObj.clientName}
            />
            <div className="flex gap-2 flex-wrap items-center w-full h-24 overflow-y-scroll hidden-scroll p-1">
              {colors?.map((c, i) => {
                const isSelected = selectedColor === c.color;

                return (
                  <span
                    key={i}
                    onClick={() => setSelectedColor(c.color)}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-all
          ${isSelected ? "ring-2 ring-green-500 scale-110" : "hover:scale-105"}
        `}
                    style={{ backgroundColor: c.color }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`
    bg-[#8643DC] text-white 
    py-2 px-6 rounded-md mt-5 
    min-w-[100px]
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
    </div>,
    document.body
  );
}

export default ClientModal;
