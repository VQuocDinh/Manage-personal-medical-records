import React from 'react'
import Home from '../../page/Home/Home';
import CustomerLayout from '../layout/CustomerLayout';
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import LoginSignUp from '../../page/LoginSignup/LoginSignup';
import User from '../../component/User/User';
import HealthIndexs from '../../component/HealthIndex/HealthIndex';
import Admin from '../../page/Admin/Admin';
import Overview from '../../component/Overview/Overview';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,

    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "",
                element: <Overview />,
            },
            
            {
                path: "user",
                element: <User />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginSignUp />,
    },
]);

export default router
