import { useState } from "react";
import { Link } from "react-scroll";

function Header() {
  const [active, setActive] = useState(false);
  const navData = [
    {
      title: "about",
    },
    {
      title: "services",
    },
    {
      title: "portfolio",
    },
    {
      title: "blog",
    },
    {
      title: "contact",
    },
  ];
  const [navItem, setNavItem] = useState("about");

  const stateHandler = (title) => {
    setNavItem(title)
    setActive(false)
  }
  return (
    <header className="container-me flex items-center justify-between">
      <div className="flex items-center gap-25 py-5">
        <img src="/logo.png" alt="" />
        <nav className="flex gap-7 text-[18px] text-gray-500 nav-media">
          {navData?.map((e, i) => (
            <Link
              key={i}
              onClick={() => setNavItem(e.title)}
              to={e.title}
              className={`cursor-pointer capitalize ${
                navItem === e.title ? "text-[#21232D]" : "text-gray-500"
              }`}
            >
              {e.title}
            </Link>
          ))}
        </nav>
      </div>
      <button onClick={() => setActive(true)} className="bi bi-list px-3 py-2 bg-white rounded-full text-2xl cursor-pointer burger-menu-media"></button>

      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-gray-500 overflow-y-hidden burger-place-media z-30 ${
          active ? "activee" : ""
        }`}
      >
        <button onClick={()=> setActive(false)} className="bi bi-x text-white text-4xl p-3 cursor-pointer block"></button>

        <nav className="flex gap-7 text-[18px] text-gray-500 flex-col items-center">
          {navData?.map((e, i) => (
            <Link
              key={i}
              onClick={() => stateHandler(e.title)}
              to={e.title}
              className={`cursor-pointer capitalize ${
                navItem === e.title ? "text-[#21232D]" : "text-white"
              }`}
            >
              {e.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
