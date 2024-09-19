import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoPersonFill } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";
import "./navbar.scss";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [homePage, setHomePage] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [signInUpshow, setSignInUpShow] = useState(true);
  const [logOut, setLogOut] = useState(true);
  const goToHomePage = () => {
    setHomePage(true);
    navigate("/");
  };
  const goToProfilePage = () => {
    setProfilePage(true);
    setSignInUpShow(false);
    navigate("/profile");
  };
  const LogOut = () => {
    setLogOut(false);
    window.localStorage.removeItem("loggedInUser");
    setProfilePage(false);

    navigate("/");
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
          <img className="logo" src="/src/assets/logo-tender.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="gap-5">
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="/home"
            className="gap-2 navList"
          >
            <Nav.Item>
              <Nav.Link
                onClick={goToHomePage}
                className="nav-color fw-bold fs-4"
              >
                Əsas səhifə
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              {!profilePage ? (
                <>
                  <Nav.Link
                    eventKey="link-1"
                    href="#/cards.htm"
                    className="nav-color fw-bold fs-4"
                  >
                    Tenderlər
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    eventKey="link-1"
                    href="#/cards.htm"
                    className="nav-color fw-bold fs-4"
                    disabled
                  >
                    Tenderlər
                  </Nav.Link>
                </>
              )}
            </Nav.Item>
            <Nav.Item>
              {!profilePage ? (
                <>
                  <Nav.Link
                    eventKey="link-2"
                    href="#/section-partnyor.htm"
                    className="nav-color fw-bold fs-4"
                  >
                    Partnyorlarımız
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    eventKey="link-2"
                    href="#/section-partnyor.htm"
                    className="nav-color fw-bold fs-4"
                    disabled
                  >
                    Partnyorlarımız
                  </Nav.Link>
                </>
              )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                href="#/footer.htm"
                className="nav-color fw-bold fs-4"
              >
                Əlaqə
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="my-2">
            {!userName || !logOut ? (
              <>
                <Button
                  onClick={() => navigate("/authorization")}
                  variant="outline-primary fw-bold fs-4 shadow-lg mx-5"
                >
                  <LiaSignInAltSolid className="signInUp" /> Giriş | Qeydiyyat
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={goToProfilePage}
                  variant="outline-primary fw-bold fs-5 shadow-lg m-2"
                >
                  <GoPersonFill className="personIcon" /> {userName}
                </Button>
                <Button
                  variant="outline-primary fw-bold fs-5 shadow-lg m-2"
                  onClick={LogOut}
                >
                  <RiLogoutCircleLine className="personIcon" /> Çıxış
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
