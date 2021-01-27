import React, { useContext, useEffect, useState } from "react";
import { Wallet } from "../../components";
import { CoinsterContext } from "../../context";
import { getWalletsService } from "../../services/walletService";

const DashboardWallets = () => {
  const { setLoading, wallets, setWallets, currencyList, setCurrencyList } = useContext(CoinsterContext);

  const getWallets = async () => {
    if(!currencyList.length)
        setLoading(true);

    const response = await getWalletsService();

    if (!response) return setLoading(false)
    if (response?.error) return;

    else {
      setWallets(response.data.wallets);
      setCurrencyList(response.data.currency_data.currency_list);
    }
    setLoading(false);
  };

  const getCurrency = (id) => {
    const currency = currencyList.find((c) => c.id === id);
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
