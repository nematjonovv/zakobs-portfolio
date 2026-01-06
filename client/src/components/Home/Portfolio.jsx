import { useState } from "react";
import Title from "../../utils/Title";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import Header3 from "../../utils/Header3";
import { useProjects } from "../../Context/ProjectContext";
import ProjectModal from "../ProjectModal";

function Portfolio() {
  const { projects, setSingleProject, } = useProjects();
  const [openModal, setOpenModal] = useState(false);
  const gridLayout = [
    "col-span-2 row-span-5 col-start-3 row-start-1", 
    "row-span-3 col-start-5 row-start-1", 
    "row-span-2 col-start-5 row-start-4", 
    "col-span-2 row-span-3 col-start-1 row-start-1", 
    "row-span-2 col-start-1 row-start-4", 
    "row-span-2 col-start-2 row-start-4", 
  ];

  const layoutOrder = [3, 0, 5, 1, 4, 2];

  const openImage = (image) => {
    setOpenModal(true);
    setSingleProject(image)
  };

  return (
    <Element name="portfolio">
      <div className="bg-[#F4F3F9]">
        <div className="container-me py-[50px]">
          <Title title={"Portfolio"} />
          <div className="flex justify-between items-center mb-6">
            <Header3 header3={"All Creative Projects"} width={250} />
            <Link
              to={"/portfolio"}
              className="text-2xl font-medium text-[#25202F] underline portfolio-link-media flex items-center"
            >
              Explore More
              <i className="bi bi-arrow-right ml-2.5"></i>
            </Link>
          </div>

          <div className="grid grid-cols-5 grid-rows-5 gap-3 auto-rows-[150px]">
            {projects?.slice(0, 6).map((project, index) => (
              <div
                key={project.id || index}
                className={`bg-gray-300 ${
                  gridLayout[layoutOrder[index]]
                } overflow-hidden rounded-xl`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openImage(project.image)}
                />
              </div>
            ))}
          </div>
        </div>
        <ProjectModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </Element>
  );
}

export default Portfolio;
