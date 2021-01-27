import React, { useState } from "react";
import Gravatar from "react-gravatar";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import { getCurrentUser } from "../../utils/auth";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import { Tooltip } from "@material-ui/core";

const Transference = ({
  wallet_from,
  wallet_to,
  amount,
  status,
  outgoing,
  type,
}) => {
  const user = getCurrentUser();

  const [copyFrom, setCopyFrom] = useState(false);
  const [copyTo, setCopyTo] = useState(false);

  const CurrentUserWallet = ({wallet}) => (
    <Tooltip title={!copyFrom ? `Click to copy ${wallet}` : "Copied!"}>
      <div
        className="avatar"
        onClick={() => {
          navigator?.clipboard?.writeText(wallet);
          setCopyFrom(true);
        }}
      >
        <Gravatar
          email={user.email}
          size={100}
          rating="pg"
          default="monsterid"
          className="avatar-image"
        />
        <p className="avatar-name">
          {user.first_name} {user.last_name}
        </p>
      </div>
    </Tooltip>
  );

  const ExternalWallet = ({wallet}) => (
    <Tooltip title={!copyTo ? `Click to copy ${wallet}` : "Copied!"}>
      <div
        className="transference-reciever"
        onClick={() => {
          navigator?.clipboard?.writeText(wallet);
          setCopyTo(true);
        }}
      >
        <AccountBalanceWalletOutlinedIcon />
        <p>{wallet}</p>
      </div>
    </Tooltip>
  );

  console.log(type, wallet_from, wallet_to)
  return (
    <div className="transference">
      {type === "out" ? <CurrentUserWallet wallet={wallet_from}/> : <ExternalWallet wallet={wallet_from}/>}
      <ArrowForwardIosOutlinedIcon className="transference-arrow-icon" />
      {type === "out" ? <ExternalWallet wallet={wallet_to}/> : <CurrentUserWallet wallet={wallet_to}/>}

      <div className="transference-info">
        <LocalAtmOutlinedIcon className="transference-money-icon" />
        <p>${amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Transference;
