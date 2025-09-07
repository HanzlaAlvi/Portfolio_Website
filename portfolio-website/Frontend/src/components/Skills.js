import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";

const meterImgs = [meter1, meter2, meter3, meter1, meter2, meter3];

export const Skills = ({
  skills = [
    { skill: "Web Development", percentage: 95 },
    { skill: "Brand Identity", percentage: 80 },
    { skill: "Logo Design", percentage: 90 },
  ],
  descriptionskills = "",
}) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
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
                  { skill: "Web Development" },
                  { skill: "Brand Identity" },
                  { skill: "Logo Design" },
                ]).map((item, idx) => (
                  <div className="item" key={idx}>
                    <img src={meterImgs[idx % meterImgs.length]} alt="Skill" />
                    <h5>{item.skill}</h5>
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