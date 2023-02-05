import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserProvider } from "./UserContext";
import { amber, deepOrange, grey } from "@mui/material/colors";

import "./index.css";

const temp_color = "#1D2630";
// console.log("UC", UserContext);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    background: {
      default: temp_color,
    },
    action: {
      disabled: "lightgrey",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
          <App />
        </SnackbarProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
);
