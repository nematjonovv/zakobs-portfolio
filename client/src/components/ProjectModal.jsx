import { createPortal } from "react-dom";
import { useProjects } from "../Context/ProjectContext";

function ProjectModal({ isOpen, onClose }) {
  const { singleProject } = useProjects();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full items-center justify-center p-6">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white">
          <img
            src={singleProject}
            alt=""
            className="w-full max-h-[80vh] object-contain"
          />

          <button
            onClick={onClose}
            className="bi bi-x bg-[#1E212E] text-white absolute top-0 right-0 py-1 px-2 m-4 rounded-md text-2xl cursor-pointer"
          ></button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProjectModal;
