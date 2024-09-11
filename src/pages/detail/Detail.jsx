import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
import axios from "axios";
import "../detail/detail.scss";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
    <div>
      <Navbar />
      <DarkLightMode />
      <h1 className="d-flex align-items-center justify-content-center fw-bold text-decoration-underline my-5">
        Detail
      </h1>
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-12 ">
            <img
              src="./src/assets/image/velievcolor.png"
              alt=""
              className="border rounded  "
              style={{ width: "350px", height: "200px" }}
            />

            <div className=" border-top  border-dark w-75 my-2"></div>

            <div className="vertical-text w-50 ">
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
          {findTender ? (
            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
              <div className=" border-bottom border-dark mb-4 w-75"></div>
              <div className="mb-3">
                <span className="border border-left border-dark me-2"></span>
                <button className=" border fw-bold ">
                  Elan sahibi (müəssisənin adı)
                </button>
                <p>{findTender.owner}</p>{" "}
              </div>

              <div className="mb-3">
                <span className="border border-left border-dark me-2"></span>
                <button className=" border fw-bold">Elanın predmeti</button>
                <p> {findTender.subject}</p>
              </div>

              <div className="mb-3">
                <span className="border border-left border-dark me-2"></span>
                <button className=" border fw-bold">Təşkilatın ünvanı</button>
                <p> {findTender.address}</p>
              </div>

              <div className="mb-3">
                <span className="border border-left border-dark me-2"></span>
                <button className=" border fw-bold">
                  Ehtimal olunan qiyməti
                </button>
                <p> {findTender.price}</p>
              </div>

              <div className="mb-3">
                <span className="border border-left border-dark me-2"></span>
                <button className=" border fw-bold">
                  Elanın yaradılma tarixi
                </button>
                <p> {findTender.creationDate}</p>
              </div>

              <div className="mb-3">
                <span className="border border-left border-dark me-2"></span>
                <button className=" border fw-bold">Elanın bitmə tarixi</button>
                <p> {findTender.expirationDate}</p>
              </div>

              <Button
                variant="primary"
                className="w-100 fw-bold fs-6"
                // disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
              >
                {isLoading ? "Loading…" : "Müraciət et"}
              </Button>
            </div>
          ) : (
            <p>No tender found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
