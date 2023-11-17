import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPassword2 from "./pages/ForgotPassword2";
import TomPromo1 from "./pages/TomPromo1";
import TomPromo2 from "./pages/TomPromo2";
import Monitoring from "./pages/Monitoring/monitoring"
import EssentialPromo1 from "./pages/Essential_Promo1";
import EssentialPromo2 from "./pages/Essential_Promo2";
import { SelectedCategoryProvider } from './contexts/SelectedCategoryContext';
import { StatusProvider } from './contexts/OrderStatusContext';
import { SelectedCepProvider } from "./contexts/SelectCepContext";

/**
 * Component that renders the application with the routes
 * */
function App() {
  return (
    <>
    <SelectedCategoryProvider>
      <StatusProvider>
       <SelectedCepProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/monitoring/:id" element={<Monitoring />} />
            <Route path="/essential_promo/:id" element={<EssentialPromo1 />} />
            <Route path="/essential_promo2/:id" element={<EssentialPromo2 />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/forgotpassword2" element={<ForgotPassword2 />} />          
            <Route path="/tompromo1/:id" element={< TomPromo1 />} />
            <Route path="/tompromo2/:id" element={<TomPromo2 />} />
          </Routes>
          </SelectedCepProvider>
      </StatusProvider>
    </SelectedCategoryProvider>
    </>
  );
}

export default App;
