import { Fab } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Wallet } from "../../components";
import { CoinsterContext } from "../../context";
import {
  getWalletsService,
} from "../../services/walletService";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Switch, withRouter } from "react-router-dom";
import PrivateRoute from "../../routers/PrivateRoutes";
import CreateNewWallet from "./CreateNewWallet";

const DashboardWallets = ({ history }) => {
  const {
    setLoading,
    wallets,
    setWallets,
    currencyList,
    setCurrencyList,
  } = useContext(CoinsterContext);

  const getWallets = async () => {
    if (!currencyList.length) setLoading(true);

    const response = await getWalletsService();

    if (!response) return setLoading(false);
    if (response?.error) return;
    else {
      setWallets(response.data.wallets);
      setCurrencyList(response.data.currency_data.currency_list);
    }
    setLoading(false);
  };

  const goToList = () => history.push("/dashboard/wallets");
  const getCurrency = (id) => {
    const currency = currencyList.find((c) => c.id === id);
    return currency?.name ?? "Unavailable";
  };

  useEffect(() => {
    getWallets();
  }, []);

  const isCreatingNewWallet =
    window.location.pathname === "/dashboard/wallets/new";

  return (
    <div className="dashboard-wallets">
      <div className="dashboard-wallets-header">
        <p className="dashboard-title">Wallets</p>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() =>
            history.push(
              isCreatingNewWallet
                ? "/dashboard/wallets"
                : "/dashboard/wallets/new"
            )
          }
        >
          {isCreatingNewWallet ? <CloseIcon /> : <AddIcon />}
        </Fab>
      </div>

      <Switch>
        <PrivateRoute path="/dashboard/wallets/new">
          <CreateNewWallet updateData={getWallets} goToList={goToList} />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/wallets">
          <div className="wallets-list">
            {wallets.map((w) => (
              <Wallet
                currency={getCurrency(w.currency)}
                balance={w.balance}
                id={w.public_id}
              />
            ))}
          </div>
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default withRouter(DashboardWallets);
