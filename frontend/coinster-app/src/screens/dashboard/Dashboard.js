import React from "react";
import { AppHeader, DashboardSideMenu } from "../../components";
import DashboardRouter from "../../routers/DashboardRouter";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <AppHeader />
      <div className="sidemenu-content-container">
        <DashboardSideMenu />
        <div>
          <DashboardRouter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
