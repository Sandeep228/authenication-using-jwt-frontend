import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
passwordresetrequest,
  emailvalidate,
  resetValidation,
} from "../features/auth/authSlice";

const ResetPassword = () => {
  const [inputEmail, setEmail] = useState();
  const [inputPassword, setPassword] = useState();
  const { isValid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationRequest = (e) => {
    e.preventDefault();
    dispatch(emailvalidate(inputEmail));
    dispatch(resetValidation());
  };

  const passwordReset = (e) => {
    e.preventDefault();
    const updatedPassword = {
      email: inputEmail,
      password: inputPassword,
    };
    dispatch(passwordresetrequest(updatedPassword));
    dispatch(resetValidation());
    navigate("/login");
  };

  return (
    <React.Fragment>
      <header>
        <span>
          <Link to="/home">Home</Link>
        </span>
      </header>
      <form>
        <h1>Forgot password</h1>
        <input
          placeholder="enter your email address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {isValid ? (
          <input
            placeholder="enter your new password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : null}
        {!isValid ? (
          <button type="submit" onClick={validationRequest}>
            Validate email
          </button>
        ) : (
          <button type="submit" onClick={passwordReset}>
            Request for reset
          </button>
        )}
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;
