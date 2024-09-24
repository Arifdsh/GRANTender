import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
import axios from "axios";
import "../detail/detail.scss";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaCalendarCheck } from "react-icons/fa";
import { FaLocationDot, FaCalendarXmark } from "react-icons/fa6";
import { MdSubject } from "react-icons/md";
import { RiMoneyEuroBoxFill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Apply from '../../components/apply/Apply.jsx'
import { fetchTenders, selectAllTenders, setSelectedTenderId, setSelectedTenderUserId, showApplyForm, hideApplyForm } from "../../features/tendersSlice.js";
import { fetchAllUsers } from "../../features/usersSlice.js";
const Detail = () => {
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const userId = useSelector((state) => state.user.user?.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tenders = useSelector(selectAllTenders);
  const users = useSelector((state) => state.user.users);


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTenders())
      .then(() => {
      })
      .catch((error) => {
        console.error("Error fetching tenders:", error);
      });
  }, [dispatch]);

  const applyShow = useSelector((state) => state.tenders.applyShow)

  const findTender = tenders.find((tender) => tender.id.toString() === id);
  const findUser = users.find((user) => user.id === findTender?.userId);

  const handleApplyClick = () => {
    const userLoggedIn = localStorage.getItem("UserLoggedIn");
    dispatch(setSelectedTenderId(findTender.id))
    dispatch(setSelectedTenderUserId(findTender.userId))

    if (userLoggedIn === "true" && userLoggedIn) {
      dispatch(showApplyForm())
    } else {
      navigate("/authorization");
    }
  };


  useEffect(()=>{
     dispatch(hideApplyForm())
  }, [dispatch, location.pathname])

  const renderTenderFile = () => {
    if (findTender?.files?.length > 0) {
      return findTender.files.map((file, index) => {
        const fileUrl = file.base64;

        return (
          <div key={index} className="file-item">
            <p>{file.name} ({Math.round(file.size / 1024)} KB)</p>

            {/* Create a download link for the base64 file */}
            <a href={fileUrl} download={file.name} className="btn btn-primary">
              Download {file.name}
            </a>
          </div>
        );
      });
    } else {
      return <p>No files available for this tender.</p>;
    }
  };

  return (
    <div>
      <DarkLightMode />

      <Container fluid className="detail mt-5 py-5">
        <Row className="justify-content-center">
          <Col xs={12} className="detail__heading">
            <h2>Ətraflı</h2>
          </Col>
        </Row>
        <Row className="detail-list justify-content-center align-items-center shadow ">
          <div className="detail-list__item detail-list__leftside">
            <p className="detail-list__vertical detail-list__light-effect m-2">
              GRANTENDER
            </p>
            <div className="detail-list__photo">
              {findUser?.picture ? (
                <img src={findUser.picture} alt="Profile" />
              ) : (
                <span>{findTender?.owner[0]}</span>
              )}
            </div>
          </div>
          {applyShow ? (
          <Apply  />
        ) : (
          findTender && (
            <div className="detail-list__item detail-list__rightside">
              <h3 className="detail-list__title">Elan sahibi</h3>
              <p className="detail-list__content">
                <FaUserCircle className="detail-list__icon" />
                {findTender.owner}
              </p>

              <h3 className="detail-list__title">Elanın predmeti</h3>
              <p className="detail-list__content">
                <MdSubject className="detail-list__icon" />
                {findTender.subject}
              </p>

              <h3 className="detail-list__title">Şəhər</h3>
              <p className="detail-list__content">
                <FaLocationDot className="detail-list__icon" />
                {findTender.city}
              </p>

              <h3 className="detail-list__title">Təşkilatın ünvanı</h3>
              <p className="detail-list__content">
                <FaLocationDot className="detail-list__icon" />
                {findTender.address}
              </p>

              <h3 className="detail-list__title">Ehtimal olunan qiyməti</h3>
              <p className="detail-list__content">
                <RiMoneyEuroBoxFill className="detail-list__icon" />
                {findTender.price + " AZN"}
              </p>

              <h3 className="detail-list__title">Elanın yaradılış tarixi</h3>
              <p className="detail-list__content">
                <FaCalendarCheck className="detail-list__icon" />
                {findTender.creationDate}
              </p>

              <h3 className="detail-list__title">Elanın bitmə tarixi</h3>
              <p className="detail-list__content">
                <FaCalendarXmark className="detail-list__icon" />
                {findTender.expirationDate}
              </p>
              <h3 className="detail-list__title">Tender Files</h3>
              {renderTenderFile()}
              {findTender.userId !== userId && (
                <Button className="detail-list__apply " onClick={handleApplyClick} >Müraciət et</Button>
              )}
            </div>

          ) 
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Detail;