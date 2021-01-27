import React, { useContext, useState } from "react";
import { CoinsterContext } from "../../context";
import { newWalletService } from "../../services/walletService";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const CreateNewWallet = ({ updateData, goToList }) => {
  const { currencyList, setLoading } = useContext(CoinsterContext);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedBalance, setSelectedBalance] = useState("");

  const handleChangeBalance = (newValue) => {
    if (!isNaN(newValue)) setSelectedBalance(newValue);
  };

  const handleCreate = async () => {
    setLoading(true);
    const response = await newWalletService(
      selectedCurrency,
      selectedBalance
    );

    await updateData();
    goToList();
    setLoading(false);
  };
  return (
    <div className="wallets-new">
      <FormControl className="currency-select">
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          placeholder="Select currency"
          value={selectedCurrency}
          onChange={({ target: { value } }) => setSelectedCurrency(value)}
        >
          {currencyList.map((c) => (
            <MenuItem value={c.id}>{c.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="wallet-balance"
        placeholder="Initial balance ( for testing purposes )"
        value={selectedBalance}
        onChange={({ target: { value } }) => handleChangeBalance(value)}
      ></TextField>

      <Button
        color="primary"
        className="create-wallet-button"
        onClick={handleCreate}
      >
        Create new wallet
      </Button>
    </div>
  );
};

export default CreateNewWallet;
