import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
import axios from 'axios';
import "../detail/detail.scss";
import { useParams } from "react-router-dom";
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

        
        if (response.data && Array.isArray(response.data.cards)) {
          setData(response.data.cards); 
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

  const findTender = data.find((tender) => tender.id == 3); 
  console.log(findTender);
  console.log(id);

  return (
    <div>
      <Navbar />
      <DarkLightMode />
      <h1 className="d-flex align-items-center justify-content-center fw-bold text-decoration-underline mt-5">
        Detail
      </h1>
      <div className="container" >
       <div className="row"> 
        <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
        <div className="vertical-text ">
        <div className="yanibsonenyazi">G</div>
        <div className="yanibsonenyazi">R</div>
        <div className="yanibsonenyazi">A</div>
        <div className="yanibsonenyazi">N</div>
        <div className="yanibsonenyazi">T</div>
        <div className="yanibsonenyazi">e</div>
        <div className="yanibsonenyazi">n</div>
        <div className="yanibsonenyazi">d</div>
        <div className="yanibsonenyazi">e</div>
        <div className="yanibsonenyazi">r</div>
      </div>
           </div>
       
<div className="col-lg-6 col-md-8 col-sm-12 d-flex justify-content-center mb-3">
       <img
         src="./src/assets/image/velievcolor.png" 
         alt=""
         className="border rounded "
         style={{ width: '400px',height:"470px" }}
       />
     </div>

   
     {findTender ? (
       <div className="col-lg-3 col-md-12 col-sm-12 mb-3" >
        
         <div className="mb-3">
         <span className="fw-bold">Elan sahibi (müəssisənin adı)</span>
         <p>{findTender.owner}</p></div>
         
         <div className="mb-3">
         <span className="fw-bold">Elanın predmeti</span>
         <p>{findTender.subject}</p></div>

         <div className="mb-3">
         <span className="fw-bold">Təşkilatın ünvanı</span>
         <p>{findTender.address}</p></div>

         <div className="mb-3">
         <span className="fw-bold">Ehtimal olunan qiyməti</span>
         <p>{findTender.price}</p></div>

         <div className="mb-3">
         <span className="fw-bold">Elanın yaradılma tarixi</span>
         <p>{findTender.creationDate}</p></div>

         <div className="mb-3">
         <span className="fw-bold">Elanın bitmə tarixi</span>
         <p>{findTender.expirationDate}</p></div>

       </div>
     ) : (
       <p>No tender found</p>
     )}</div>
      </div >
    </div>
  );
};

export default Detail;







