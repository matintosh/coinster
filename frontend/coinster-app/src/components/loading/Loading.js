import React from "react";
const { CircularProgress } = require("@material-ui/core");

const Loading = () => {
  return (
    <div className="loading-overlay">
      <CircularProgress color="primary"></CircularProgress>
    </div>
  );
};

export default Loading;
