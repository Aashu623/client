import React, { useEffect, useState } from "react";
import "../styles/registerPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Components/layout/Loader/Loader";
import { register } from "../actions/userAction";
import MetaData from "../Components/layout/MetaData";
import CopyrightIcon from '@mui/icons-material/Copyright';


function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [userName, setUserName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", userName);
    myForm.set("enrollment", enrollment.toUpperCase());
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("branch", branch);

    console.log(myForm);
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/me");
    }
  });

  return (
    <>
      <MetaData title="Register | Code Fusion" />

      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <form className="registerForm" onSubmit={registerSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Student Name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Enrollment</label>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Branch</label>
              <select name="" id="" onChange={(e) => setBranch(e.target.value)}>
                <option value="">-select-</option>
                <option value="BCA A">BCA A</option>
                <option value="BCA B">BCA B</option>
                <option value="BCA AIDA A">BCA AIDA A</option>
                <option value="BCA AIDA B">BCA AIDA B</option>
                <option value="BCA AIDA C">BCA AIDA C</option>
                <option value="BCA AIDA D">BCA AIDA D</option>
                <option value="MCA">MCA</option>
              </select>
            </div>

            <input type="submit" className="button-1" />
            <span>
              Already registered? <Link to="/login">Login here</Link>{" "}
            </span>
          </form>
        </div>
      )}
      <div className="footer">
        <CopyrightIcon /> developed by <Link to={"https://aashu623.github.io/Portfolio/"} target="blank">Aashish kushwah</Link>
      </div>
    </>
  );
}

export default RegisterPage;
