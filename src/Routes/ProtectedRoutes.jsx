import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {isLoggedIn} = useSelector((state) => state.auth)
  return (
    <>
      {isLoggedIn ? children : <Navigate to="/login" replace />}
    </>
  )
}

export default ProtectedRoutes