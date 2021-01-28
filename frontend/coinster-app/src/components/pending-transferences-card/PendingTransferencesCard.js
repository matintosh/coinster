import React, { useContext, useEffect } from "react";
import { CoinsterContext } from "../../context";
import { getTransferencesService } from "../../services/transferenceService";
import Transference from "./Transference";

const PendingTransferencesCard = () => {
  const {
    setLoading,
    setWallets,
    wallets,
    currencyList,
    setCurrencyList,
    transferences,
    setTransferences,
  } = useContext(CoinsterContext);

  const getTransferences = async () => {
    const response = await getTransferencesService();

    if (response) {
      console.log(response);
      let incoming = response?.data?.incoming_transferences ?? [];
      let outgoing = response?.data?.outgoing_transferences ?? [];

      incoming = incoming.map((t) => ({ ...t, type: "in" }));
      outgoing = outgoing.map((t) => ({ ...t, type: "out" }));

      const transferenceList = [...incoming, ...outgoing].filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );

      setTransferences(transferenceList);
    }
  };
  useEffect(() => {
    getTransferences();
  }, []);
  return (
    <div className="pending-transferences-card">
      <p className="card-title">Transferences</p>

      <div className="transferences-list">
        {transferences.map((t) => (
          <Transference />
        ))}
      </div>
    </div>
  );
};

export default PendingTransferencesCard;
