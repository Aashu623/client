import React, { useEffect, useState } from "react";
import '../styles/leaderboard.css'
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Components/layout/MetaData";



function LeaderboardPage() {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.allResults);
  const [topResults, setTopResults] = useState([]);

  useEffect(() => {
    if (results) {
      const sortedResults = [...results].sort((a, b) => b.score - a.score);
      setTopResults(sortedResults.slice(0, 10)); // Get top 10 results
    }
  }, [results, dispatch]);

  return (
    <>
      <MetaData title="Leaderboard | Code Fusion" />

      <div className="leaderboardContainer">
        <h2>Leaderboard</h2>
        {topResults.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Enrollment</th>
                <th>Branch</th>
                <th>Score</th>
                <th>Quiz Title</th>
              </tr>
            </thead>
            <tbody>
              {topResults.map((result, index) => (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  <td>{result.user.name}</td>
                  <td>{result.user.enrollment}</td>
                  <td>{result.user.branch}</td>
                  <td>{result.score}</td>
                  <td>{result.quiz.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results available.</p>
        )}
      </div>
    </>
  );
}

export default LeaderboardPage;
