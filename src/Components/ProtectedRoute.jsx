import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./layout/Profile/Profile";
function ProtectedRoute({ component }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <>
      <Profile user={user} />
      {component}
    </>
  );
}

export default ProtectedRoute;
