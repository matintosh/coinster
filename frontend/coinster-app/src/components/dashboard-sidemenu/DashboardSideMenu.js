import { Button } from "@material-ui/core";
import React from "react";
import Gravatar from "react-gravatar";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

const DashboardSideMenu = () => {
  return (
    <div className="dashboard-side-menu">
      <div className="user-avatar-container">
        <Gravatar
          email="matiasmartineeez@gmail.com"
          size={100}
          rating="pg"
          default="monsterid"
          className="avatar-image"
        />
        <p className="user-name">Matias</p>
        <p className="user-email">matias@matias.com</p>
      </div>

      <div className="dashboard-navigation">
        <Button className={`navigation-button selected`}>
          <DataUsageOutlinedIcon className="button-icon" />
          Dashboard
        </Button>

        <Button className="navigation-button">
          <MonetizationOnOutlinedIcon className="button-icon" />
          Transferences
        </Button>

        <Button className="navigation-button">
          <AccountBalanceWalletOutlinedIcon className="button-icon" />
          Wallets
        </Button>
        <Button className="navigation-button">
          <SettingsOutlinedIcon className="button-icon" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default DashboardSideMenu;
