import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";

import "../detail/detail.scss";

const Detail = () => {
  return (
    <div>
      <Navbar />
      <DarkLightMode />
      <h1 className="d-flex align-items-center justify-content-center fw-bold text-decoration-underline mt-5">
        Detail
      </h1>
      <div className="content-detail">
        <div >
          <img
            src="3.jpg.jpg"
            alt=""
            className="border border-primary  rounded-circle"
            style={{ width: "150px" }}
          />
        </div>
        <div >
<p className="fw-bold fs-5">Elan sahibi(müəssisənin adı)</p>
          <p>“SMTS” şirkəti</p>
          <p className="fw-bold fs-5">Təşkilatın ünvanı</p>
          <p> Bakı şəhəri, H.Əliyev prospekti 105</p>
          <p className="fw-bold fs-5">Ehtimal olunan qiyməti</p>
          <p>qiyməti</p>
          <p className="fw-bold fs-5">Elanın yaradılma tarixi</p>
          <input type="date" />
          <p className="fw-bold fs-5">Elanın bitmə tarixi</p>
          <input type="date" />

          <button className="btn btn-primary ms-5 ">Müraciət et</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
