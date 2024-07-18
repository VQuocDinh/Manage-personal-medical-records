import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

    const [staff_list, setStaffList] = useState([])

    const fetchAllStaffs = async () => {
        try {
            const staffRes = await axios.get(`${baseUrl}/api/staff/getStaff`)
            if (staffRes.data.success) {
                console.log(staffRes.data.data)
                setStaffList(staffRes.data.data)
            }
        } catch (error) {
            console.error('Error fetching staff list', error)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchAllStaffs();
        };
        loadData();
    }, []);

    const contextValue = {
        staff_list,

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );

}

export default StoreContextProvider