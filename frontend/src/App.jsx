import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import StoreContextProvider, { StoreContext } from "./context/StoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/style/index.scss'
import { useContext } from "react";

function App() {
  const { theme } = useContext(StoreContext);
  return (
      <div className="app " data-theme={theme}>
        <RouterProvider router={router} />
      </div>
  );
}
export default App;
