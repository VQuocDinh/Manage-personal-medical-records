import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Healthcare from "../components/user/Healthcare/Healthcare";
import Home from "../components/user/Home/Home";
import Patients from "../components/user/Patients/Patients";
import AddPatient from "../components/user/AddPatient/AddPatient";
import PatientDetail from "../components/user/PatientDetail/PatientDetail";
import Appointments from "../components/user/Appointments/Appointments";
import PatientRecordsDetail from "../components/user/PatientRecordsDetail/PatientRecordsDetail";
import Cure from "../components/user/Cure/Cure";
import Department from "../components/admin/Deparment/Deparment";

const LoginSignUp = lazy(() => import("../page/LoginSignup"));
const Information = lazy(() => import("../page/Information"));
const Admin = lazy(() => import("../page/Admin"));
const Overview = lazy(() => import("../components/admin/Overview/Overview"));
const Setting = lazy(() => import("../components/admin/Setting/Setting"));
const Staff = lazy(() => import("../components/admin/Staff/Staff"));
const AddStaff = lazy(() => import("../components/admin/AddStaff/AddStaff"));
const AddAccount = lazy(() =>
  import("../components/admin/AddAccount/AddAccount")
);
const EditStaff = lazy(() => import("../components/admin/EditStaff/EditStaff"));
const Accounts = lazy(() => import("../components/admin/Accounts/Accounts"));
const HealthIndicators = lazy(() =>
  import("../components/admin/HealthIndicators/HealthIndicators")
);
const Chart = lazy(() => import("../components/admin/Chart/Chart"));
const Symptoms = lazy(() => import("../components/admin/Symptoms/Symptoms"));
const History = lazy(() => import("../components/admin/History/History"));
const User = lazy(() => import("../page/User"));
const Record = lazy(() => import("../components/user/Record/Record"));
const FaceRecognition = lazy(() =>
  import("../components/user/FaceRecognition/FaceRecognition")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginSignUp />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Admin />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "setting",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Setting />
          </Suspense>
        ),
      },
      {
        path: "staff",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Staff />
          </Suspense>
        ),
      },{
        path: "departments",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            < Department/>
          </Suspense>
        ),
      },
      
      {
        path: "add-staff",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddStaff />
          </Suspense>
        ),
      },
      {
        path: "add-account",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddAccount />
          </Suspense>
        ),
      },
      {
        path: "edit-staff/:staff_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditStaff />
          </Suspense>
        ),
      },
      {
        path: "account",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Accounts />
          </Suspense>
        ),
      },
      {
        path: "health-indicators",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HealthIndicators />
          </Suspense>
        ),
      },
      {
        path: "chart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Chart />
          </Suspense>
        ),
      },
      {
        path: "symptoms",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Symptoms />
          </Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <History />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    ),
    children: [
      
      {
        path:"home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "medical-records/:patient_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Record />
          </Suspense>
        ),
      },
      {
        path: "patient-records-detail/:patientRecordsId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PatientRecordsDetail />
          </Suspense>
        ),
      },
      {
        path: "cure/:patientRecordsId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cure />
          </Suspense>
        ),
      },
      {
        path: "patient-records/:patient_records_id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PatientRecordsDetail />
          </Suspense>
        ),
      },
      {
        path: "face-recognition",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FaceRecognition />
          </Suspense>
        ),
      },
      {
        path: "appointments",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Appointments />
          </Suspense>
        ),
      },
      
      {
        path: "healthcare",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Healthcare />
          </Suspense>
        ),
      },

      {
        path: "patients",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Patients />
          </Suspense>
        ),
        
      },
      {
        path: "patients/:patientId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PatientDetail />
          </Suspense>
        ),
        
      },
      {
        path: "add-patient",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddPatient />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "infor",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Information />
      </Suspense>
    ),
  },
]);

export default router;
