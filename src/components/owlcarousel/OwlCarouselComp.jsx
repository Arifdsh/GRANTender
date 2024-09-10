import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./owlcarouselcomp.scss";
const OwlCarouselComp = () => {
  const options = {
    items: 3,
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    animateOut: "slideOutUp",
    nav: false,

    dots: true,
    margin: 30,

    responsive: {
      1100: { items: 6 },
      724: { items: 3 },
      500: { items: 2 },
      370: { items: 1, innerWidth: "100%", outerWidth: "100%" },
    },
  };
  return (
    <>
      <div className="content_carousel bg-light mt-5">
        <h1 className="d-flex justify-content-center align-items-center fw-bold py-5 fs-2 carousel-heading text-decoration-underline">
          OUR PARTNERS
        </h1>
        <div className="d-flex justify-content-center align-items-center mx-5 ">
          <OwlCarousel className="owl-theme " {...options}>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="1.jpg.jpg"
                  className="border carousel-border rounded"
                />
                Avantgarde Web studio
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="2.png.png"
                  className="border carousel-border rounded"
                />
                EcoStep
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="3.jpg.jpg"
                  className="border carousel-border rounded"
                />
                Smts
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="4.jpg.jpg"
                  className="border carousel-border rounded"
                />
                White Construction Group MMC
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="5.jpg.jpg"
                  className="border carousel-border rounded"
                />
                MİNOR BUSİNESS GROUP
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="6.jpg.jpg"
                  className="border carousel-border rounded"
                />
                Agah Group MMC
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="7.png.png"
                  className="border carousel-border  rounded"
                />{" "}
                AZİS TİKİNTİ ŞİRKƏTİ
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="8.png.png"
                  className="border carousel-border rounded"
                />
                Admaer
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted ">
                <img
                  src="9.png.png"
                  className="border carousel-border rounded"
                />
                MOR MMC
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="10.png.png"
                  className="border carousel-border rounded"
                />
                AZKAN İNŞAAT
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="11.jpg.jpg"
                  className="border carousel-border rounded"
                />
                Miray inşaat
              </h4>
            </div>
            <div className="item">
              <h4 className="text-center text-muted">
                <img
                  src="12.png.png"
                  className="border carousel-border rounded"
                />
                İndigo
              </h4>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </>
  );
};

export default OwlCarouselComp;
