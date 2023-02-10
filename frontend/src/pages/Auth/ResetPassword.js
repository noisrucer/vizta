import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "../../components/Snackbar";

import Copyright from "./Copyright";
const baseURL = "https://vizta.onrender.com";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [usernameError, setUsernameError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const closeErrorMessage = () => {
    setOpenErrorMessage(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("email: ", data.get("username"));

    axios
      .request({
        method: "POST",
        url: `${baseURL}/auth/reset-password/email/${data.get("username")}`,
        email: data.get("username"),
      })
      .then((response) => {
        console.log("reset password: ", response);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="HKU Email Address"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Code
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar
        open={openErrorMessage}
        closeFunc={closeErrorMessage}
        message={errorMessage}
      />
    </Container>
  );
};

export default ResetPassword;
