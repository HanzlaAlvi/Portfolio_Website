import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import CircleMeter from "./CircleMeter";

export const Skills = ({
  skills = [
    { skill: "Logo Design", percentage: 90 },
    { skill: "Web Development", percentage: 95 },
    { skill: "Brand Identity", percentage: 80 },
  ],
  descriptionskills = "",
}) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>
                {descriptionskills ||
                  "Proficient in HTML, CSS, JavaScript, React.js; backend with Python, Django, Firebase; UI/UX with Figma/Adobe XD; strong Git/GitHub, teamwork."}
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                {(skills && skills.length > 0 ? skills : [
                  { skill: "Logo Design", percentage: 90 },
                  { skill: "Web Development", percentage: 95 },
                  { skill: "Brand Identity", percentage: 80 },
                ]).map((item, idx) => (
                  <div
                    className="item"
                    key={idx}
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircleMeter percentage={parseInt(item.percentage, 10) || 0} />
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.25em",
                        marginTop: 16,
                        letterSpacing: "0.5px",
                        fontFamily: "inherit",
                        textAlign: "center",
                      }}
                    >
                      {item.skill}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="BG" />
    </section>
  );
};