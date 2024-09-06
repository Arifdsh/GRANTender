import React from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import "./DarkLightMode.scss";
import { useEffect, useState } from "react";
const DarkLightMode = () => {
  const [theme, SetTheme] = useState(false);
  const handleClick = () => {
    SetTheme(!theme);
  };

  useEffect(
    () =>
      theme == true
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark"),
    [theme]
  );
  return (
    <>
      <button onClick={handleClick}>
        {theme ? <CiLight /> : <MdDarkMode />}
      </button>
    </>
  );
};

export default DarkLightMode;
