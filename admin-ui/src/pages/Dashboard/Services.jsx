import { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import axios from "axios";
import { useServiceContext } from "../../Context/ServicesContext";
import ErrorMessage from "../../utils/Messages/ErrorMessage";
function Services() {
  const [active, setActive] = useState(false);
  const API = import.meta.env.VITE_API_URL;
  const { allServices, updateService, showAddBtn, deleteService, setEditId,error } =
    useServiceContext();
  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get(`${API}/api/services`);
        updateService(response.data.data);
      } catch (error) {
        console.error("Xato:", error);
      }
    };
    getServices();
  }, []);

  const handleEditService = (service) => {
    setEditId(service);
    if (service) {
      setActive(true);
    }
  };

  return (
    <div className="flex min-h-screen h-screen w-full">
      <div className="h-full flex-1">
        <h2 className="text-3xl pl-5 pt-5 font-medium text-[#272930]">
          Services
        </h2>
        <div className="flex justify-center pt-20 pl-20 pb-20 flex-wrap gap-5">
          {allServices?.map((service, index) => (
            <div
              className="group relative px-5 py-7 glassmorphism border-[#0000004f] rounded-xl w-102 h-61 flex flex-col"
              key={service.id}
            >
              <div className="flex items-center gap-5">
                <i
                  className={`${service.icon} text-2xl text-white w-12 h-12 icon_bg flex justify-center items-center`}
                ></i>
                <h2>{service.title}</h2>
              </div>
              <p className="leading-8 text-[#47444E] font-normal text-[14px] text-left">
                {service.description}
              </p>
              {/* edit & delete hover */}
              <div className="absolute left-0 top-0 w-full h-full bg-transparent hover:bg-[#ffffff1c] rounded-xl flex items-baseline justify-end gap-3 pr-3 opacity-0 group-hover:opacity-100 transition">
                <i
                  onClick={() => handleEditService(service)}
                  className="bi bi-pencil-square py-2 px-3 bg-[#8643DC] rounded-xl text-white text-xl mt-3 cursor-pointer hover:bg-[#DB14F6]"
                ></i>

                <i
                  onClick={() => deleteService(service.id)}
                  className="bi bi-trash3 py-2 px-3 bg-[#8643DC] rounded-xl text-white text-xl mt-3 cursor-pointer hover:bg-[#FF0E9C]"
                ></i>
              </div>
            </div>
          ))}
          {/* add btn */}
          <div
            onClick={() => setActive(true)}
            className={`relative glassmorphism cursor-pointer rounded-xl w-102 h-61 ${
              showAddBtn ? "flex" : "hidden"
            } flex-col justify-center items-center`}
          >
            <div className="absolute left-0 top-0 w-full h-full hover:bg-[#ffffff1c] hover:opacity-100 transition"></div>
            <i className="bi bi-plus text-5xl text-[#0000008a]"></i>
            <p className="text-lg text-[#00000086] font-medium">Add service</p>
          </div>
        </div>
      </div>

      {/* service right bar */}
      <SideDrawer isActive={active} onClose={() => setActive(false)} />
      <ErrorMessage errMessage={error} />
    </div>
  );
}

export default Services;
