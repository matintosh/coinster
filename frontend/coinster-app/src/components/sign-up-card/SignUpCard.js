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
import { signUpService } from "../../services/authService";
import { Link, useHistory } from "react-router-dom";
import { setToken } from "../../utils/auth";
import { validateEmail } from "../../utils/validations";
import { CoinsterContext } from "../../context";

const SignUpCard = ({ setError }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [seePassword, setSeePassword] = useState(false);

  let history = useHistory();

  const context = useContext(CoinsterContext);

  const { setLoading } = context;

  const validateInputs = () => {
    const nameField = firstName.length > 2 && lastName.length > 2;
    const emailField = validateEmail(email);
    const passwordField = password.length > 6;

    if (!nameField)
      return `First name and Last name should be longer than ${firstName.length} characters`;
    if (!emailField) return `Email format is incorrect`;
    if (!passwordField) return `Password should be longer than 6 characters`;
  };

  const handleSignUp = async () => {
    const errors = validateInputs();
    if (errors) return setError(errors);

    setLoading(true)

    const response = await signUpService(firstName, lastName, email, password);

    if (response.error) {
      setError(response.error);
    }

    if (response.data) {
      const { token } = response.data;
      setToken(token);

      history.push("/dashboard");
    }

    setLoading(false)
  };

  return (
    <div className="sign-up-card">
      <img src={MainLogo} className="logo" alt="logo" />
      <p className="logo-name">Coinster</p>
      <div className="sign-up-form">
        <div className="sign-up-full-name-container">
          <TextField
            value={firstName}
            onChange={({ target: { value } }) => setFirstName(value)}
            label="First name"
            color="primary"
          />
          <TextField
            value={lastName}
            onChange={({ target: { value } }) => setLastName(value)}
            label="Last name"
            color="primary"
          />
        </div>
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
          Sign Up
        </Button>
        or
        <Link to="/sign-in">
          <Button variant="text" color="primary">
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpCard;
