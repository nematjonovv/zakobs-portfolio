import { useEffect, useState } from "react";
import api from "../api/interceptor.api";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SuccessMessage from "../utils/Messages/SuccessMessage";
function Dashboard() {
  const [data, setData] = useState("");
  const [message, setMessage] = useState({ text: "" });

  useEffect(() => {
    api
      .get(`/auth/me`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);



  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-h-screen h-screen overflow-x-hidden overflow-scroll scrollbar bg-purple-400">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
