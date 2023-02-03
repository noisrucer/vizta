import axios from 'axios'
import {useState, useEffect, useContext, forwardRef} from 'react'
import { UserContext } from '../../UserContext'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Snackbar from "../../components/Snackbar";
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile(){

  const baseURL = 'http://127.0.0.1:8000'
  const {UserToken, UserData} = useContext(UserContext)
  const [userData, setUserData] = UserData
  const [userToken, setUserToken] = UserToken

  console.log("userData in profile: ", userData);

  const [email, setEmail] = useState(" ");
  const [enteredYear, setEnteredYear] = useState(" ");
  const [major, setMajor] = useState(" ");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const validate = () => {
    if (password.length === 0 || confirmPassword.length < 8)
    {
      return false;
    }
    if (!(/[A-Z]/.test(confirmPassword))){
      return false;
    } 
    if (!(/[0-9]/.test(confirmPassword))){
      return false;
    }

    return true;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const closeErrorMessage = () => {
    setOpenErrorMessage(false)
  }

  const [successMessage, setSuccessMessage] = useState("");
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const closeSuccessMessage = () => {
    setOpenSuccessMessage(false)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      axios.request({
        method: 'get',
        url: `${baseURL}/users/profile/${userData}`,
        headers: userToken['headers']
      })
      .then(response => {
        const data = response.data
        console.log(`response from /users/profile/${userData}: `, data)
        setEmail(data.email)
        setEnteredYear(data.entered_year);
        setMajor(data.major)
      })
      .catch(error => {
        console.log("error from /users/profile/email: ", error)
      })
    };
    fetchProfileData();
  },[])

  console.log(major)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log("password in profile: ", data.get('password'));
    console.log("reset password in profile: ", data.get('newPassword'));

    axios.request({
      method: 'patch',
      url: `${baseURL}/users/users/${userData}`,
      data: {
        old_password: data.get('password'),
        new_password: data.get('newPassword')
      },
      headers: userToken['headers']
    })
    .then(response => {
      const data = response.data
      console.log("response from /users/users/email: ", response)
      setSuccessMessage("Password update successful!")
      setOpenSuccessMessage(true)
    })
    .catch(err => {
      console.log("error when submit: ", err)
      setErrorMessage(err.response.data.detail)
      setOpenErrorMessage(true)
    })
  }

  return (
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AccountCircleIcon sx={{fontSize: "120px"}}/>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", marginTop: 1}}
        >
          <Box>
            <TextField
              id="email"
              label="email"
              defaultValue={email}
              value={email}
              InputProps={{
                readOnly: true,
              }}
              sx={{width: "416px", marginBottom: 2}}
            />
          </Box>
          <Box sx={{marginBottom: 2}}>
            <TextField
              id="enteredYear"
              label="Entered Year"
              defaultValue={enteredYear}
              value={enteredYear}
              InputProps={{
                readOnly: true,
              }}
              sx={{width: "200px",  marginRight: 2}}
            />
            <TextField
              id="major"
              label="major"
              defaultValue={major}
              value={major}
              InputProps={{
                readOnly: true,
              }}
              sx={{width: "200px"}}
            />
          </Box>
          <TextField sx={{marginBottom: 2}}
            id="password"
            name="password"
            label="Old password"
            type="password"
            onChange ={(e)=>setPassword(e.target.value)}
          />
          <TextField sx={{marginBottom: 2}}
            id="newPassword"
            name="newPassword"
            label="New password"
            helperText="Minimum 8 characters with at least 1 upper case and 1 number"
            type="password"
            onChange ={(e)=>setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            disabled = {!validate()}
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
          <Alert onClose={closeSuccessMessage} severity="success" sx={{ width: '100%' }}>
            Password Update Successful!
          </Alert>
        </Snackbar>
      </Box>
  )
}

export default Profile