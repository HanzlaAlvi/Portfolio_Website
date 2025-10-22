import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.jpeg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ width: "80px" }} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={
                activeLink === "skills" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("skills")}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === "projects"
                  ? "active navbar-link"
                  : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className={
                activeLink === "contact"
                  ? "active navbar-link"
                  : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("contact")}
            >
              Contact us
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={navIcon1}
                  alt="LinkedIn"
                  style={{ width: "30px", margin: "0 10px" }}
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={navIcon2}
                  alt="Facebook"
                  style={{ width: "30px", margin: "0 10px" }}
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={navIcon3}
                  alt="Instagram"
                  style={{ width: "30px", margin: "0 10px" }}
                />
              </a>
            </div>
            
            {/* Conditionally render buttons based on login status */}
            {!isLoggedIn ? (
              <>
                {/* Login Button - Show when NOT logged in */}
                <Link to="/login">
                  <button className="vvd">
                    <span>Login</span>
                  </button>
                </Link>
                {/* SignUp Button - Show when NOT logged in */}
                <Link to="/signup">
                  <button className="vvd" style={{ marginLeft: "10px" }}>
                    <span>Sign Up</span>
                  </button>
                </Link>
              </>
            ) : (
              /* Logout Button - Show when logged in */
              <button
                className="vvd"
                style={{ marginLeft: "10px" }}
                onClick={handleLogout}
              >
                <span>Logout</span>
              </button>
            )}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};