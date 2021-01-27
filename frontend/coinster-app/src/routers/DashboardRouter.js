import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { DashboardHome, DashboardWallets } from "../screens";
import PrivateRoute from "./PrivateRoutes";

export default function DashboardRouter() {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard/wallets">
        <DashboardWallets />
      </PrivateRoute>
      <PrivateRoute path="/dashboard">
        <DashboardHome />
      </PrivateRoute>
    </Switch>
  );
}
