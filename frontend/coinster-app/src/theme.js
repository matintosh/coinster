import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3091c0",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },

    contrastThreshold: 3,

    tonalOffset: 0.2,
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: { 
        borderRadius: 21
    }
  },

  shadows: ["none"],
});

export default theme;
