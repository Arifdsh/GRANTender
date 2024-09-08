import React from "react";

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
    nav: true,

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
        <h1 className="d-flex justify-content-center align-items-center fw-bold py-5">
          OUR PARTNERS
        </h1>
        <div className="d-flex justify-content-center align-items-center mx-5 ">
          <OwlCarousel className="owl-theme " {...options}>
            <div class="item">
              <h4 className="text-center text-muted">
              
                <img src="1.jpg.jpg" />
                Avantgarde Web studio
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="2.png.png" />
                EcoStep
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="3.jpg.jpg"/>
                Smts
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="4.jpg.jpg" />
                White Construction Group MMC
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="5.jpg.jpg" />
                MİNOR BUSİNESS GROUP
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="6.jpg.jpg" />
                Agah Group MMC
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="7.png.png" /> AZİS TİKİNTİ ŞİRKƏTİ
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="8.png.png" />
                Admaer
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="9.png.png" />
                MOR MMC
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="10.png.png" />
                AZKAN İNŞAAT
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="11.jpg.jpg" />
                Miray inşaat
              </h4>
            </div>
            <div class="item">
              <h4 className="text-center text-muted">
                <img src="12.png.png" />
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
