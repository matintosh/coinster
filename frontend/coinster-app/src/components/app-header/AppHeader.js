import { Button } from "@material-ui/core";
import React from "react";
import MainLogo from "../../assets/logo.png";
import { logout } from "../../services/authService";

const AppHeader = () => {
  return (
    <div className="app-header">
      <div className="app-brand">
        <img src={MainLogo} alt="logo" className="app-logo" />
        <p className="app-name"> Coinster </p>
      </div>
      <div className="header-actions">
            <Button variant="outlined" onClick={logout}>Log out</Button>
      </div>
    </div>
  );
};

export default AppHeader;
