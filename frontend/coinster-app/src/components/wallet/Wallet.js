import { Tooltip } from "@material-ui/core";
import React, { useState } from "react";

const Wallet = ({ currency, balance, id }) => {
  const [copy, setCopy] = useState();
  return (
    <div className="wallet">
      <div className="wallet-currency-info">
        <p className="currency"> {currency} </p>
        <p className="balance"> ${balance} </p>
      </div>
      <Tooltip title={!copy ? `Click to copy ${id}` : "Copied!"}>
        <p
          className="wallet-id"
          onClick={() => {
            navigator?.clipboard?.writeText(id);
            setCopy(true);
          }}
        >
          {id}
        </p>
      </Tooltip>
    </div>
  );
};

export default Wallet;
