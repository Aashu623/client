import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/layout/Loader/Loader";
import "../styles/quizPage.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import { submitResult } from "../actions/resultAction";

function QuizPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { quiz, loading } = useSelector((state) => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [resultArray, setResultArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlerOptionClick = (selectedOption, questionId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: selectedOption,
    }));

    setResultArray((prevResultArray) => [
      ...prevResultArray.filter((result) => result.questionId !== questionId),
      { selectedOption, questionId },
    ]);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const isLastQuestion =
    quiz?.questions && currentQuestionIndex === quiz.questions.length - 1;

  const handleSubmit = () => {
    dispatch(submitResult(resultArray, quiz, user));
    navigate("/result/submit");
  };

  useEffect(() => {
    if (quiz && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }); // Add dependency array here including quiz

  if (loading || !quiz) {
    return <Loader />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-container">
        <div
          className="timer"
          style={{ color: timeLeft < 150 ? "red" : "green" }} // Use a fixed threshold
        >
          Time Left {formatTime(timeLeft)}
        </div>
        <div className="question-container">
          <div className="container-1">
            <div className="question">
            {currentQuestion.questionNumber}.
              {currentQuestion.text}
            </div>
            <div className="options">
              {currentQuestion.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <span>{optionIndex + 1}.</span>
                  <button
                    className={`optionButton ${
                      selectedOptions[currentQuestion._id] === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handlerOptionClick(option, currentQuestion._id)
                    }
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {currentQuestion.code && (
            <div className="container-2">
              <pre>
                <code className="code">{currentQuestion.code}</code>
              </pre>
            </div>
          )}
        </div>
        <div className="navigation-buttons">
          <button
            className="button-1"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {isLastQuestion ? (
            <button className="button-1" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button className="button-1" onClick={handleNextQuestion}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizPage;
