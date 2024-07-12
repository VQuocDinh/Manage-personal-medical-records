import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss'
import { assets } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className='sidebar w-25 h-100 rounded-4 me-3 p-3 d-flex flex-column jus'>
            <img src={assets.navLogo} alt="logo" className='w-50 d-block' />
            <div className="mt-5 profile">
                <img src={assets.avt} alt="" className='rounded-circle' />
                <div className="mt-3 infor">
                    <p>Name: Vo Quoc Dinh</p>
                    <p>Position: Doctor</p>
                </div>
            </div>

            <ul class="list-group">
                <li class="active list-group-item d-flex justify-content-between align-items-center">
                    User
                    <span class="badge text-bg-warning rounded-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Health index
                    <span class="badge text-bg-warning rounded-pill">2</span>
                </li>
                
            </ul>

            <button className='mt-auto btn btn-outline-primary text-primary'>Log out</button>
        </div>
    )
}

export default Sidebar
