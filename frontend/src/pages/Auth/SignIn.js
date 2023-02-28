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
// const baseURL = "https://vizta.onrender.com";
console.log(process.env.REACT_APP_BASEURL)
const baseURL = process.env.REACT_APP_BASEURL;

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (username.length > 0 && password.length > 7) {
      return true;
    } else {
      return false;
    }
  };

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const { UserData, UserToken } = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;

  const handleSetUserData = (e) => {
    setUserData(e);
  };

  const handleSetUserToken = (e) => {
    setUserToken(e);
  };

  const closeErrorMessage = () => {
    setOpenErrorMessage(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post(`${baseURL}/auth/login`, data)
      .then((response) => {
        const jwtToken = response.data.access_token;
        const options = {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        };

        handleSetUserData(data.get("username"));
        handleSetUserToken(options);

        if (response.status === 200) {
          axios
            .request({
              method: "get",
              url: `${baseURL}/auth/me`,
              headers: options["headers"],
            })
            .then((response) => {
              console.log("response in Sign In: ", response);
            });
          navigate("/main/All");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.detail);
        setOpenErrorMessage(true);

        setUsernameError(true);
        setPasswordError(true);
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
          Log in
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validate()}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/reset-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
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

export default SignIn;
