import React, { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import Contact from "./Contact";
import { Footer } from "./Footer";
import { useAuth } from "../context/AuthContext";
import { getMyPortfolio } from "../services/portfolioService";
import { demoPortfolio as fallback } from "../constants/demoPortfolio";

const UserPortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getMyPortfolio();
        setPortfolio(data);
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
      <Contact userId={userId} />
      <Footer name={portfolio.name || fallback.name} />
    </>
  );
};

export default UserPortfolio;
