
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Səhifəni yuxarıya qaytarır
//   }, [pathname]);

//   return null;
// };

// export default ScrollToTop;


// import { useLocation } from "react-router-dom";
// import { useLayoutEffect } from "react";
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useLayoutEffect(() => {
//     window.scrollTo({top:0,behavior:"auto"}); // Səhifəni yuxarıya qaytarır
//   }, [pathname]);

//   return null;
// };

//export default ScrollToTop;







// import React, { useState, useEffect } from "react";

// function ScrollToTopButton() {
//   const [isVisible, setIsVisible] = useState(false);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
//   };

//   useEffect(() => {
//     // Button is displayed after scrolling for 300 pixels
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);

//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   return (
//     <div className="scroll-to-top">
//       {isVisible && (
//         <div onClick={scrollToTop}>
//           <button className="text-danger z-3">Go up!</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ScrollToTopButton;


import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

import "./scrolltotop.scss";

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 50) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="top-to-btm">
            {" "}
            {showTopBtn && (
                <FaAngleUp
                    className="icon-position icon-style"
                    onClick={goToTop}
                />
            )}{" "}
        </div>
    );
};
export default ScrollToTop;