import React from 'react'
import Navbar from './pages/Navbar'
import Home from './Home'
import Hero from './sections/Hero'
import Section1 from './sections/Section1'
import Section2 from './sections/Section2'
import Footer from './sections/Footer'

const Layout = () => {
  return (
    <div className='flex flex-col ' >
      <Navbar/>
      <Hero/>
      <Section1/>
      <Section2/>
      <Footer/>
      {/* <Home/> */}
      
    </div>
  )
}

export default Layout
