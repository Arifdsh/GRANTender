import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Authorization from "./pages/authorization/Authorization";
import Apply from "./components/apply/Apply";
import Profile from "./pages/profile/Profile";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./features/usersSlice.js";
import { useEffect } from "react";
import Navbar  from "../src/components/navbar/Navbar.jsx";
const App = () => {
  const dispatch = useDispatch();
 const location = useLocation()

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      dispatch(setLoggedInUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <>
        <ScrollToTop />
        {location.pathname !== '/authorization' && <Navbar/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {location.pathname !== "/authorization" && <Footer/>}
    </>
  );
};

export default App;
