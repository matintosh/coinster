import React, { useState, useEffect, useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import { newTransferenceService } from "../../services/transferenceService";
import { CoinsterContext } from "../../context";
import { useSnackbar } from "notistack";

const CreateNewTransference = ({ wallets, goToList, getCurrency, getTransferences }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useContext(CoinsterContext);

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [amount, setAmount] = useState("");

  const [walletTo, setWalletTo] = useState("");

  useEffect(() => {
    if (selectedWallet) {
      const wallet = wallets.find((w) => w.public_id === selectedWallet);
      setSelectedCurrency(wallet.currency);
    }
    // eslint-disable-next-line
  }, [selectedWallet]);

  const handleChangeAmount = (newValue) => {
    if (!isNaN(newValue)) setAmount(newValue);
  };

  const handleCreate = async () => {
    setLoading(true);
    const response = await newTransferenceService(
      selectedWallet,
      walletTo,
      amount,
      selectedCurrency
    );

    if (response?.error) {
      enqueueSnackbar(response.error, { variant: "error" });
      return setLoading(false);
    }

    await getTransferences()
    setLoading(false);
    goToList();
  };
  return (
    <div className="create-new-transference">
      <FormControl className="currency-select">
        <InputLabel id="demo-simple-select-label">Wallet</InputLabel>
        <Select
          placeholder="Select your wallet"
          value={selectedWallet}
          onChange={({ target: { value, currency } }) => {
            setSelectedCurrency(currency);
            setSelectedWallet(value);
          }}
        >
          {wallets.map((w) => (
            <MenuItem value={w.public_id} currency={w.currency}>
              {w.public_id} ($ {w.balance} - {getCurrency(w.currency)})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="wallet-balance"
        placeholder="Destinatary"
        value={walletTo}
        onChange={({ target: { value } }) => setWalletTo(value)}
      ></TextField>
      <TextField
        className="wallet-balance"
        placeholder="Amount"
        value={amount}
        onChange={({ target: { value } }) => handleChangeAmount(value)}
      ></TextField>

      <Button
        color="primary"
        className="create-wallet-button"
        onClick={handleCreate}
      >
        Send transference
      </Button>
    </div>
  );
};

export default CreateNewTransference;
