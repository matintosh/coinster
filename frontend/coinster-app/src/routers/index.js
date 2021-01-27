import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppLayout } from "../components";
import { Auth, Dashboard } from "../screens";
import PrivateRoute from "./PrivateRoutes";

export default function AppRouter() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/sign-up">
            <Auth signUp={true} />
          </Route>
          <Route path="/sign-in">
            <Auth signIn={true} />
          </Route>
          <Route path="/">
            <Auth signUp={true} />
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
}
