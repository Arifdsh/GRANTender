import React from 'react'
import  Navbar  from '../../components/navbar/Navbar.jsx'
import Search from '../../components/search/Search.jsx'
import Cards from '../../components/cards/Cards.jsx'

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