import React, { useEffect } from "react";
import {  Routes, Route,  } from "react-router-dom";
import Header from "../components/Header"
import toast from "react-hot-toast";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProtectedRoutes from './ProtectedRoutes';
import UnProtected from './Unprotected';
import Forgotpassword from  '../pages/resetpassword';

const Home =  () => {
  useEffect(() => {
        window.addEventListener("storage", (e) => {
          if (e.key === "token") {
            if (e.newValue !== e.oldValue) {
              console.log(e.newValue);
             toast.error(`You're not authorized.`);
             console.log(' not authorized.');
            }
          }
        });
      }, []);

  return (
    <React.Fragment>
   <Header/>
        <Routes>
          <Route path="/home" element={ <ProtectedRoutes> <Dashboard/> </ProtectedRoutes>} />
              <Route element={<UnProtected/>} path='/'>
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
                 <Route path="/reset" element={<Forgotpassword />} />
              </Route>
        </Routes>
    </React.Fragment>
  );
};

export default Home;
