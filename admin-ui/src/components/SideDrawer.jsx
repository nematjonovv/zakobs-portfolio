import { useEffect, useState } from "react";
import api from "../api/interceptor.api";
import { useServiceContext } from "../Context/ServicesContext";
// import Loader from "../utils/Loader";
import SuccessMessage from "../utils/Messages/SuccessMessage";
import ErrorMessage from "../utils/Messages/ErrorMessage";
function SideDrawer({ isActive, onClose }) {
  const icons = [
    "bi bi-fire",
    "bi bi-star-fill",
    "bi bi-compass",
    "bi bi-briefcase",
    "bi bi-cpu",
    "bi bi-rocket-takeoff",
    "bi bi-trophy",
    "bi bi-key-fill",
    "bi bi-bar-chart-line-fill",
    "bi bi-lightbulb-fill",
    "bi bi-box-seam",
    "bi bi-chat-dots-fill",
    "bi bi-collection-play-fill",
    "bi bi-code-slash",
    "bi bi-palette-fill",
    "bi bi-wallet2",
    "bi bi-cloud-upload-fill",
    "bi bi-graph-up-arrow",
    "bi bi-layers-fill",
    "bi bi-magic",
    "bi bi-shield-lock",
    "bi bi-kanban-fill",
    "bi bi-ui-checks-grid",
    "bi bi-headset",
    "bi bi-life-preserver",
    "bi bi-terminal-fill",
    "bi bi-bookmark-star-fill",
    "bi bi-cast",
    "bi bi-radar",
    "bi bi-scissors",
    "bi bi-brush-fill",
    "bi bi-archive",
    "bi bi-boxes",
    "bi bi-bullseye",
    "bi bi-camera-reels",
    "bi bi-dpad",
    "bi bi-envelope-paper-heart",
    "bi bi-fingerprint",
    "bi bi-globe2",
    "bi bi-joystick",
  ];

  const API = import.meta.env.VITE_API_URL;
  const { addService, editId, setEditId, editService } = useServiceContext();

  const [formObj, setFormObj] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
    id: Number,
  });

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // icon select
  const handleIconSelect = (icon, index) => {
    setFormObj((prev) => ({
      ...prev,
      icon: icon,
    }));
  };

  // handle edit/create
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoad(true);

      if (editId) {
        const res = await api.put(`/api/services/${editId.id}`, {
          title: formObj.title,
          description: formObj.description,
          icon: formObj.icon,
        });
        editService(res.data.data);
        const msg = res?.data?.message || "Success";
        setMessage({
          text: msg,
          type: "success",
          id: Math.random(),
        });
      } else {
        const res = await api.post(`${API}/api/services`, {
          title: formObj.title,
          description: formObj.description,
          icon: formObj.icon,
        });

        const newService = res.data;

        addService(newService.data);
        setMessage({
          text: newService.message,
          type: "success",
          id: Math.random(),
        });
      }

      setEditId(null);
      onClose();
      setFormObj({
        title: "",
        description: "",
        icon: "",
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Request failed";
      setMessage({
        text: msg,
        type: "error",
        id: Math.random(),
      });
    } finally {
      setIsLoad(false);
    }
  };

  // edit id

  useEffect(() => {
    if (!editId) return;
    setFormObj({
      title: editId.title,
      description: editId.description,
      icon: editId.icon,
    });
  }, [editId]);

  // close & clear sidedrawer
  const closeSideDrawer = () => {
    setEditId(null);
    onClose();
    setFormObj({
      title: "",
      description: "",
      icon: "",
    });
  };
  return (
    <div
      className={`w-110 h-screen fixed text-white right-0 flex flex-col glassmorphism bg-[#ecefec] border-l rounded-lg border-gray-300  ${
        isActive ? "sideDrawOpen" : "sideDrawClose"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-6">
        <p className="text-xl font-medium">
          {editId ? "Update Serivce" : "Add Service"}
        </p>
        <i
          className="bi bi-x text-3xl cursor-pointer"
          onClick={() => closeSideDrawer()}
        ></i>
      </div>
      <div className="flex flex-col flex-1 justify-between px-4 py-6">
        <form
          id="serviceForm"
          onSubmit={handleSubmit}
          className="flex flex-col"
        >
          <label
            className="text-lg font-medium mb-2 mt-2"
            htmlFor="serviceTitle"
          >
            Service Title
          </label>
          <input
            className="mb-3 border text-black border-gray-300 bg-[#ecefec] px-3 py-2 rounded-lg outline-none focus:border-[#c27aff] focus:ring ring-[#c27aff]"
            type="text"
            placeholder="e.g Brand Design"
            onChange={handleChange}
            value={formObj.title}
            name="title"
          />
          <label
            className="text-lg font-medium mb-2 mt-2"
            htmlFor="serviceBrand"
          >
            Short Description
          </label>
          <textarea
            rows="3"
            placeholder="e.g Designing your brand identity from scratch..."
            className="text-area-scroll text-black w-full px-4 py-3 rounded-xl border border-gray-300 
     focus:outline-none focus:ring-2 focus:ring-purple-500 
     focus:border-transparent transition-all duration-200
     resize-none placeholder-gray-40 backdrop-blur-sm bg-[#ecefec]"
            onChange={handleChange}
            value={formObj.description}
            name="description"
          />
          <label
            className="text-lg font-medium mb-2 mt-2"
            htmlFor="serviceTitle"
          >
            Icon
          </label>
          <div className="flex gap-4 flex-wrap justify-between h-33 overflow-y-scroll drawerScrollbar">
            {icons?.map((icon, i) => (
              <i
                className={` ${icon} bg-[#e2e4e4] px-4 py-3 text-2xl rounded-md text-[#6a6e6ec6] cursor-pointer hover:text-[#C27AFF]`}
                key={i}
                onClick={() => handleIconSelect(icon, i)}
              ></i>
            ))}
          </div>
        </form>

        {/* live preview */}

        <div>
          <h3 className="text-lg font-medium mt-3">Preview</h3>
          <div className="flex gap-7.5 mt-3 services-media">
            <div>
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <img className="h-10 w-10" src={"/images/bg.png"} alt="" />
                  <i
                    className={`${formObj.icon} text-white text-lg absolute top-2 left-1/2 -translate-x-1/2`}
                  ></i>
                </div>
                <h3 className="text-[#25202F] text-2xl font-medium">
                  {formObj.title}
                </h3>
              </div>
              <p className="leading-5 text-[#47444E] font-normal text-[14px] text-left mt-2">
                {formObj.description}
              </p>
            </div>
          </div>
        </div>

        <button
          form="serviceForm"
          type="submit"
          className="mt-auto bg-[#8643DC] active:scale-95 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          {!isLoad ? (
            editId ? (
              "Update"
            ) : (
              "Add"
            )
          ) : (
            <div className="h-full w-full left-0 flex  justify-center items-center bg-transparent ">
              <div className="relative">
                <div className="rounded-full h-7 w-7 border-3 border-transparent border-t-blue-600 border-r-purple-600 animate-spin"></div>
              </div>
            </div>
          )}
        </button>
      </div>
      {message.type === "success" && (
        <SuccessMessage successMessage={message} />
      )}

      {message.type === "error" && <ErrorMessage errMessage={message} />}
    </div>
  );
}

export default SideDrawer;
