import React from "react";
// import {Route, Routes} from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "17ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const TopNavBar = () => {

  return (
    <React.Fragment>
      <AppBar sx={{background: "#000000", opacity:0.8}}>
        <Toolbar>
          <Button variant="primary" href="/">
            <Typography variant="h6" >
              HKUviz
            </Typography>
          </Button>
          <Button sx={{marginLeft: "100px"}} onClick={()=>Sidebar.setOpenDrawer(!Sidebar.open)}>
            <MenuIcon> </MenuIcon>
          </Button>
          <Search>
             <SearchIconWrapper>
               <SearchIcon />
             </SearchIconWrapper>
            <StyledInputBase
              sx={{marginRight: 'auto'}}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Button variant="primary" href="/auth/sign-in" sx={{marginLeft: 'auto'}}>Log In</Button>
          <Button variant="primary" href="/auth/sign-up" sx={{marginLeft: "10px"}}>Sign Up</Button>
        </Toolbar>
        <Sidebar/>
      </AppBar>
    </React.Fragment>
  );
};

export default TopNavBar;
