import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "./Context/ServicesContext.jsx";
import ProjectProvider from "./Context/PortfolioContext.jsx";
import { ClientProvider } from "./Context/ClientContext.jsx";
import { TestimonialProvider } from "./Context/TestimonialContext.jsx";
import { BlogProvider } from "./Context/BlogContext.jsx";
import { RequestProvider } from "./Context/RequestContext.jsx";
import { ContactProvider } from "./Context/ContactContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BlogProvider>
      <RequestProvider>
        <ServiceProvider>
          <ContactProvider>
            <ProjectProvider>
              <ClientProvider>
                <TestimonialProvider>
                  <App />
                </TestimonialProvider>
              </ClientProvider>
            </ProjectProvider>
          </ContactProvider>
        </ServiceProvider>
      </RequestProvider>
    </BlogProvider>
  </BrowserRouter>
);
