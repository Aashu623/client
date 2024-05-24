import React from "react";
import "../styles/homePage.css";
import MetaData from "../Components/layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../Components/layout/Loader/Loader";
import { Link } from "react-router-dom";

function HomePage() {
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
            <Link to="/login" className="loginButton">
              Login
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
