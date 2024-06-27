import React from 'react'
import Navbar from './pages/Navbar'
import Home from './Home'
import Hero from './sections/Hero'
import Section1 from './sections/Section1'
import Section2 from './sections/Section2'
import Footer from './sections/Footer'
import SliderComponent from './sections/Slider'
// import Slider from 'react-slick'

const Layout = () => {
  return (
    <div className='flex flex-col ' >
      <Navbar/>
      <Hero/>
      {/* <SliderComponent/> */}
      <Section1/>
      <Section2/>
      <Footer/>
      {/* <Home/> */}
      
    </div>
  )
}

export default Layout
