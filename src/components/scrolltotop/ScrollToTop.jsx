import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa"; 
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  left: 95%;
  bottom: 150px;
  border-color: white;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: rgb(21, 146, 177);
`;

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
  
    if (scrolled > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <Button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
};

export default ScrollButton;
