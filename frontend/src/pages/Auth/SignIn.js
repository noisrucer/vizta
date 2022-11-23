import { useState } from "react";
import {useNavigate} from 'react-router';
import axios from 'axios';
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
import Main from "../Main/Main";
import Snackbar from "../../components/Snackbar";

import Copyright from "./Copyright";
const baseURL = "https://3631-116-48-242-213.ap.ngrok.io";
const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("")
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const closeErrorMessage = () => {
    setOpenErrorMessage(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setUsernameError(false);
    setPasswordError(false);

    if(data.get("username") === ''){
      setUsernameError(true)
    }

    if (data.get("password") === ''){
      setPasswordError(true)
    }

    if (!(passwordError && usernameError)){
      axios.post(`${baseURL}/auth/login`, data).then(response => {
        const jwtToken = response.data.access_token
        if (response.status === 200)
        {
          // axios.post(`${baseURL}/auth/me`, data).then(response => {
          //   console.log(response)
          // })
          navigate('/main')
        }
      }).catch(err => {
        console.log(err)
        setErrorMessage(err.response.data.detail)
        setOpenErrorMessage(true)
      })
    } else {
      setErrorMessage("Please fill in all the required Input")
      setOpenErrorMessage(true)
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="HKU Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              error = {usernameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error = {passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/verification/#" variant="body2">
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
    </ThemeProvider>
  );
};

export default SignIn;
