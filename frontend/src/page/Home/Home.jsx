import React from 'react'
import './Home.scss'
import Service from '../../component/Service/Service'
import Header from '../../component/Header/Header'

const Home = () => {
  return (
    <div className='container home'>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home
