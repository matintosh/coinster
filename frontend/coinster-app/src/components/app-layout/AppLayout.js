import React, { useContext } from "react";
import { Loading } from "..";
import { CoinsterContext } from "../../context";

const AppLayout = ({ children }) => {
  const context = useContext(CoinsterContext);
  const { loading } = context;

  return (
    <div className="app-layout">
      {loading && <Loading /> }
      <div className="app-layout-container">{children}</div>
    </div>
  );
};

export default AppLayout;
