import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleclick = () => {
    navigate("/reset");
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
    console.log(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("login successful");
      navigate("/home");
    }
    if (isError) {
      console.log("isError", isError);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
            <span className="right_link">
              <Link to="/register">New User?</Link>
            </span>
          </div>
        </form>
        <div className="form-group">
          <button type="submit" onClick={handleclick} className="btn btn-block">
            rest password{" "}
          </button>
        </div>
      </section>
    </>
  );
}

export default Login;
