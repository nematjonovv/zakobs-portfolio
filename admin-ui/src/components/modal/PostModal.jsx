import { createPortal } from "react-dom";
import { useBlog } from "../../Context/BlogContext";

function PostModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { post } = useBlog();

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 dark-glassmorphism" />

      <div className="absolute left-1/2 -translate-x-1/2 top-5 bottom-5 min-w-110 overflow-y-auto w-auto bg-white rounded-md hidden-scroll">
        <div className="sticky bg-white top-0 mb-4 flex items-center justify-between p-5">
          <h2 className="text-lg font-semibold mr-5">20 June / 2025</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="right-5 top-4 bi bi-x text-3xl cursor-pointer"></i>
          </button>
        </div>

        {/* post */}
        <div className="p-5">
          <img src={post.coverImage} alt="" />
          <h3 className="text-xl font-semibold my-3">{post.title}</h3>
          <h5 className="text-sm font-medium mb-1">{post.subtitle}</h5>
          <p className="text-sm leading-7">{post.content}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PostModal;
