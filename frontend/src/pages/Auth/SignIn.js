import { useState, useContext } from "react";
import {UserContext} from "../../UserContext"
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
import Snackbar from "../../components/Snackbar";

import Copyright from "./Copyright";
const baseURL = "http://127.0.0.1:8000";
const theme = createTheme();


const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (username.length > 0 && password.length > 7)
    {
      return true;
    } else {
      return false;
    }
  };

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("")
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const {UserData, UserToken, IsLoggedIn} = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;
  const [isLoggedIn, setIsLoggedIn] = IsLoggedIn;


  const handleSetUserData = (e) => {
    setUserData(e);
  }

  const handleSetUserToken = (e) => {
    setUserToken(e);
  }

  const closeErrorMessage = () => {
    setOpenErrorMessage(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    axios.post(`${baseURL}/auth/login`, 
      data
    )
    .then(response => {
        const jwtToken = response.data.access_token;
        const options = {
          "headers": {
            "Authorization": "Bearer " + jwtToken
          }
        }

        handleSetUserData(data);
        handleSetUserToken(options);

        if (response.status === 200){
          axios.request({
            method: 'get',
            url: `${baseURL}/auth/me`,
            headers: options['headers']
          })
          .then(response => {
            console.log("response in Sign In: ",response)
            setIsLoggedIn(true)
          })
          navigate('/main')
        }
    })
    .catch(err => {
        setErrorMessage(err.response.data.detail)
        setOpenErrorMessage(true)

        setUsernameError(true)
        setPasswordError(true)
      })
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
              label="HKU Email Address"
              name="username"
              onChange ={(e)=>setUsername(e.target.value)}
              error = {usernameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange ={(e)=>setPassword(e.target.value)}
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
              disabled = {!validate()}
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
