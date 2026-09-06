import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import Contact from "./components/Contact";
import { Footer } from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PortfolioForm from "./components/PortFolioForm";
import UserPortfolio from "./components/UserPortfolio";
import { useAuth } from "./context/AuthContext";
import { demoPortfolio } from "./constants/demoPortfolio";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/fill-portfolio" && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner {...demoPortfolio} />
              <Skills
                skills={demoPortfolio.skills}
                descriptionskills={demoPortfolio.descriptionskills}
              />
              <Projects projects={demoPortfolio.projects} />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/fill-portfolio"
          element={
            isAuthenticated ? <PortfolioForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/portfolio"
          element={
            isAuthenticated ? <UserPortfolio /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;