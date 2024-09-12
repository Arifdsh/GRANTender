import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./navbar.scss"
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoPersonFill } from "react-icons/go";
function Header() {
  const navigate = useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container fluid>
        <Navbar.Brand href="#" className="py-0 my-0">
          <img className="w-75" src="./src/assets/logo-tender.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="gap-5">
  <Nav fill variant="tabs" defaultActiveKey="/home" className="gap-2">
      <Nav.Item>
        <Nav.Link href="/#" className=" nav-color fw-bold fs-3">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" className="nav-color fw-bold fs-3">Tenders</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2"className="nav-color fw-bold fs-3">Our Partners</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" className="nav-color fw-bold fs-3">Contacts</Nav.Link>
      </Nav.Item>
</Nav>
          <Nav className="my-2">
            <Button  onClick={() => navigate("/authorization")} variant="outline-primary fw-bold fs-4 shadow-lg ">
              <LiaSignInAltSolid /> Sign In/Up
            </Button>
          </Nav>
          {/* <Nav className="my-2">
            <Button variant="outline-primary fw-bold fs-4 shadow-lg">
              <GoPersonFill /> Sign Up
            </Button>
          </Nav> */}
          {/* <Nav className="my-2">
            <Button variant="outline-primary fw-bold fs-3 shadow-lg">
              <GoPersonFill /> Profile
            </Button>
          </Nav> 
          <Nav><span className="text-center rounded me-2">   <GoPersonFill /> </span></Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
