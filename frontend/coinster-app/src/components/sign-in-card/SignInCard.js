import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import MainLogo from "../../assets/logo.png";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { signUpService } from "../../services/authService";
import { Link } from "react-router-dom";

const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [seePassword, setSeePassword] = useState(false);

  const handleSignUp = async () => {
    const response = await signUpService(email, password);
    console.log(response);
  };

  return (
    <div className={`sign-in-card`}>
      <img src={MainLogo} className="logo" />
      <p className="logo-name">Coinster</p>
      <div className="sign-up-form">
        <TextField
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          label="Email"
          color="primary"
        />
        <TextField
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          type="password"
          label="Password"
          color="primary"
          endadornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setSeePassword(!seePassword)}
              >
                {seePassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div className="sign-up-card-actions">
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign In
        </Button>
        or
        <Link to="/sign-up">
          <Button variant="text" color="primary">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInCard;
