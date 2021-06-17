import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.css";

const Footer = () => {
  return (
    <>
      <div className="block-footer  ">
        <Container>
          <Row className="d-flex flex-column flex-sm-row px-2">
            <Col className="list-container col-sm-4 d-flex flex-column align-items-sm-center">
              <div>
                <h3>LOCATION</h3>
                <ul className="list">
                  <li>123, Jalan ABC</li>
                  <li>34567 Tangkak</li>
                  <li>Johor, Malaysia</li>
                </ul>
              </div>
            </Col>
            <Col className="list-container col-sm-4 d-flex flex-column align-items-sm-center">
              <div>
                <h3>HOURS</h3>
                <ul className="list">
                  <li className="working--day">TUE &ndash; SUN </li>
                  <li>5pm &ndash; 11pm </li>
                </ul>
              </div>
            </Col>
            <Col className="list-container col-sm-4 d-flex flex-column align-items-sm-center">
              <div>
                <h3>CONTACT</h3>
                <ul className="list">
                  <li>John Smith </li>
                  <li>
                    <i className="fas fa-phone-alt footer__icon"></i>
                    012-3456789
                  </li>
                  <li>
                    <i className="footer__icon fas fa-envelope"></i>
                    abc@domain.com
                  </li>
                  <li>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="footer__icon fab fa-facebook"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
