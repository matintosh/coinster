import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  DashboardHome,
  DashboardTransferences,
  DashboardWallets,
  Settings,
} from "../screens";
import PrivateRoute from "./PrivateRoutes";

export default function DashboardRouter() {
  return (
    <Switch>
      <PrivateRoute path="/dashboard/wallets">
        <DashboardWallets />
      </PrivateRoute>
      <PrivateRoute path="/dashboard/transferences">
        <DashboardTransferences />
      </PrivateRoute>
      <PrivateRoute path="/dashboard/settings">
        <Settings />
      </PrivateRoute>
      <PrivateRoute path="/dashboard">
        <DashboardHome />
      </PrivateRoute>
    </Switch>
  );
}
