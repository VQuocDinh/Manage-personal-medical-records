import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [theme, setTheme] = useState("light");
  const [staffList, setStaffList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [healthIndicatorList, setHealthIndicatorList] = useState([]);

  const fetchAllStaff = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/staff/get`);
      if (response.data.success) {
        setStaffList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching staff list", error);
    }
  };

  const fetchAllPatient = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/patient/get`);
      if (response.data.success) {
        setPatientList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching staff list", error);
    }
  };

  const fetchAllAccount = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/account/get`);
      if (res.data.success) {
        setAccountList(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching account list", error);
    }
  };

  const fetchAllIndicators = async ()=>{
    try {
      const res = await axios.get(`${baseUrl}/api/health-indicator/get`)
      if (res.data.success){
        setHealthIndicatorList(res.data.data)
      }
    } catch (error) {
      console.error("Error fetching health indicators list", error);

    }
  }

  useEffect(() => {
    fetchAllStaff();
    fetchAllPatient();
    fetchAllAccount();
    fetchAllIndicators()
    // fetchHealthIndicatorsByPatient()
  }, []);

  const contextValue = {
    theme,
    setTheme,
    staffList,
    patientList,
    accountList,
    healthIndicatorList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
