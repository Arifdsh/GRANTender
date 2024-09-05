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
        <Navbar.Brand href="#">
       
          <img className="w-50" src="navbar-logo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="gap-5">
          <Nav className="me-auto my-2 my-lg-0 ">
            <Nav.Link>
              <DarkLightMode />
            </Nav.Link>
          </Nav>
          <Button variant="outline-success">
        
            <LiaSignInAltSolid /> Sign In
          </Button>
          <Button variant="outline-success">
            <GoPersonFill /> Sign Up
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
