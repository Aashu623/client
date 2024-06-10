import React, { useEffect, useState } from "react";
import "../styles/userDetailsPage.css";
import profile from "../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/layout/Loader/Loader";
import { useNavigate, Link } from "react-router-dom";
import { loadQuiz } from "../actions/quizAction";
import { getAllResults } from "../actions/resultAction";
import MetaData from "../Components/layout/MetaData";
import CopyrightIcon from '@mui/icons-material/Copyright';


function UserDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [quizId, setQuizId] = useState("");

  const submitHandler = () => {
    dispatch(loadQuiz(quizId));
    navigate("/quiz");
  };

  const getResultHandler = () => {
    dispatch(getAllResults());
    navigate("/results");
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <>
      <MetaData title="Dashboard | Code Fusion" />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="userDetails">
            <div className="card">
              <img src={profile} alt="" />
              <span className="role">{user.role}</span>
              <span>{user.name}</span>
              <span>{user.enrollment}</span>
              <span>{user.email}</span>
              <span>{user.branch}</span>
            </div>
          </div>

          <div>
            <div className="quiz">
              {user.role === "Admin" ? (
                <button onClick={getResultHandler}>Get results</button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter quiz id"
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                  />
                  <button className="button-1" onClick={submitHandler}>Start quiz</button>
                </>
              )}
            </div>
          </div>
          <div className="footer">
            <CopyrightIcon /> developed by <Link to={"https://aashu623.github.io/Portfolio/"} target="blank">Aashish kushwah</Link>
          </div>
        </div>
      )}

    </>
  );
}

export default UserDetailsPage;
