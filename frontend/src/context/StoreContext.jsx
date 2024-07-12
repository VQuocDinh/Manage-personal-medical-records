import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

    const [user_list, setUserList] = useState([])

    const fetchAllUsers = async () => {
        try {
            const userRes = await axios.get(`${baseUrl}/api/user/getUser`)
            if (userRes.data.success) {
                setUserList(userRes.data.data)
            }
        } catch (error) {
            console.error('Error fetching user list', error)
        }

    }

    useEffect(() => {
        const loadData = async () => {
            await fetchAllUsers();
        };
        loadData();
    }, []);

    const contextValue = {
        user_list,

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );

}

export default StoreContextProvider