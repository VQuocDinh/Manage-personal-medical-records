import React from 'react'
import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
    return (
        <div className='user'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default CustomerLayout
