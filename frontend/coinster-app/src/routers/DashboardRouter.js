import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppLayout } from "../components";
import { Auth, DashboardHome } from "../screens";
import PrivateRoute from "./PrivateRoutes";

export default function DashboardRouter() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard">
          <DashboardHome />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
