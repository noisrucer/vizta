// 1. Another verification component with a "textfield" and "verify" button
// 2. Upon successful verification, user is able to click on "signup" button
// 3. Upon successful signup, user is redirected to the main page

import { useState, useRef, Fragment, forwardRef } from "react";
import {useNavigate} from 'react-router';

import axios from 'axios';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormControl } from "@mui/material/FormControl";
import MuiAlert from '@mui/material/Alert';

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Snackbar from "../../components/Snackbar";

import Copyright from "./Copyright";

const baseURL = "https://3631-116-48-242-213.ap.ngrok.io";

const theme = createTheme(); // customize theme here

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
  const navigate = useNavigate();

  const [enteredYearError, setEnteredYearError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationToken, setVerificationToken] = useState(""); 
  const [verificationRequested, setVerificationRequested] = useState(false);
  const [verificationConfirmStatus, setVerificationConfirmStatus] = useState(false);

  const [enteredYear, setEnteredYear] = useState('2022-01-01');

  const emailOnChangeHandler = (evt) => {
    setEmail(evt.target.value);
  }
  function onChangeVerificationCode (evt) {
    evt.preventDefault();
    setVerificationCode(evt.target.value)
    console.log(evt.target.value);
  }

  function handleConfirmVerification (e) {
    if (verificationCode === verificationToken) {
      setVerificationError(false)
      setErrorMessage("Verify Success!")
      setOpenErrorMessage(true)
      setVerificationConfirmStatus(true)
      console.log("verify success")
    } else {
      setVerificationError(true)
      setErrorMessage("Incorrect Authentication Token!")
      setOpenErrorMessage(true)
      setVerificationConfirmStatus(false)
      console.log("verify fail")
    }
  }
  
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const closeErrorMessage = () => {
    setOpenErrorMessage(false)
  }

  const handleVerification = (event) => {
    event.preventDefault();
    console.log(event)
    // const data = new FormData(event.currentTarget);
    // console.log(data.get("verification"))
    axios.post(`${baseURL}/auth/register/verification`, {
      email: email
      // verification_code: data.get("verification")
    })
    .then(response => {
      console.log(response.data.verification_token)
      setVerificationToken(response.data.verification_token)
      setVerificationRequested(true)
      // setErrorMessage("Verification Confirmed!")
      // setOpenErrorMessage(true)
    })
    .catch(err => {
      console.log(err)
      console.log(err.response.data.detail)
      setErrorMessage(err.response.data.detail)
      setOpenErrorMessage(true)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(...data)

    setEnteredYearError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)

    if (data.get("enteredYear") === ''){
      setEnteredYearError(true)
    }
    if (data.get("email") === ''){
      setEmailError(true)
    }
    if (data.get("password") === ''){
      setPasswordError(true)
    }
    if (data.get("password") !== data.get("confirmPassword") || data.get("confirmPassword") === ''){
      setConfirmPasswordError(true)
    }

    console.log("FLAG")
    console.log(data.get('enteredYear'))
    if (!(passwordError && confirmPasswordError) && verificationConfirmStatus)
    {
      axios.post(`${baseURL}/auth/register`, {
        enteredYear: data.get("enteredYear"),
        email: data.get("email"),
        password: data.get("password")
      })
      .then(response => {
        console.log(response)
        navigate('/auth/sign-in');
      })
      .catch(error => {
        console.log(error)
        // console.log(error.code)
        // console.log(error.response.status)
        console.log(error.response.data.detail)
        setErrorMessage(error.response.data.detail)
        console.log({errorMessage})
        setOpenErrorMessage(true)
      })
    } else {
      setErrorMessage("Please fill in all the required fields and confirm verification!")
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8.5}>
                  <TextField
                    required
                    fullWidth
                    label="HKU Email Address"
                    value={email}
                    onChange={emailOnChangeHandler}
                    name="email"
                    autoComplete = "true"
                    error = {emailError}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant = "contained"
                    size = "large"
                    onClick = {handleVerification}
                  >
                    Verify
                  </Button>
                </Grid>
                { verificationRequested && <Fragment>
                <Grid item xs={12} sm={8.5}>
                  <TextField
                    required
                    fullWidth
                    label="enter verification code here..."
                    name="verification_code"
                    value={verificationCode}
                    onChange={onChangeVerificationCode}
                    // autoComplete
                    error = {verificationError}
                  />
                </Grid>
                
                <Grid item xs={1}>
                  <Button
                    variant = "contained"
                    size = "large"
                    onClick = {handleConfirmVerification}
                  >
                    Confirm
                  </Button>
                </Grid>
                </Fragment>
                }
              <Grid item xs={12}>
                {/* <TextField
                  autoComplete="given-name"
                  name="enteredYear"
                  required
                  fullWidth
                  label="Year of admission"
                  autoFocus
                  error = {enteredYearError}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year"]}
                    label="Year of Admission"
                    value = {enteredYear}
                    minDate={new Date('2012-03-01')}
                    maxDate={new Date().toISOString().slice(0,10)}
                    onChange={(evt) => {
                      console.log("evt[$y]: ", evt['$y'])
                      const reformatted_year = `${evt['$y']}-01-01`
                      setEnteredYear(reformatted_year);
                    }}
                    renderInput={(params) => 
                    <TextField 
                      {...params} 
                      fullWidth 
                      helperText={null} 
                      value = {enteredYear}
                      name = "enteredYear"
                      type = "enteredYear"
                      required
                      
                    />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error = {passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  error = {confirmPasswordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // href="/auth/verification"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Snackbar
          open={openErrorMessage}
          closeFunc={closeErrorMessage}
          message={errorMessage}
        >
          {
            verificationConfirmStatus && 
            <Alert onClose={closeErrorMessage} severity="success" sx={{ width: '100%' }}>
              Verify Success!
            </Alert>
          }
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
