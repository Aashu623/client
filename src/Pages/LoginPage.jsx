import React, { useEffect, useState } from "react";
import "../styles/loginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Components/layout/Loader/Loader";
import { clearErrors, login } from "../actions/userAction";
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [enrollment, setEnrollment] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(enrollment, loginPassword));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/me");
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <form className="loginForm" onSubmit={loginSubmit}>
            <div>
              <label>Enrollment No.</label>
              <input
                type="text"
                placeholder="Enrollment No."
                required
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button>Login</button>
            <span>
              Not registered? <Link to="/register">Register here</Link>
            </span>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginPage;
