import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header"
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProtectedRoutes from './ProtectedRoutes';
import UnProtected from './Unprotected';


const Home =  () => {
  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );
  console.log(isLoggedIn)
  return (
    <React.Fragment>
      
        
    
      <Router>
      <Header/>
        <Routes>
            <Route element={<ProtectedRoutes/>}path='/'>
                  <Route path="/home" element={<Dashboard />} />
              </Route>
              <Route element={<UnProtected/>}path='/'>
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
              </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default Home;
