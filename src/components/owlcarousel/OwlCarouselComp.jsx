import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./owlcarouselcomp.scss";
const OwlCarouselComp = () => {
  const options = {
    items: 6,
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
      <section  className="content_carousel bg-light mt-5" id="/section-partnyor.htm">
        <h1 className="d-flex justify-content-center align-items-center fw-bold py-5 fs-2 carousel-heading text-decoration-underline">
       PARTNYORLARIMIZ
        </h1>
        <div className="d-flex justify-content-center align-items-center mx-5 ">
          <OwlCarousel className="owl-theme " {...options}>
            <div className="item">
             
                <img src="./src/assets/image/azinterservicecolor.png" className="border carousel-border rounded"/>
               
            </div>
            <div className="item">
              
                <img src="./src/assets/image/crocuscolor.png" className="border carousel-border rounded"/>
                
            </div>
            <div className="item">
              
                <img src="./src/assets/image/velievcolor.png" className="border carousel-border rounded"/>
                
            </div>
            <div className="item">
              
                <img src="./src/assets/image/eurooilcolor.png" className="border carousel-border rounded"/>
               
            </div>
            <div className="item">
              
                <img src="./src/assets/image/liderqrupcolor.png" className="border carousel-border rounded"/>
               
            </div>
            <div className="item">
             
                <img src="./src/assets/image/logo-Zahidandzakircolor.png" className="border carousel-border rounded"/>
               
                
            </div>
            <div className="item">
              
                <img src="./src/assets/image/lubristarcolor.png" className="border carousel-border  rounded"/>
                
            </div>
            <div className="item">
              
                <img src="./src/assets/image/retroholdingcolor.png" className="border carousel-border rounded"/>
                
            </div>
            <div className="item">
             
                <img src="./src/assets/image/velievcolor.png"  className="border carousel-border rounded"/>
               
            </div>
            <div className="item">
             
                <img src="./src/assets/image/zzmotorscolor.png" className="border carousel-border rounded"/>
                
            </div>
            <div className="item">
             
                <img src="./src/assets/image/retroholdingcolor.png" className="border carousel-border rounded"/>
               
            </div>
            <div className="item">
             
                <img src="./src/assets/image/eurooilcolor.png" className="border carousel-border rounded"/>
               
            </div>
          </OwlCarousel>
        </div>
      </section>
    </>
  );
};

export default OwlCarouselComp;
