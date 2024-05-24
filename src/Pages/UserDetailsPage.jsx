import React, { useEffect, useState } from "react";
import "../styles/userDetailsPage.css";
import profile from "../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { loadQuiz } from "../actions/quizAction";

function UserDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { quiz } = useSelector((state) => state.quiz);
  const [quizId, setQuizId] = useState("");

  const submitHandler = () => {
    dispatch(loadQuiz(quizId));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // navigate("/login");
    }
    if (quiz) {
      navigate("/quiz");
    }
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="userDetails">
            <div className="card">
              <img src={profile} alt="" />
              <span>{user.name}</span>
              <span>{user.enrollment}</span>
              <span>{user.email}</span>
              <span>{user.branch}</span>
            </div>
          </div>

          <div>
            <div className="quiz">
              <input
                type="text"
                placeholder="Enter quiz id"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
              />
              <button onClick={submitHandler}>Start Quiz</button>
            </div>
            {user.role === "admin" && (
              <div className="allQuizzes">
                <div className="quiz">
                  <span>title</span>
                  <span>created By : Aashish Kushwah</span>
                  <span>Date : 15/05/2024</span>
                  <span>Question : 15</span>
                  <span>Time : 120 min</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetailsPage;
