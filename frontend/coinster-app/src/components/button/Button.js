import React from "react";
import Button from "@material-ui/core/Button";

export default function UPButton({
  disabled = false,
  label = "",
  onClick,
  color = "",
  fullWidth = null,
}) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      disabled={disabled}
      className={`button ${disabled ? "disabled" : ""} ${color}  ${
        fullWidth ? "full-width" : ""
      }`}
    >
      {label}
    </Button>
  );
}
