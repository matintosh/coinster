import React from "react";
import Gravatar from "react-gravatar";

import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";

const Transference = () => {
  return (
    <div className="transference">
      <div className="avatar">
        <Gravatar
          email="matiasmartineeez@gmail.com"
          size={100}
          rating="pg"
          default="monsterid"
          className="avatar-image"
        />
        <p className="avatar-name">Matias</p>
      </div>
      <div className="transference-info">
        <LocalAtmOutlinedIcon className="transference-money-icon" />
        <p>$500.00</p>
      </div>
    </div>
  );
};

export default Transference;
