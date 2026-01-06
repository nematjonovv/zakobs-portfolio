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
import { AccountProvide } from "./Context/AccountContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <BlogProvider>
        <RequestProvider>
          <ServiceProvider>
            <ContactProvider>
              <ProjectProvider>
                <ClientProvider>
                  <AccountProvide>
                    <TestimonialProvider>
                      <App />
                    </TestimonialProvider>
                  </AccountProvide>
                </ClientProvider>
              </ProjectProvider>
            </ContactProvider>
          </ServiceProvider>
        </RequestProvider>
      </BlogProvider>
    </AuthProvider>
  </BrowserRouter>
);
