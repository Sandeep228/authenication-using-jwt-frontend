import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom';

const Unprotected = () => {
    const {isLoggedIn} = useSelector((state) => state.auth)
  return (
    <>
      {!isLoggedIn ? <Outlet/> : <Navigate to="/home"/>}
    </>
  )
}

export default Unprotected