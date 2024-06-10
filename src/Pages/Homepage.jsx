import React from "react";
import "../styles/homePage.css";
import MetaData from "../Components/layout/MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/layout/Loader/Loader";
import CopyrightIcon from '@mui/icons-material/Copyright';

function HomePage() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title="Home Page" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="banner">
            <h1 className="homeHeading">Welcome to Code Fusion</h1>
            <button className="loginButton button-2" onClick={() => navigate("/login")}>
              Login
            </button>
            <div className="footer">
              <CopyrightIcon /> developed by <Link to={"https://aashu623.github.io/Portfolio/"} target="blank">Aashish kushwah</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
