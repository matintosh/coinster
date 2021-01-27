import React, { useContext, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import MainLogo from "../../assets/logo.png";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { signInService } from "../../services/authService";
import { Link, useHistory } from "react-router-dom";
import { setCurrentUser, setToken } from "../../utils/auth";
import { validateEmail } from "../../utils/validations";
import { CoinsterContext } from "../../context";

const SignInCard = ({ setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [seePassword, setSeePassword] = useState(false);

  let history = useHistory();

  const context = useContext(CoinsterContext);

  const { setLoading } = context;

  const validateInputs = () => {
    const emailField = validateEmail(email);
    const passwordField = password.length > 6;

    if (!emailField) return `Email format is incorrect`;
    if (!passwordField) return `Password should be longer than 6 characters`;
  };

  const handleSignUp = async () => {
    const errors = validateInputs();
    if (errors) return setError(errors);

    setLoading(true);

    const response = await signInService(email, password);

    if (response.error) {
      setError(response.error);
    }

    if (response.data) {
      const { token, user } = response.data;
      setToken(token);
      setCurrentUser(user);

      history.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="sign-up-card">
      <img src={MainLogo} className="logo" alt="logo" />
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
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignInCard;
