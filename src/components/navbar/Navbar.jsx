import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkLightMode from "./DarkLightMode";
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoPersonFill } from "react-icons/go";
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" className="py-0 my-0">
          <img className="w-75" src="logo-tender.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="gap-5">
          <Nav className="me-auto  my-lg-0 ">
            <Nav.Link className="my-2">
              <DarkLightMode />
            </Nav.Link>
          </Nav>
          <Nav className="my-2">
            <Button variant="outline-success shadow-lg ">
              <LiaSignInAltSolid /> Sign In
            </Button>
          </Nav>
          <Nav className="my-2">
            <Button variant="outline-success shadow-lg">
              <GoPersonFill /> Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
