import React from "react";
import AppRouter from "./routers";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { CoinsterContextProvider } from "./context";

import "./styles/app.sass";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CoinsterContextProvider>
        <AppRouter />
      </CoinsterContextProvider>
    </ThemeProvider>
  );
}

export default App;
