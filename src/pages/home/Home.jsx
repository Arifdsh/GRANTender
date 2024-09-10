import React from 'react'
import Search from '../../components/search/Search.jsx'
import Cards from '../../components/cards/Cards.jsx'
import Hero from '../../components/hero/Hero.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Search/>
      <Cards/>
    </div>
  )
}

export default Home