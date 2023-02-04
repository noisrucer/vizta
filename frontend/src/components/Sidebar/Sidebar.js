import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button } from "@mui/material";
import {UserContext} from "../../UserContext"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: 'none',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [facultyOpen, setFacultyOpen] = React.useState(false);

  const {IsLoggedIn, UserToken} = React.useContext(UserContext)
  const [userToken, setUserToken] = UserToken
  const [isLoggedIn, setIsLoggedIn] = IsLoggedIn

  const navigate = useNavigate();

  console.log("usertoken: ", userToken)
  
  const handleLogoutClick = () => {
    setUserToken({...userToken, headers: ""})
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{background: "#1D2630", opacity: 0.8}}>
        <Toolbar>
          <Button variant="primary" href="/" sx={{ marginRight: "20px"}}>Vizta</Button>
          {
            isLoggedIn ? 
            <>
              <Button variant="primary" href="/" sx={{position: "absolute", right: 300}}>Home</Button>
              <Button variant="primary" href="/main/All" sx={{position: "absolute", right: 220}}>Main</Button>
              <Button variant="primary" href="/profile" sx={{position: "absolute", right: 120}}>Profile</Button>
              <Button variant="primary" href="/" sx={{ position: "absolute", right: 20 }} onClick={handleLogoutClick}>Logout</Button>
            </> : 
            <>
              <Button variant="primary" href="/auth/sign-in" sx={{marginLeft: 'auto'}}>Log In</Button>
              <Button variant="primary" href="/auth/sign-up" sx={{marginLeft: "10px"}}>Sign Up</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}