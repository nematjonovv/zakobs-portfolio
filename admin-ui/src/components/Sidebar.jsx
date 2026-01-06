import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Sidebar() {
  const routeLinks = [
    { name: "Overview", path: "overview" },
    { name: "Services", path: "services" },
    { name: "Portfolio", path: "portfolio" },
    { name: "Clients", path: "clients" },
    { name: "Testimonials", path: "testimonials" },
    { name: "Blog", path: "blog" },
    { name: "Requests", path: "requests" },
    { name: "Contact", path: "contact" },
    { name: "Settings", path: "settings" },
  ];

  const { logout } = useAuth();

  return (
    <div className="glassmorphism min-h-screen h-full w-sm border-r border-[#c17aff] rounded-lg py-5 px-3 flex flex-col">
      <div className="flex items-center">
        <img src="/logo.png" alt="" />
        <h1 className="text-3xl ml-4 font-medium text-[#1E3050]">
          Zakob's Portfolio
        </h1>
      </div>
      <div className="ml-8 flex flex-col justify-between items-start flex-1">
        <div className="flex flex-col w-full text-[#1E3050]">
          {routeLinks?.map((e, i) => (
            <NavLink
              key={i}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-items active active:scale-99"
                  : "sidebar-items active:scale-99"
              }
              to={`/dashboard/${e.path}`}
            >
              {e.name}
            </NavLink>
          ))}
        </div>
        <button
          className="px-4 rounded-md py-2 mb-1 text-lg flex items-center text-[#1E3050] cursor-pointer"
          onClick={() => logout()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fb2c36"
            className="size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
