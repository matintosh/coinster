import React from "react";
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";

const Wallet = ({ currency, balance, id }) => {
  return (
    <div className="wallet">
      <div className="wallet-currency-info">
        <p className="currency"> {currency} </p>
        <p className="balance"> ${balance} </p>
      </div>
      <p>{id}</p>
      <FindInPageOutlinedIcon className="wallet-icon" />
    </div>
  );
};

export default Wallet;
