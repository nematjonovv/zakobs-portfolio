import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Dashboard/Overview";
import Portfolio from "./pages/Dashboard/Portfolio";
import Clients from "./pages/Dashboard/Clients";
import Services from "./pages/Dashboard/Services";
import Testimonials from "./pages/Dashboard/Testimonials";
import Blog from "./pages/Dashboard/Blog";
import Requests from "./pages/Dashboard/Requests";
import Contact from "./pages/Dashboard/Contact";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
        
          <Route index element={<Navigate to="overview" replace />} />

          <Route path="overview" element={<Overview />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="clients" element={<Clients />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blog" element={<Blog />} />
          <Route path="requests" element={<Requests />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
