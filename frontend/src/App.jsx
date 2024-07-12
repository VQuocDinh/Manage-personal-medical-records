import {
    RouterProvider
} from "react-router-dom";
import router from './assets/routes/router.jsx';
import StoreContextProvider from "./context/StoreContext.jsx";
function App() {

    return (
        <div className='app '>
            <StoreContextProvider>
                <RouterProvider router={router} />
            </StoreContextProvider>
        </div>

    )
}

export default App
