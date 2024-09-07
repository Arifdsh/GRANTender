import React from 'react'
import  Navbar  from '../../components/navbar/Navbar.jsx'
import Search from '../../components/search/Search.jsx'
import Hero from '../../components/hero/Hero.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Search/>
    </div>
  )
}

export default Home