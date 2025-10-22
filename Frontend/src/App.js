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

const demoData = {
  name: "Hanzla Alvi",
  expertise: "UI/UX Designer & Web Developer",
  description:
    "Hi! I'm Hanzla, a passionate Web Developer, Web Designer, and UI/UX Designer with a keen eye for creating seamless user experiences. With a strong foundation in front-end and back-end development, I bring creative and functional designs to life. I thrive on solving complex problems and delivering high-quality solutions that make an impact.",
  descriptionskills:
    "Proficient in HTML, CSS, JavaScript, and React.js for building responsive user interfaces. Skilled in backend development using Python, Django, and Firebase. Experienced in UI/UX design using Figma and Adobe XD. Strong understanding of Git, GitHub, and collaborative workflows.",
  skills: [
    { skill: "Web Development", percentage: 95 },
    { skill: "Brand Identity", percentage: 80 },
    { skill: "Logo Design", percentage: 90 },
  ],
  projects: [
    { title: "Business Startup", description: "Design & Development" },
    { title: "Brand Website", description: "Branding, Web" },
    { title: "Logo Design", description: "Brand Identity" },
  ],
};

function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

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
              <Banner {...demoData} />
              <Skills
                skills={demoData.skills}
                descriptionskills={demoData.descriptionskills}
              />
              <Projects projects={demoData.projects} />
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