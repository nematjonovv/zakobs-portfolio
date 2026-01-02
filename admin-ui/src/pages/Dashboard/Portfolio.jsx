import { useState } from "react";
import Modal from "../../components/modal/CreateModal";
import { useProjects } from "../../Context/PortfolioContext";
import SuccessMessage from "../../utils/Messages/SuccessMessage";
import ErrorMessage from "../../utils/Messages/ErrorMessage";

function Portfolio() {
  const [open, setOpen] = useState(false);
  const { projects, err, success, handleDelete } = useProjects();

  return (
    <div className="p-5 h-screen">
      <div className="w-full h-full">
        <h3 className="text-3xl font-medium text-[#272930]">Portfolio</h3>
        <div className="p-5 flex flex-wrap">
          <div className="p-6 flex gap-5 flex-wrap">
            {projects.data?.map((e, i) => (
              <div
                key={i}
                className="relative h-40 w-40 min-w-40 cursor-pointer overflow-hidden rounded-2xl group"
              >
                <img
                  src={e.image}
                  alt=""
                  className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                  loading="lazy"
                />

                <button
                  onClick={() => handleDelete(e.id)}
                  className="absolute top-2 right-2 hidden text-white text-xl group-hover:block cursor-pointer hover:text-red-500"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            ))}
            {/* add project button */}
            <div
              onClick={() => setOpen(true)}
              className="glassmorphism h-40 w-40 flex flex-col justify-center items-center cursor-pointer"
            >
              <i className="bi bi-plus text-3xl text-[#0000008a]"></i>
            </div>

            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              title="Add Project"
            />
          </div>
        </div>
      </div>
      <SuccessMessage successMessage={success} />
      <ErrorMessage errMessage={err} />
    </div>
  );
}

export default Portfolio;
