import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./owlcarouselcomp.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/usersSlice";
import { useEffect } from "react";
const OwlCarouselComp = () => {
  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.user.users||[]);
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
      <section
        className="content_carousel bg-light mt-5"
        id="/section-partnyor.htm"
      >
        <h1 className="d-flex justify-content-center align-items-center fw-bold py-5 fs-2 carousel-heading text-decoration-underline">
          PARTNYORLARIMIZ
        </h1>
        <div className="d-flex justify-content-center align-items-center mx-5 ">
          <OwlCarousel className="owl-theme " {...options}>
          {users && users.length > 0 ? (
            users?.filter((user) => user.picture !== null)
            .map((user) => (
                <div key={user.id} className="item">
                  <img
                    src={user?.picture}
                    className="border carousel-border rounded"
                    alt={user.name}
                  />
                </div>
              ))
            ) : (
              <p>No users available</p> 
            )}
          </OwlCarousel>
        </div>
      </section>
    </>
  );
};

export default OwlCarouselComp;
