import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      dispatch(setLoggedInUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
