import React from "react";
import "../styles/homePage.css";
import MetaData from "../Components/layout/MetaData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/layout/Loader/Loader";

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
            <h1 className="homeHeading">Welcome to Quiz</h1>
            <button className="loginButton button-2" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
