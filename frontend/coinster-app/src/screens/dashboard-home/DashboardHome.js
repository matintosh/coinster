import React from "react";
import { PendingTransferencesCard } from "../../components";

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="dashboard-welcome">
        <p className="dashboard-title">Hello Matias,</p>
        <p className="dashboard-transferences-counter">
          How's your day going?
          <br /> you have <span>4</span> new transferences.
        </p>
      </div>

      <div className="featured-dashboards">
        <PendingTransferencesCard />
      </div>
    </div>
  );
};

export default DashboardHome;
