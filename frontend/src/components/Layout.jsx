import React from 'react'
import Navbar from './pages/Navbar'
import Hero from './sections/Hero'
import Section2 from './sections/Section2'
import Footer from './sections/Footer'
import Info from './sections/SectionNew1'
import About from './sections/About'
import BookAppointment from './sections/BookAppoint'
import Reviews from './sections/Review'
import Doctors from './sections/Doctors'
// import Slider from 'react-slick'

const Layout = () => {
  return (
    <div className='flex flex-col ' >
      <Navbar/>
      <Hero/>
      <Info/>  
      <About/>
      <Doctors/>
      <Section2/>
      <BookAppointment/>
      <Reviews/>
      <Footer/>
      
    </div>
  )
}

export default Layout
