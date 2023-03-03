// 1. Another verification component with a "textfield" and "verify" button
// 2. Upon successful verification, user is able to click on "signup" button
// 3. Upon successful signup, user is redirected to the main page

import { useState, Fragment, forwardRef, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "../../components/Snackbar";
import Copyright from "./Copyright";
import MenuItem from "@mui/material/MenuItem";

const baseURL = "https://vizta.onrender.com";
// const baseURL = process.env.REACT_APP_BASEURL;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const majors = [
  {
    value: "Computer Science",
    label: "Computer Science",
  },
  {
    value: "Computer Engineering",
    label: "Computer Engineering",
  },
  {
    value: "Information System",
    label: "Information System",
  },
  {
    value: "Other",
    label: "Others..",
  },
];

const SignUp = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [verificationRequested, setVerificationRequested] = useState(false);
  const [verificationConfirmStatus, setVerificationConfirmStatus] =
    useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [checkOnSubmit, setCheckOnSubmit] = useState(false);
  const [clickedSignUpButton, setClickedSignUpButton] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enteredYear, setEnteredYear] = useState("2022-01-01");
  const [major, setMajor] = useState("Computer Science");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    if (!(password.length >= 8)) {
      return false;
    }
    return true;
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log("password", password);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (!/[A-Z]/.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!/[0-9]/.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!(password.length >= 8)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }, [password, confirmPassword]);

  const closeErrorMessage = () => {
    setOpenErrorMessage(false);
  };

  useEffect(() => {
    if (openErrorMessage) {
      const timeoutId = setTimeout(() => {
        setOpenErrorMessage(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [openErrorMessage]);

  function onChangeVerificationCode(evt) {
    evt.preventDefault();
    setVerificationCode(evt.target.value);
  }

  const handleVerification = (event) => {
    event.preventDefault();
    axios
      .post(`${baseURL}/auth/register/verification`, {
        email: email,
      })
      .then((response) => {
        console.log(response.data.verification_token);
        setVerificationToken(response.data.verification_token);
        setVerificationRequested(true);
        setEmailError(false);
      })
      .catch((err) => {
        console.log(err.response.data.detail);
        setErrorMessage(err.response.data.detail);
        setOpenErrorMessage(true);
      });
  };

  function handleConfirmVerification(e) {
    setCheckOnSubmit(false);

    if (verificationCode === verificationToken) {
      setVerificationError(false);
      setVerificationConfirmStatus(true);
      console.log("verify success");
      console.log("check on submit", checkOnSubmit);
      console.log("verification confirm status", verificationConfirmStatus);
      setOpenErrorMessage(true);
    } else {
      setVerificationError(true);
      setErrorMessage("Incorrect Authentication Token!");
      setOpenErrorMessage(true);
      setVerificationConfirmStatus(false);
      console.log("verify fail");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("data in sign up");
    console.log(...data);

    setCheckOnSubmit(true);
    setClickedSignUpButton(true);

    console.log("emailError: ", emailError);
    console.log("passwordError: ", passwordError);
    console.log("confirm password error: ", confirmPasswordError);
    console.log("verification confirm status: ", verificationConfirmStatus);

    if (!passwordError && !confirmPasswordError && verificationConfirmStatus) {
      axios
        .post(`${baseURL}/auth/register`, {
          entered_year: data.get("enteredYear"),
          email: data.get("email"),
          major: data.get("major"),
          password: data.get("password"),
        })
        .then((response) => {
          console.log(response);
          setOpenErrorMessage(false);
          navigate("/auth/sign-in");
        })
        .catch((error) => {
          console.log("error in signup: ", error.response.data.detail);
          setErrorMessage(error.response.data.detail);
          // console.log({errorMessage})
          setOpenErrorMessage(true);
        });
    } else {
      if (passwordError) {
        if (!/[A-Z]/.test(data.get("password"))) {
          setErrorMessage(
            "Password should contain at least 1 Upper and Lower case"
          );
          setPasswordError(true);
          setOpenErrorMessage(true);
        } else if (!/[0-9]/.test(data.get("password"))) {
          setErrorMessage("Password should contain at leat one number");
          setPasswordError(true);
          setOpenErrorMessage(true);
        } else if (!(data.get("password").length >= 8)) {
          setErrorMessage("Password shoule be at least 8 characters long");
          setPasswordError(true);
          setOpenErrorMessage(true);
        } else if (confirmPasswordError) {
          setErrorMessage("Confirm password not same as password!");
          setConfirmPasswordError(true);
          setOpenErrorMessage(true);
        }
      } else if (confirmPasswordError) {
        setErrorMessage("Confirm password not same as password!");
        setOpenErrorMessage(true);
      } else {
        setErrorMessage("Please confirm verification!");
        setOpenErrorMessage(true);
      }
    }
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8.5}>
              <TextField
                required
                fullWidth
                label="HKU Email Address"
                value={email}
                onChange={handleEmailChange}
                name="email"
                autoComplete="true"
                error={emailError && clickedSignUpButton}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                size="medium"
                onClick={handleVerification}
                sx={{ marginTop: 1.1, width: "105px" }}
              >
                Verify
              </Button>
            </Grid>
            {verificationRequested && (
              <Fragment>
                <Grid item xs={12} sm={8.5}>
                  <TextField
                    required
                    fullWidth
                    label="enter verification code here..."
                    name="verification_code"
                    value={verificationCode}
                    onChange={onChangeVerificationCode}
                    error={verificationError && clickedSignUpButton}
                  />
                </Grid>

                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleConfirmVerification}
                    sx={{ marginTop: 1.1, width: "105px" }}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Fragment>
            )}
            <Grid item xs={13} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label="Year of Admission"
                  value={enteredYear}
                  minDate={new Date("2012-03-01")}
                  maxDate={new Date().toISOString().slice(0, 10)}
                  onChange={(evt) => {
                    console.log("evt[$y]: ", evt["$y"]);
                    const reformatted_year = `${evt["$y"]}-01-01`;
                    setEnteredYear(reformatted_year);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      helperText={null}
                      value={enteredYear}
                      name="enteredYear"
                      type="enteredYear"
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={13} sm={6}>
              <TextField
                select
                required
                label="Select Major"
                name="major"
                type="major"
                value={major}
                onChange={handleMajorChange}
                sx={{ width: "190px" }}
              >
                {majors.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                helperText="Minimum 8 characters with at least 1 upper case and 1 number"
                error={passwordError && clickedSignUpButton}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                error={confirmPasswordError && clickedSignUpButton}
                onChange={handleConfirmPasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validate()}
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
        {verificationConfirmStatus && !checkOnSubmit && (
          <Alert
            onClose={closeErrorMessage}
            severity="success"
            sx={{ width: "100%" }}
          >
            Verify Success!
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default SignUp;
