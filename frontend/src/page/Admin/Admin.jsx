import React from 'react'
import './Admin.scss'
import Sidebar from '../../component/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
    return (
        <div className='admin w-100 d-flex p-3'>
            <Sidebar />
            <div className="content w-100 rounded-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
