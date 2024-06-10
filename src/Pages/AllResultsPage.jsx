import React, { useState, useEffect, useRef } from "react";
import "../styles/allResultPage.css";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

function AllResultsPage() {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { results } = useSelector((state) => state.allResults);

  const [branchFilter, setBranchFilter] = useState("ALL");
  const [quizTitleFilter, setQuizTitleFilter] = useState("ALL");
  const [sortedResults, setSortedResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const branches = [
    "ALL",
    "BCA A",
    "BCA B",
    "BCA AIDA A",
    "BCA AIDA B",
    "BCA AIDA C",
    "BCA AIDA D",
  ];

  // Get unique quiz titles from results
  const quizTitles = results ? ["ALL", ...new Set(results.map((result) => result.quiz.title))] : ["ALL"];

  const handleSort = () => {
    const sorted = [...sortedResults].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
    setSortedResults(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  const handleBranchFilter = (branch) => {
    setBranchFilter(branch);
  };

  const handleQuizTitleFilter = (title) => {
    setQuizTitleFilter(title);
  };

  const downloadPDF = () => {
    if (!tableRef.current) {
      return;
    }

    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("results.pdf");
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (results) {
      const filteredResults = results.filter((result) => {
        const branchMatch = branchFilter === "ALL" || result.user.branch.toUpperCase() === branchFilter;
        const quizTitleMatch = quizTitleFilter === "ALL" || result.quiz.title === quizTitleFilter;
        return branchMatch && quizTitleMatch;
      });

      setSortedResults(filteredResults);
    }
  }, [results, branchFilter, quizTitleFilter, navigate, isAuthenticated]);

  return (
    <div className="allResultContainer">
      <h1>Results</h1>
      <div className="filters">
        <div className="branch-filter">
          <label>Filter by Branch : </label>{" "}
          <select
            value={branchFilter}
            onChange={(e) => handleBranchFilter(e.target.value)}
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        <div className="quiz-title-filter">
          <label>Filter by Quiz Title : </label>{" "}
          <select
            value={quizTitleFilter}
            onChange={(e) => handleQuizTitleFilter(e.target.value)}
          >
            {quizTitles.map((title) => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={downloadPDF}>Download as PDF</button>

      {sortedResults.length > 0 ? (
        <table ref={tableRef} className="results-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Enrollment</th>
              <th>Branch</th>
              <th>
                <button onClick={handleSort}>
                  Score <i className={`fas fa-sort-${sortOrder}`} />
                </button>
              </th>
              <th>Quiz Title</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result) => (
              <tr key={result._id}>
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
  );
}

export default AllResultsPage;
