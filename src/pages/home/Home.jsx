import React from "react";
import Search from "../../components/search/Search.jsx";
import Cards from "../../components/cards/Cards.jsx";
import Hero from "../../components/hero/Hero.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import OwlCarouselComp from "../../components/owlcarousel/OwlCarouselComp.jsx";
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
import Chat from "../../components/chat/Chat.jsx"
const Home = () => {  
  return (
    <div>
      <DarkLightMode />
      <Hero />
      <Search />
      <Cards filterType="all" />
      <OwlCarouselComp />
      <Chat/>
    </div>
  );
};

export default Home;
