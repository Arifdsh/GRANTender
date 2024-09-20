import { PiSmileySadBold } from "react-icons/pi";
import './notFound.scss';
const NotFound = () => {
  return (
    <>
      <div className="notFoundContainer">
        <PiSmileySadBold className="smile" />
        <p>404</p>
        <p>Page Not Found</p>
      </div>
    </>
  );
};

export default NotFound;
