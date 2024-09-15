import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoPersonFill } from "react-icons/go";
import "./navbar.scss";

function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
    setShowAuthorization(true);
  };
  const goToProfilePage = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={goToHomePage} className="py-0 my-0">
          <img className="w-75" src="/src/assets/logo-tender.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="gap-5">
          <Nav fill variant="tabs" defaultActiveKey="/home" className="gap-2">
            <Nav.Item>
              <Nav.Link
                onClick={goToHomePage}
                className="nav-color fw-bold fs-4"
              >
                Əsas səhifə
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="link-1" className="nav-color fw-bold fs-4">
                Tenderlər
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" className="nav-color fw-bold fs-4">
                Partnyorlarımız
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3" className="nav-color fw-bold fs-4">
                Əlaqə
              </Nav.Link>
            </Nav.Item>
            {!userName ? (
              <>
                <Button
                  onClick={() => navigate("/authorization")}
                  variant="outline-primary fw-bold fs-4 shadow-lg mx-5"
                >
                  <LiaSignInAltSolid className="signInUp" /> Giriş| Qeydiyyat
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  onClick={goToProfilePage}
                  variant="outline-primary fw-bold fs-5 shadow-lg mx-5"
                >
                  <GoPersonFill /> Şəxsi kabinet
                </Button>
                <span className="text-center fs-6 fw-bold my-3 ms-5 text-muted ">
                  İstifadəçi adı:{userName}
                </span>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
