import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import ScrollToColor from "./ScrollToColor";

export default function ButtonAppBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ display: "flex" }}>
      <ScrollToColor>
        <AppBar
          elevation={0}
          position="fixed"
          sx={{ background: "transparent" }}
        >
          <Toolbar>
            <Button
              variant="primary"
              href="/"
              sx={{ marginRight: "20px", fontSize: "20px" }}
            >
              Vizta
            </Button>
            <Button
              variant="primary"
              href="/auth/sign-in"
              sx={{ marginLeft: "auto", fontSize: "15px" }}
            >
              Log In
            </Button>
            <Button
              variant="primary"
              href="/auth/sign-up"
              sx={{ marginLeft: "10px", fontSize: "15px" }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </ScrollToColor>
    </Box>
  );
}
