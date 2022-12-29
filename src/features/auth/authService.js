import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "/api/users";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);
  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  toast.success(response.data.message);
  return response.data;
};

//check authenication
const checkAuth = async () => {
  const authItem = localStorage.getItem("token");
  console.log("sd", authItem);
  if (authItem) {
    const authResponse = await axios.post(
      "http://localhost:8000/api/users/welcome",
      {
        token: authItem,
      }
    );
    return authResponse.data.isLoggedIn;
  }
  return null;
};

//validate email

const validatemail = async (formData) => {
  console.log(formData);
  const res = await axios.post("http://localhost:8000/api/users/validemail", {
    email: formData,
  });
  console.log("response", res.data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

// password reset
const passwordreset = async (formData) => {
  const res = await axios.post("http://localhost:8000/api/users/forgot", {
    formData,
  });
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "/logout");
  console.log(response.data);

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  logout,
  login,
  checkAuth,
  validatemail,
  passwordreset,
};

export default authService;
