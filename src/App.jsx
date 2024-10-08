import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import Navbar from "../src/components/navbar/Navbar.jsx";
import { Suspense, lazy } from "react";
import Loading from "../src/components/loading/Loading.jsx";
import DarkLightMode from "./components/navbar/DarkLightMode.jsx";

const Home = lazy(() => import("./pages/home/Home"));
const Detail = lazy(() => import("./pages/detail/Detail"));
const Authorization = lazy(() => import("./pages/authorization/Authorization"));
const Apply = lazy(() => import("./components/apply/Apply"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

const App = () => {
  const location = useLocation();

  return (
    <>
      <DarkLightMode />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </>
  );
};

export default App;
