import React, { useEffect, useState } from "react";
import axios from "axios";
import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import Contact from "./Contact";
import { Footer } from "./Footer";

const fallback = {
  name: "Ayesha",
  expertise: "UI/UX Designer",
  description: "Hi! I'm Ayesha, a passionate Web Developer...",
  descriptionskills: "Proficient in HTML, CSS, JS...",
  skills: [
    { skill: "Web Development", percentage: 95 },
    { skill: "Brand Identity", percentage: 80 },
    { skill: "Logo Design", percentage: 90 },
  ],
  projects: [
    { title: "Business Startup", description: "Design & Development" },
  ],
};

const UserPortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/portfolio/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio(res.data);
      } catch (err) {
        setPortfolio(null);
      }
    };
    fetchPortfolio();
  }, []);

  if (!portfolio) return <div>Loading...</div>;

  return (
    <>
      <Banner
        name={portfolio.name || fallback.name}
        expertise={portfolio.expertise || fallback.expertise}
        description={portfolio.description || fallback.description}
      />
      <Skills
        skills={
          portfolio.skills && portfolio.skills.length > 0
            ? portfolio.skills
            : fallback.skills
        }
        descriptionskills={
          portfolio.descriptionskills || fallback.descriptionskills
        }
      />
      <Projects
        projects={
          portfolio.projects && portfolio.projects.length > 0
            ? portfolio.projects
            : fallback.projects
        }
      />
      <Contact />
      <Footer />
    </>
  );
};

export default UserPortfolio;