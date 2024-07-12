import React from 'react'
import Nav from '../../component/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../../component/Footer/Footer'

const CustomerLayout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}

export default CustomerLayout
