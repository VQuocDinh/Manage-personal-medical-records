import React, { useState } from 'react'
import './Sidebar.scss'
import { useNavigate } from 'react-router-dom'
import navLogo from '../../../assets/image/nav-logo.png'
import avt from '../../../assets/image/avt3d.png'
const Sidebar = () => {
    const [selected, setSelected] = useState('overview')
    const navigate = useNavigate()

    const handelLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className='sidebar w-25 h-100 me-3 p-3 d-flex flex-column jus'>
            <img src={navLogo} className='w-50 d-block' />
            <div className="mt-5 text-center profile">
                <img src={avt} alt="" className='rounded-circle' />
                <div className="mt-3 infor">
                    <h3>Vo Quoc Dinh</h3>
                    <p>Doctor</p>
                </div>
            </div>

            <ul class="list-group">
                <li onClick={() => {
                    setSelected('overview')
                    navigate('')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'overview'?'active':''}`}>
                    Overview
                    <span className="badge text-bg-warning rounded-pill">14</span>
                </li>

                <li onClick={() => {
                    setSelected('staffs')
                    navigate('staff')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'staffs'?'active':''}`}>
                    Staffs
                    <span className="badge text-bg-warning rounded-pill">14</span>
                </li>

                <li onClick={() => {
                    setSelected('account')
                    navigate('account')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'account'?'active':''}`}>
                    Accounts
                    <span className="badge text-bg-warning rounded-pill">2</span>
                </li>

                <li onClick={() => {
                    setSelected('health-indicators')
                    navigate('health-indicators')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'health-indicators'?'active':''}`}>
                    Health indicators
                    <span className="badge text-bg-warning rounded-pill">2</span>
                </li>

                <li onClick={() => {
                    setSelected('chart')
                    navigate('chart')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'chart'?'active':''}`}>
                    Health monitoring chart
                    <span className="badge text-bg-warning rounded-pill">2</span>
                </li>

                <li onClick={() => {
                    setSelected('chart')
                    navigate('chart')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === ''?'active':''}`}>
                    Symptoms and diagnosis
                    <span className="badge text-bg-warning rounded-pill">2</span>
                </li>

                <li onClick={() => {
                    setSelected('history')
                    navigate('history')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'history'?'active':''}`}>
                    Medical history
                    <span className="badge text-bg-warning rounded-pill">2</span>
                </li>

                <li onClick={() => {
                    setSelected('setting')
                    navigate('setting')
                }} className={`list-group-item d-flex justify-content-between align-items-center ${selected === 'setting'?'active':''}`}>
                    Setting
                    <span className="badge text-bg-warning rounded-pill">2</span>
                </li>

            </ul>

            <button onClick={handelLogout} className='mt-auto btn btn-outline-primary text-primary'>Log out</button>
        </div>
    )
}

export default Sidebar
