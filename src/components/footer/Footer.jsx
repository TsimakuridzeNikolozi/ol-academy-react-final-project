import React from "react";
import { Col } from "reactstrap";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <Col
      className="py-3 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#e0d0ff" }}
    >
      <span>&copy; {currentYear} All Rights Reserved</span>
    </Col>
  );
};

export default Footer;
