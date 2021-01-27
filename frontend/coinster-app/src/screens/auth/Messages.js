import React from "react";

export const WellcomeMessage = () => {
  return (
    <div className="sign-up-title">
      <h1 className="big-title">Hello!</h1>
      <h2 className="subtitle">Welcome to your next transference manager </h2>
    </div>
  );
};
export const ErrorMessage = ({message}) => {
  return (
    <div className="sign-up-title error">
      <h1 className="big-title">Error!</h1>
      <h2 className="subtitle">{message}</h2>
    </div>
  );
};
