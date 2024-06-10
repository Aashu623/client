import React, { useEffect } from "react";
import "../styles/successPage.css";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { clearErrors, getAllResults } from "../actions/resultAction";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { score, error } = useSelector((state) => state.result);

  const handlerLogout = () => {
    dispatch(getAllResults());
    navigate("/leaderboard");
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  });
  return (
    <>
      <div className="container">
        <div className="resultContainer">
          <h2>Your quiz has been submitted successfully</h2>{" "}
          <CheckCircleIcon
            style={{ fontSize: "4rem", color: "rgb(251, 202, 202)" }}
          />
          <div className="result">
            <h1>Your Score</h1>
            <span className={score < 10 ? "red" : "green"}>{score}</span>
          </div>
          <button onClick={handlerLogout}>Leaderboard</button>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
