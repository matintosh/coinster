import React from "react";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const Wallet = ({ currency, balance, id, onDelete }) => {
  return (
    <div className="wallet">
      <div className="wallet-currency-info">
        <p className="currency"> {currency} </p>
        <p className="balance"> ${balance} </p>
      </div>
      <p>{id}</p>
      <DeleteForeverOutlinedIcon
        className="wallet-icon"
        onClick={() => onDelete(id)}
      />
    </div>
  );
};

export default Wallet;
