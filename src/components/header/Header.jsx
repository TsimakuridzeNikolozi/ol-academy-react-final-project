import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import MainIcon from "../../assets/images/MainIcon.png";
import { Authentication } from "../Authentication";

const Header = () => {
  return (
    <header className="p-3" style={{ backgroundColor: "#e0d0ff" }}>
      <Col className="d-flex align-items-center justify-content-between gap-3">
        <Link to="/">
          <img src={MainIcon} alt="Main Icon" width="50" height="50" />
        </Link>

        <Authentication />
      </Col>
    </header>
  );
};

export default Header;
