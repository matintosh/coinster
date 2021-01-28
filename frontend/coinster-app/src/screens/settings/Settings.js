import React, { useEffect, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { CoinsterContext } from "../../context";
import {
  getCurrenciesService,
  newCurrency,
} from "../../services/currencyService";
import { useSnackbar } from "notistack";

const Settings = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setCurrencyList, currencyList, setLoading } = useContext(
    CoinsterContext
  );
  const [currencyName, setCurrencyName] = useState("");
  useEffect(() => {
    getCurrencies();
  }, []);
  const getCurrencies = async () => {
    const response = await getCurrenciesService();

    if (response?.error || !response) return;

    setCurrencyList(response.data.currency_list);
  };

  const createNewCurrency = async () => {

    if(currencyName.length < 1) return enqueueSnackbar('Currency name should be longer than 0 char. ')

    setLoading(true);

    const response = await newCurrency(currencyName);
    if (response?.error || !response) return 

    await getCurrencies();
    setCurrencyName('')
    setLoading(false);
  };

  return (
    <div className="settings">
      <div className="dashboard-settings-header">
        <p className="dashboard-title">Settings</p>
      </div>

      <div>
        <p className="currencies-title">Currencies</p>

        <div className="currency-input">
          <TextField
            color="primary"
            variant="outlined"
            value={currencyName}
            placeholder="Currency"
            onChange={({ target: { value } }) => setCurrencyName(value)}
          ></TextField>
          <Button onClick={createNewCurrency}>Add</Button>
        </div>

        <div className="currency-list">
          {currencyList.map((c) => (
            <div className="currency-item">
              <LocalAtmIcon />
              <p>{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
