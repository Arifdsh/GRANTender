import { BrowserRouter as Router, ScrollRestoration } from "react-router-dom";
import App from "./App";

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;