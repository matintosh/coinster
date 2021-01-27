import React, { useContext, useEffect, useState } from "react";
import { Wallet } from "../../components";
import { CoinsterContext } from "../../context";
import { getWalletsService } from "../../services/walletService";

const DashboardWallets = () => {
  const { setLoading } = useContext(CoinsterContext);

  const [wallets, setWallets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const getWallets = async () => {
    setLoading(true);
    const response = await getWalletsService();

    if (response.error) return;
    else {
      console.log(response);
      setWallets(response.data.wallets);
      setCurrencyList(response.data.currency_data.currency_list);
    }
    setLoading(false);
  };

  const getCurrency = (id) => {
    const currency = currencyList.find((c) => c.id === id);
    console.log(currency);
    return currency?.name ?? "Unavailable"
  };

  useEffect(() => {
    getWallets();
  }, []);
  return (
    <div className="dashboard-wallets">
      <p className="dashboard-title">Wallets</p>

      <div className="wallets-list">
        {wallets.map((w) => (
          <Wallet
            currency={getCurrency(w.currency)}
            balance={w.balance}
            id={w.public_id}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardWallets;
