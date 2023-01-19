import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../UserContext'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

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

  return (
    <>
      <Stack direction="row" spacing={2} sx={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
        <Avatar 
          {...stringAvatar("Kevin Breinur")} 
          sx={{width: 200, height: 200}}
        />
      </Stack>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="email"
        label="email"
        defaultValue={email}
        value={email}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="enteredYear"
        label="Entered Year"
        defaultValue={enteredYear}
        value = {enteredYear}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="major"
        label="Major"
        defaultValue={major}
        value = {major}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  </>
  )
}

export default Profile