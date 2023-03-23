import axios from "axios";
import { useState, useEffect, useContext, forwardRef } from "react";
import { UserContext } from "../../UserContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Snackbar from "../../components/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile() {
  const baseURL = process.env.REACT_APP_BASEURL;
  const { UserToken, UserData } = useContext(UserContext);
  const [userData, setUserData] = UserData;
  const [userToken, setUserToken] = UserToken;

  const [email, setEmail] = useState(" ");
  const [enteredYear, setEnteredYear] = useState(" ");
  const [major, setMajor] = useState(" ");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validate = () => {
    if (password.length === 0 || confirmPassword.length < 8) {
      return false;
    }
    if (!/[A-Z]/.test(confirmPassword)) {
      return false;
    }
    if (!/[0-9]/.test(confirmPassword)) {
      return false;
    }

    return true;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const closeErrorMessage = () => {
    setOpenErrorMessage(false);
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const closeSuccessMessage = () => {
    setOpenSuccessMessage(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/users/profile/${userData}`,
          headers: userToken["headers"],
        })
        .then((response) => {
          const data = response.data;
          console.log(`response from /users/profile/${userData}: `, data);
          setEmail(data.email);
          setEnteredYear(data.entered_year);
          setMajor(data.major);
        })
        .catch((error) => {
          console.log("error from /users/profile/email: ", error);
        });
    };
    fetchProfileData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .request({
        method: "patch",
        url: `${baseURL}/users/users/${userData}`,
        data: {
          old_password: data.get("password"),
          new_password: data.get("newPassword"),
        },
        headers: userToken["headers"],
      })
      .then((response) => {
        const data = response.data;
        console.log("response from /users/users/email: ", response);
        setSuccessMessage("Password update successful!");
        setOpenSuccessMessage(true);
      })
      .catch((err) => {
        console.log("error when submit: ", err);
        setErrorMessage(err.response.data.detail);
        setOpenErrorMessage(true);
      });
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <AccountCircleIcon sx={{ fontSize: { xs: "90px", md: "120px" } }} />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <TextField
          id="email"
          label="email"
          fullWidth
          defaultValue={email}
          value={email}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            marginBottom: 2,
            "& label.Mui-focused": {
              color: `${colors.greenAccent[500]}`,
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${colors.greenAccent[500]}`,
              },
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "row" },
            marginBottom: 2,
          }}
        >
          <TextField
            id="enteredYear"
            label="Entered Year"
            fullWidth
            defaultValue={enteredYear}
            value={enteredYear}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              //marginBottom: { xs: 2, md: "0" },
              marginRight: 2,
              "& label.Mui-focused": {
                color: `${colors.greenAccent[500]}`,
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: `${colors.greenAccent[500]}`,
                },
              },
            }}
          />
          <TextField
            id="major"
            label="major"
            fullWidth
            defaultValue={major}
            value={major}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              "& label.Mui-focused": {
                color: `${colors.greenAccent[500]}`,
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: `${colors.greenAccent[500]}`,
                },
              },
            }}
          />
        </Box>
        <TextField
          fullWidth
          sx={{
            marginBottom: 2,
            "& label.Mui-focused": {
              color: `${colors.greenAccent[500]}`,
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${colors.greenAccent[500]}`,
              },
            },
          }}
          id="password"
          name="password"
          label="Old password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          sx={{
            marginBottom: 2,
            "& label.Mui-focused": {
              color: `${colors.greenAccent[500]}`,
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${colors.greenAccent[500]}`,
              },
            },
          }}
          id="newPassword"
          name="newPassword"
          label="New password"
          helperText="Minimum 8 characters with at least 1 upper case and 1 number"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            bgcolor: `${colors.greenAccent[500]}`,
            ":hover": {
              bgcolor: `${colors.greenAccent[600]}`,
            },
          }}
          disabled={!validate()}
        >
          Reset Password
        </Button>
      </Box>
      <Snackbar
        open={openErrorMessage}
        closeFunc={closeErrorMessage}
        message={errorMessage}
      />
      <Snackbar
        open={openSuccessMessage}
        closeFunc={closeSuccessMessage}
        message={successMessage}
      >
        <Alert
          onClose={closeSuccessMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Password Update Successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Profile;
