import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

const fallbackImgs = [projImg1, projImg2, projImg3, projImg1, projImg2, projImg3];

const chunkProjects = (projects, parts) => {
  const chunks = Array.from({ length: parts }, () => []);
  projects.forEach((project, index) => {
    chunks[index % parts].push(project);
  });
  return chunks;
};

const ProjectGrid = ({ projects, emptyMessage }) => {
  if (!projects || projects.length === 0) {
    return <p className="projects-empty">{emptyMessage}</p>;
  }
  return (
    <Row>
      {projects.map((project) => (
        <ProjectCard
          key={project.originalIndex}
          title={project.title}
          description={project.description}
          imgUrl={fallbackImgs[project.originalIndex % fallbackImgs.length]}
        />
      ))}
    </Row>
  );
};

export const Projects = ({
  projects = [
    { title: "Business Startup", description: "Design & Development" },
    { title: "Business Startup", description: "Design & Development" },
    { title: "Business Startup", description: "Design & Development" },
    { title: "Business Startup", description: "Design & Development" },
  ],
}) => {
  const indexedProjects = projects.map((project, originalIndex) => ({
    ...project,
    originalIndex,
  }));
  const [tab1Projects, tab2Projects, tab3Projects] = chunkProjects(
    indexedProjects,
    3
  );

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>
                    Worked on multiple projects involving web development, UI/UX
                    design, and responsive layouts using modern tools and
                    technologies.
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Featured</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">More Work</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Additional Projects</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={isVisible ? "animate__animated animate__slideInUp" : ""}
                    >
                      <Tab.Pane eventKey="first">
                        <ProjectGrid
                          projects={tab1Projects}
                          emptyMessage="No featured projects yet. Add your first project to showcase it here."
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <ProjectGrid
                          projects={tab2Projects}
                          emptyMessage="More projects coming soon."
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <ProjectGrid
                          projects={tab3Projects}
                          emptyMessage="Additional projects coming soon."
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="BG" />
    </section>
  );
};