import React from "react";
import "./Home.css";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { loading } = useSelector((state) => state.user);
  return (
    <>
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

export default Home;
