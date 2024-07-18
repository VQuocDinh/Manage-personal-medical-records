import React from 'react'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='admin w-100 d-flex p-3'>
      <Sidebar />
      <div className="content w-100">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
