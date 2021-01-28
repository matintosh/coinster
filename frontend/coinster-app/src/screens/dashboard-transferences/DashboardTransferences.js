import {
  Button,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CoinsterContext } from "../../context";
import { getWalletsService } from "../../services/walletService";
import { getTransferencesService } from "../../services/transferenceService";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Switch, withRouter } from "react-router-dom";
import PrivateRoute from "../../routers/PrivateRoutes";
import CreateNewTransference from "./CreateNewTransference";
import { Transference } from "../../components";


const DashboardTransferences = ({ history }) => {
  const {
    setLoading,
    setWallets,
    wallets,
    currencyList,
    setCurrencyList,
    transferences,
    setTransferences,
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

  const getTransferences = async () => {
    const response = await getTransferencesService();

    if (response) {
        console.log(response)
        let incoming = response?.data?.incoming_transferences ?? []
        let outgoing = response?.data?.outgoing_transferences ?? []

        incoming = incoming.map( t => ({...t, type: 'in'}))
        outgoing = outgoing.map( t => ({...t, type: 'out'}))

        const transferenceList = [...incoming, ...outgoing].filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)

      setTransferences(transferenceList);
    }
  };
  const goToList = () => history.push("/dashboard/transferences");

  useEffect(() => {
    getWallets();
    getTransferences();
  }, []);

  const getCurrency = (id) => {
    const currency = currencyList.find((c) => c.id === id);
    return currency?.name ?? "Unavailable";
  };

  const isCreatingNewTransference =
    window.location.pathname === "/dashboard/transferences/new";

  return (
    <div className="dashboard-transferences">
      <div className="dashboard-transferences-header">
        <p className="dashboard-title">Transferences</p>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() =>
            history.push(
              isCreatingNewTransference
                ? "/dashboard/transferences"
                : "/dashboard/transferences/new"
            )
          }
        >
          {isCreatingNewTransference ? <CloseIcon /> : <AddIcon />}
        </Fab>
      </div>

      <Switch>
        <PrivateRoute path="/dashboard/transferences/new">
          <CreateNewTransference wallets={wallets} goToList={goToList} getCurrency={getCurrency} getTransferences={getTransferences}/>
        </PrivateRoute>
        <PrivateRoute path="/dashboard/transferences">
          <div className="transferences-list">
            {transferences.map((t) => <Transference {...t} />)}
          </div>
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default withRouter(DashboardTransferences);
