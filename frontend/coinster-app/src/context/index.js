import React, { createContext, useState } from "react";

export const CoinsterContext = createContext(null);

export const CoinsterContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [transferences, setTransferences] = useState([]);

  const context = {
    loading,
    setLoading,
    wallets,
    setWallets,
    currencyList,
    setCurrencyList,
    transferences,
    setTransferences,
  };

  return (
    <CoinsterContext.Provider value={context}>
      {children}
    </CoinsterContext.Provider>
  );
};
