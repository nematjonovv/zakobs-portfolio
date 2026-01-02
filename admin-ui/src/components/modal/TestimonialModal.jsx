import { createPortal } from "react-dom";
import { useTestimonial } from "../../Context/TestimonialContext";
import { useState } from "react";

function TestimonialModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [testimonialObj, setTestimonialObj] = useState({
    testimonial_avatar: null,
    author: "",
    role: "",
    opinion: "",
  });

  const { loading, err, success, handleCreate } = useTestimonial();
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setTestimonialObj((prev) => ({
      ...prev,
      testimonial_avatar: file,
    }));

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  const removeImage = () => {
    setPreview(null);
    setTestimonialObj((prev) => ({
      ...prev,
      testimonial_avatar: null,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("testimonial_avatar", testimonialObj.testimonial_avatar);
    data.append("author", testimonialObj.author);
    data.append("opinion", testimonialObj.opinion);
    data.append("role", testimonialObj.role);
    try {
      await handleCreate(data);
      setTestimonialObj({ testimonial_avatar: null });
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-100 w-140 bg-white rounded-md">
        <div className="mb-4 flex items-center justify-between pt-5 px-5">
          <h2 className="text-lg font-semibold">Add testimonial</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="bi bi-x text-3xl cursor-pointer"></i>
          </button>
        </div>
        <div className="flex flex-col px-5 pb-5">
          <label htmlFor="author" className="flex flex-col my-2">
            Name of the person giving the testimonial
            <input
              id="author"
              type="text"
              placeholder="e.g John Doe"
              className="border rounded px-2 py-1 my-2 border-gray-400"
              onChange={(e) =>
                setTestimonialObj((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              value={testimonialObj.author}
            />
          </label>

          <label htmlFor="role" className="flex flex-col my-2">
            Author's position or role
            <input
              id="role"
              type="text"
              placeholder="e.g Front-end developer"
              className="border rounded px-2 py-1 my-2 border-gray-400"
              onChange={(e) =>
                setTestimonialObj((prev) => ({ ...prev, role: e.target.value }))
              }
              value={testimonialObj.role}
            />
          </label>

          <label htmlFor="opinion" className="flex flex-col my-2">
            Testimonial content
            <textarea
              id="opinion"
              className="border rounded px-2 py-1 my-2 h-50 border-gray-400"
              type="text"
              placeholder="e.g The service was excellent..."
              onChange={(e) =>
                setTestimonialObj((prev) => ({
                  ...prev,
                  opinion: e.target.value,
                }))
              }
              value={testimonialObj.opinion}
            />
          </label>
          <div>
            <p>Testimonial author image</p>
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
                  name="testimonial_avatar"
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
    py-2 px-4 rounded-md mt-1
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
      </div>
    </div>,
    document.body
  );
}

export default TestimonialModal;
