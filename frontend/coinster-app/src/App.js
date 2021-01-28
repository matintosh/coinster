import React from "react";
import AppRouter from "./routers";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { CoinsterContextProvider } from "./context";
import { SnackbarProvider } from "notistack";

import "./styles/app.sass";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CoinsterContextProvider>
        <SnackbarProvider maxSnack={3}>
          <AppRouter />
        </SnackbarProvider>
      </CoinsterContextProvider>
    </ThemeProvider>
  );
}

export default App;
