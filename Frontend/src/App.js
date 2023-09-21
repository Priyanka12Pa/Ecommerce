import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Registrations from "./Component/Registration";
import AdminDashboard from "./Component/AdminDashboard";


import Cart from './Component/Cart';
import Product from './Component/Product'
import { CartContext } from './Component/CartContext';
import Invoice from './Component/Invoice';
import Category from './Component/Category';
import Forgotpassword from './Component/Forgotpassword';
import Resetpassword from './Component/Resetpassword';

import Protectedroutes from './Component/Protectedroutes';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />


          <Route path="/home" element={<Home />} />
          <Route path="/registera" element={<Registrations />} />

          <Route path="/admindash" element={<Protectedroutes><AdminDashboard /></Protectedroutes>} />
          <Route path="/cartcontext" element={<Protectedroutes><CartContext /></Protectedroutes>} />

          <Route path="/cartsss" element={<Protectedroutes><Cart/> </Protectedroutes>} />
          <Route path="/product" element={<Protectedroutes><Product /></Protectedroutes>} />
          <Route path="/invoice/:id" element={<Protectedroutes><Invoice /></Protectedroutes>} />
          <Route path="category" element={<Protectedroutes><Category /></Protectedroutes>} />
          <Route path="/forgot" element={<Protectedroutes><Forgotpassword /></Protectedroutes>} />
          <Route path="/reset/:token" element={<Protectedroutes><Resetpassword /></Protectedroutes>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
