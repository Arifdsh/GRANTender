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
import { useSelector } from "react-redux";
import Apply from "../../components/apply/Apply.jsx";
const Detail = () => {
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const userId = useSelector((state) => state.user.user?.id);
  const navigate = useNavigate();
  const [applyshow, setApplyShow] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseApiUrl);
        console.log("Full API response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected data structure:", response.data);
          setError("Unexpected data structure");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [baseApiUrl]);

  const findTender = data.find((tender) => tender.id.toString() === id);
  console.log(findTender);

  const handleApplyClick = () => {
    setApplyShow(true);
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
            <img src={"/"+findTender?.imgUrl} alt="" />
            </div>
          </div>
    {applyshow && <Apply />}
         
          {(findTender && !applyshow) ? (
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

              <h3 className="detail-list__title">
                Elanın yaradılış tarixi
              </h3>
              <p className="detail-list__content">
                <FaCalendarCheck className="detail-list__icon" />
                {findTender.creationDate}
              </p>

              <h3 className="detail-list__title">Elanın bitmə tarixi</h3>
              <p className="detail-list__content">
                <FaCalendarXmark className="detail-list__icon" />
                {findTender.expirationDate}
              </p>
              {findTender.userId !== userId && (
                <Button
                  className="detail-list__apply my-3"
                  onClick={handleApplyClick}
                >
                  Müraciət et
                </Button>

              )}
            

            </div>
          ) : (null
            
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Detail;


// import { useEffect, useState } from "react";
// import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
// import axios from "axios";
// import "../detail/detail.scss";
// import { useParams } from "react-router-dom";
// import { FaUserCircle, FaCalendarCheck } from "react-icons/fa";
// import { FaLocationDot, FaCalendarXmark } from "react-icons/fa6";
// import { MdSubject } from "react-icons/md";
// import { RiMoneyEuroBoxFill } from "react-icons/ri";
// import Button from "react-bootstrap/Button";
// import { Container, Row, Col } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import Apply from "../../components/apply/Apply.jsx";

// const Detail = () => {
//   const baseApiUrl = import.meta.env.VITE_API_URL;
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const userId = useSelector((state) => state.user.user?.id);
//   const [applyShow, setApplyShow] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(baseApiUrl);
//         if (response.data && Array.isArray(response.data)) {
//           setData(response.data);
//         } else {
//           setError("Unexpected data structure");
//         }
//       } catch (error) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [baseApiUrl]);

//   const findTender = data.find((tender) => tender.id.toString() === id);

//   const handleApplyClick = () => {
//     setApplyShow(true);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <div>
//       <DarkLightMode />
//       <Container fluid className="detail mt-5 py-5">
//         <Row className="justify-content-center">
//           <Col xs={12} className="detail__heading">
//             <h2>Ətraflı</h2>
//           </Col>
//         </Row>
//         <Row className="detail-list justify-content-center align-items-start shadow">
//           <Col md={5} xs={12} className="detail-list__item detail-list__leftside mb-4">
//             <p className="detail-list__vertical detail-list__light-effect m-2">
//               GRANTENDER
//             </p>
//             <div className="detail-list__photo">
//               <img
//                 src={findTender?.imgUrl ? `/${findTender.imgUrl}` : '/path/to/placeholder.jpg'}
//                 alt="Tender"
//                 className="img-fluid"
//               />
//             </div>
//           </Col>
//           {applyShow && <Apply />}
//           <Col md={6} xs={12} className="detail-list__item detail-list__rightside">
//             {(findTender && !applyShow) ? (
//               <>
//                 <h3 className="detail-list__title">Elan sahibi</h3>
//                 <p className="detail-list__content">
//                   <FaUserCircle className="detail-list__icon" />
//                   {findTender.owner}
//                 </p>

//                 <h3 className="detail-list__title">Elanın predmeti</h3>
//                 <p className="detail-list__content">
//                   <MdSubject className="detail-list__icon" />
//                   {findTender.subject}
//                 </p>

//                 <h3 className="detail-list__title">Şəhər</h3>
//                 <p className="detail-list__content">
//                   <FaLocationDot className="detail-list__icon" />
//                   {findTender.city}
//                 </p>

//                 <h3 className="detail-list__title">Təşkilatın ünvanı</h3>
//                 <p className="detail-list__content">
//                   <FaLocationDot className="detail-list__icon" />
//                   {findTender.address}
//                 </p>

//                 <h3 className="detail-list__title">Ehtimal olunan qiyməti</h3>
//                 <p className="detail-list__content">
//                   <RiMoneyEuroBoxFill className="detail-list__icon" />
//                   {findTender.price + " AZN"}
//                 </p>

//                 <h3 className="detail-list__title">Elanın yaradılış tarixi</h3>
//                 <p className="detail-list__content">
//                   <FaCalendarCheck className="detail-list__icon" />
//                   {findTender.creationDate}
//                 </p>

//                 <h3 className="detail-list__title">Elanın bitmə tarixi</h3>
//                 <p className="detail-list__content">
//                   <FaCalendarXmark className="detail-list__icon" />
//                   {findTender.expirationDate}
//                 </p>

//                 {findTender.userId !== userId && (
//                   <Button className="detail-list__apply my-3" onClick={handleApplyClick}>
//                     Müraciət et
//                   </Button>
//                 )}
//               </>
//             ) : (
//               <p>No tender found</p>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Detail;
