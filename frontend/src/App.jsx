import { RouterProvider } from "react-router-dom";
import router from './routes/router.jsx';
import StoreContextProvider from "./context/StoreContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

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
