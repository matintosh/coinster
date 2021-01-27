import { CircularProgress } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SignUpCard, SignInCard } from "../../components";
import { CoinsterContext } from "../../context";
import { ErrorMessage, WellcomeMessage } from "./Messages";

const Message = ({ error }) =>
  error ? <ErrorMessage message={error} /> : <WellcomeMessage />;

const Auth = ({ signIn = false, signUp = false }) => {
  const [error, setError] = useState(null);
  const context = useContext(CoinsterContext);
  const { loading } = context;
  return (
    <div className="sign-up-page">
      <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
        <path
          d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
          style={{ stroke: "none", fill: "#3091c060" }}
        ></path>
      </svg>
      <Message error={error} />

      {signIn && <SignInCard setError={setError} />}
      {signUp && <SignUpCard setError={setError} />}
    </div>
  );
};

export default Auth;
