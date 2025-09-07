import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm"; // Optional: remove if not using
import logo from "../assets/img/logo.jpeg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "#111", padding: "40px 0", color: "#fff" }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Optional: Mailchimp subscription form */}
          <MailchimpForm />

          <Col
            size={12}
            sm={6}
            className="text-center text-sm-start mb-3 mb-sm-0"
          >
            <img src={logo} alt="Logo" style={{ width: "80px" }} />
          </Col>

          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon" style={{ marginBottom: "10px" }}>
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
            <p style={{ fontSize: "14px", margin: 0 }}>
              © 2025 Ayesha. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
