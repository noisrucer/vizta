import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../UserContext'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Profile(){

  const baseURL = 'http://127.0.0.1:8000'
  const {UserToken, UserData} = useContext(UserContext)
  const [userData, setUserData] = UserData
  const [userToken, setUserToken] = UserToken

  console.log("userData in profile: ", userData);

  const [email, setEmail] = useState(" ");
  const [enteredYear, setEnteredYear] = useState(" ");
  const [major, setMajor] = useState(" ");

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
      console.log("response from /users/users/email: ", data)
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
            label="Password"
          />
          <TextField sx={{marginBottom: 2}}
            id="newPassword"
            name="newPassword"
            label="Reset Password"
          />
          <Button
            type="submit"
            variant="contained"
          >
            Reset Password
          </Button>
        </Box>
      </Box>
  )
}

export default Profile