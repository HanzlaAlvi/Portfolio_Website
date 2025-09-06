import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PortfolioForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    description: "",
    descriptionskills: "",
    githubLink: "",
    linkedinLink: "",
    fbLink: "",
    InstaLink: "",
  });

  const [skills, setSkills] = useState([{ skill: "", percentage: "" }]);
  const [projects, setProjects] = useState([{ title: "", description: "", media: "" }]);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { skill: "", percentage: "" }]);
  };

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", media: "" }]);
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleNext = () => {
    if (currentStep === 2 && (!formData.name || !formData.expertise)) {
      setError("Please fill out all fields before proceeding.");
      return;
    }
    if (currentStep === 3) {
      const hasEmptySkill = skills.some(
        (skill) => !skill.skill || !skill.percentage
      );
      if (hasEmptySkill) {
        setError("Please fill out all skill fields before proceeding.");
        return;
      }
    }
    if (currentStep === 4) {
      const hasEmptyProject = projects.some(
        (project) => !project.title || !project.description
      );
      if (hasEmptyProject) {
        setError("Please fill out all project fields before proceeding.");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/portfolio",
        {
          ...formData,
          skills,
          projects: projects.map(({ title, description }) => ({ title, description })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        window.location.href = "/portfolio";
      }, 1200);
    } catch (err) {
      setError("Failed to save portfolio. Try again.");
    }
  };

  return (
    <div className="portfolio-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Portfolio Form</h2>
          <p>It should only take a couple of minutes to complete the form.</p>
        </div>
        <form onSubmit={handleSubmit} className="form-content">
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Let's get your portfolio form filled!</h3>
              <button
                type="button"
                onClick={handleNext}
                className="form-button"
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h3>Home</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="expertise"
                placeholder="Expertise"
                value={formData.expertise}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="A Brief Description About You"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h4>Skills</h4>
              <textarea
                name="descriptionskills"
                placeholder="A Brief Description About Your skills"
                rows="3"
                value={formData.descriptionskills}
                onChange={handleChange}
                required
              ></textarea>
              {skills.map((skill, index) => (
                <div key={index} className="skill-input">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill.skill}
                    onChange={(e) =>
                      handleSkillChange(index, "skill", e.target.value)
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Percentage"
                    value={skill.percentage}
                    onChange={(e) =>
                      handleSkillChange(index, "percentage", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="delete-skill-button"
                    onClick={() => deleteSkill(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="form-button add-skill-button"
              >
                + Add Skill
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-step">
              <h4>Projects</h4>
              {projects.map((project, index) => (
                <div key={index} className="project-input">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) =>
                      handleProjectChange(index, "title", e.target.value)
                    }
                    required
                  />
                  <textarea
                    placeholder="Project Description"
                    rows="3"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    required
                  ></textarea>
                  <button
                    type="button"
                    className="delete-project-button"
                    onClick={() => deleteProject(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="form-button add-project-button"
              >
                + Add Project
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="form-step">
              <input
                type="text"
                name="githubLink"
                placeholder="GitHub Profile Link"
                value={formData.githubLink}
                onChange={handleChange}
              />
              <input
                type="text"
                name="linkedinLink"
                placeholder="LinkedIn Profile Link"
                value={formData.linkedinLink}
                onChange={handleChange}
              />
              <input
                type="text"
                name="fbLink"
                placeholder="Facebook Profile Link"
                value={formData.fbLink}
                onChange={handleChange}
              />
              <input
                type="text"
                name="InstaLink"
                placeholder="Instagram Profile Link"
                value={formData.InstaLink}
                onChange={handleChange}
              />
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                className="form-button full-width"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {currentStep > 1 && currentStep < 5 && (
              <button
                type="button"
                className="form-button full-width"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentStep === 5 && (
              <button type="submit" className="form-button full-width">
                Submit
              </button>
            )}
          </div>
        </form>
        {submitted && (
          <p className="success-message">Form submitted successfully!</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioForm;