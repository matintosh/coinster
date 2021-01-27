import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../utils/auth";

function PrivateRoute({ children, ...rest }) {
  let auth = getToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
