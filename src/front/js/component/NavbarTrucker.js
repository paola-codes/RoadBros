import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoadBrosLogoPhoneView from "../../img/RoadBrosLogoPhoneView.png";
import { Context } from "../store/appContext";

export const NavbarTrucker = () => {
  const { actions } = useContext(Context);

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <img
            alt=""
            src={RoadBrosLogoPhoneView}
            width="50"
            className="d-inline-flex align-center p-0 m-0 text-white"
          />
          <h3 className="d-inline-flex m-0 p-2 text-white">RoadBros</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="/TruckerHomePage"
              className="text-decoration-none text-light me-2"
              onClick={() => {
                actions.getRequests();
              }}
            >
              <Nav.Item>Home</Nav.Item>
            </Link>
            <Link
              to="/TruckerHomePage"
              className="text-decoration-none text-light me-2"
            >
              <Nav.Item>Profile</Nav.Item>
            </Link>
            <Link
              to="/TruckerRequestsList"
              className="text-decoration-none text-light me-2"
              onClick={() => {
                actions.getRequests();
              }}
            >
              <Nav.Item>Requests List</Nav.Item>
            </Link>
            <Link
              to="/TruckerServiceManagement"
              className="text-decoration-none text-light me-2"
              onClick={() => {
                actions.getRequests();
              }}
            >
              <Nav.Item>Service Management</Nav.Item>
            </Link>
            <Link to="/" className="text-decoration-none text-light me-2">
              <Nav.Item>
                <span onClick={() => actions.logOut()}>Log Out</span>
              </Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
