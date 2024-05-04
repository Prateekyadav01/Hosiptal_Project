import React from 'react'
import Team from './Team'
import Login from './auth/Login'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='mt-4'>
       <Outlet/> 
    </div>
  )
}

export default Home
