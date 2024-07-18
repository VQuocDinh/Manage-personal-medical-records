import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import LoginSignUp from '../page/LoginSignup';
import Admin from '../page/Admin';
import User from '../page/User';
import Overview from '../components/admin/Overview/Overview';
import AddStaff from '../components/admin/AddStaff/AddStaff';
import HealthIndicators from '../components/admin/HealthIndicators/HealthIndicators';
import EditStaff from '../components/admin/EditStaff/EditStaff';
import Accounts from '../components/admin/Accounts/Accounts';
import AddAccount from '../components/admin/AddAccount/AddAccount';
import Chart from '../components/admin/Chart/Chart';
import Setting from '../components/admin/Setting/Setting';
import Infor from '../components/specific/Infor/Infor';


const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginSignUp />,

    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "",
                element: < Overview/>,
            },

            {
                path: "setting",
                element: < Setting/>,
                children: [
                    {
                        path: "",
                        element: < Infor/>,
                    },
                ]
            },
            {
                path: "staff",
                element: <Chart />
            },

            {
                path: "add-staff",
                element: <AddStaff />,
            },

            {
                path: "add-account",
                element: <AddAccount />,
            },

            {
                path: "edit-staff/:staff_id",
                element: <EditStaff />,
            },

            {
                path: "account",
                element: <Accounts />,
            },

            {
                path: "health-indicators",
                element: <HealthIndicators />,
            },

            {
                path: "chart",
                element: <Chart />,
            },
        ],
    },
    {
        path: "/user",
        element: <User />,
    },
]);

export default router
