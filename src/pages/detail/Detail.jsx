import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
import axios from "axios";
import "../detail/detail.scss";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ScrollToTop from "../../components/scrolltotop/ScrollToTop.jsx";

const Detail = () => {
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseApiUrl);
        console.log("Full API response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected data structure:", response.data);
          setError("Unexpected data structure",);
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

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    // <div>
    //   <Navbar />
    //   <DarkLightMode />
    //   <ScrollToTop />
    //   <h1 className="d-flex align-items-center justify-content-center fw-bold text-decoration-underline my-5 detail-heading">
    //     ƏTRAFLI
    //   </h1>
    //   <div className="container mb-5">
    //     <div className="row">
    //       <div className="col-lg-6 col-md-8 col-sm-12 ">
    //         <img
    //           src="/src/assets/image/velievcolor.png"
    //           alt=""
    //           className="border rounded  "
    //           style={{ width: "330px", height: "330px" }}
    //         />

    //         <div className="vertical-text my-2 w-50">
    //           <p className="light-effect my-2">GRANTender</p>
    //         </div>
    //       </div>
    //       {findTender ? (
    //         <div className="col-lg-3 col-md-12 col-sm-12 mb-3 mt-2">
    //           <div className="mb-3">
    //             <span className="border border-left border-primary border-2 me-2"></span>
    //             <button className="border fw-bold fs-5">Elan sahibi</button>
    //             <p className="ms-3 mt-2 mb-4">{findTender.owner}</p>
    //           </div>

    //           <div className="mb-3">
    //             <span className="border border-left border-primary border-2 me-2"></span>
    //             <button className="border fw-bold fs-5">Elanın predmeti</button>
    //             <p className="ms-3 mt-2 mb-4"> {findTender.subject}</p>
    //           </div>

    //           <div className="mb-3">
    //             <span className="border border-left border-primary border-2 me-2"></span>
    //             <button className="border fw-bold fs-5">Təşkilatın ünvanı</button>
    //             <p className="ms-3 mt-2 mb-4"> {findTender.address}</p>
    //           </div>

    //           <div className="mb-3">
    //             <span className="border border-left border-primary border-2 me-2"></span>
    //             <button className="border fw-bold fs-5">Ehtimal olunan qiyməti</button>
    //             <p className="ms-3 mt-2 mb-4"> {findTender.price}</p>
    //           </div>

    //           <div className="mb-3">
    //             <span className="border border-left border-primary border-2 me-2"></span>
    //             <button className="border fw-bold fs-5">Elanın yaradılma tarixi</button>
    //             <p className="ms-3 mt-2 mb-4"> {findTender.creationDate}</p>
    //           </div>

    //           <div className="mb-3">
    //             <span className="border border-left border-primary border-2 me-2"></span>
    //             <button className="border fw-bold fs-5">Elanın bitmə tarixi</button>
    //             <p className="ms-3 mt-2 mb-5"> {findTender.expirationDate}</p>
    //           </div>

    //           <Button
    //             variant="primary"
    //             className="w-100 fw-bold fs-5 mt-5"
    //             onClick={!isLoading ? handleClick : null}
    //           >
    //             {isLoading ? "Loading…" : "Müraciət et"}
    //           </Button>
    //         </div>
    //       ) : (
    //         <p>No tender found</p>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <>
    <section className="detail">
      
    </section>
    </>
    
  );
};

export default Detail;
