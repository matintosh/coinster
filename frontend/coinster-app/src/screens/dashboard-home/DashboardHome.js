import React, { useContext } from "react";
import { PendingTransferencesCard } from "../../components";
import { CoinsterContext } from "../../context";
import { getCurrentUser } from "../../utils/auth";

const DashboardHome = () => {
  const { transferences } = useContext(CoinsterContext);
  const user = getCurrentUser();
  const { first_name } = user;
  return (
    <div className="dashboard-home">
      <div className="dashboard-welcome">
        <p className="dashboard-title">Hello {first_name},</p>
        <p className="dashboard-transferences-counter">
          How's your day going?
          <br /> you have <span>{transferences?.length ?? ''}</span> transferences.
        </p>
      </div>

      <div className="featured-dashboards">
        <PendingTransferencesCard />
      </div>
    </div>
  );
};

export default DashboardHome;
