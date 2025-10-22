import React, { useEffect, useState } from "react";
import axios from "axios";
import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import Contact from "./Contact";
import { Footer } from "./Footer";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const fallback = {
  name: "Hanzla",
  expertise: "UI/UX Designer",
  description: "Hi! I'm Hanzla, a passionate Web Developer...",
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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Token se userId extract karo
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.userId); // Ya decoded.userId ya decoded.id check karo
        }

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
      {/* Contact component ko userId pass karo */}
      <Contact userId={userId} />
      <Footer />
    </>
  );
};

export default UserPortfolio;