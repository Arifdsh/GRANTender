import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Authorization from "./pages/authorization/Authorization";
import Apply from "./components/apply/Apply";
import Profile from "./pages/profile/Profile";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import Navbar from "../src/components/navbar/Navbar.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
const App = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      {location.pathname !== "/authorization" &&
        !location.pathname.includes("/not-found") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      {location.pathname !== "/authorization" &&
        !location.pathname.includes("/not-found") && <Footer />}
    </>
  );
};

export default App;
