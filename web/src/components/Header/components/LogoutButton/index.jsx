import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.setItem("token", "");
  };

  return (
    <Link to="/login" onClick={handleLogout} style={{ textDecoration: "none", color: "white" }}>
      <ExitToAppIcon />
    </Link>
  );
};

export default LogoutButton;