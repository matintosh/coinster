import React from "react";
import { AppHeader, DashboardSideMenu } from "../../components";
import DashboardRouter from "../../routers/DashboardRouter";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <AppHeader />
      <div className="sidemenu-content-container">
        <DashboardSideMenu />
        <div className="dashboard-router-container">
          <DashboardRouter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
