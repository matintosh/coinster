import React from "react";
import Transference from "./Transference";

const PendingTransferencesCard = () => {
  return (
    <div className="pending-transferences-card">
      <p className="card-title">Transferences</p>

      <div className="transferences-list">
        <Transference />
        <Transference />
        <Transference />
        <Transference />
      </div>
    </div>
  );
};

export default PendingTransferencesCard;
