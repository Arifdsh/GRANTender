import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { LiaSignInAltSolid } from "react-icons/lia";
import { GoPersonFill } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedInUser, logoutUser } from "../../features/usersSlice";

const Header = () => {
  const navigate = useNavigate();
  const [isProfilePage, setIsProfilePage] = useState(false); 
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);

  
  useEffect(() => {
    setIsProfilePage(location.pathname === "/profile");
  }, [location]);

  const goToHomePage = () => {
    navigate("/");
  };
  
  const goToProfilePage = () => {
    setIsProfilePage(true);
    navigate("/profile");
  };

  const handleLogout = () => {
    if (loggedInUser) {
      dispatch(logoutUser(loggedInUser.id));
      localStorage.setItem("UserLoggedIn", false);
      setIsProfilePage(false);
      navigate("/");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={goToHomePage} className="py-0 my-0">
          <img
            className="logo"
            src="/src/assets/image/logo-tender.png"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="gap-2">
          <Nav fill variant="tabs" className="gap-2 navList">
            <Nav.Item>
              <Nav.Link
                onClick={goToHomePage}
                className="nav-color fw-bold fs-4"
              >
                Əsas səhifə
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#/cards.htm"
                className="nav-color fw-bold fs-4"
                disabled={isProfilePage}
              >
                Tenderlər
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#/section-partnyor.htm"
                className="nav-color fw-bold fs-4"
                disabled={isProfilePage}
              >
                Partnyorlarımız
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#/footer.htm"
                className="nav-color fw-bold fs-4"
              >
                Əlaqə
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Nav className="my-2">
            {!loggedInUser ? (
              <Button
                onClick={() => navigate("/authorization")}
                variant="outline-primary fw-bold fs-4 shadow-lg mx-5"
              >
                <LiaSignInAltSolid className="signInUp" /> Giriş | Qeydiyyat
              </Button>
            ) : (
              <>
                <Button
                  onClick={goToProfilePage}
                  variant="outline-primary fw-bold fs-4 shadow-lg mx-2 my-1"
                >
                  <GoPersonFill className="personIcon" /> {loggedInUser.name}
                </Button>
                <Button
                  variant="outline-primary fw-bold fs-4 shadow-lg mx-2 my-1"
                  onClick={handleLogout}
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
