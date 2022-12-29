import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "../src/Routes/routes";
import { checkAuth } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
