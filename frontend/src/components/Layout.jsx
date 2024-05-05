import React from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/Navbar'

const Layout = () => {
  return (
    <div className='flex flex-col ' >
      <Navbar/>
      <Outlet/>
      <Home/>
    </div>
  )
}

export default Layout
