import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ResetPassword from "./pages/Auth/ResetPassword";
import Main from "./pages/Main/Main";
import { UserProvider } from "./UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
// import RouteError from "./RouteError";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./components/Sidebar/Profile";
import Visualization from "./pages/Visualization/Visualization";
import ReviewCreate from "./pages/ReviewCreate/ReviewCreate";
import { amber, deepOrange, grey } from "@mui/material/colors";

const temp_color = "#1D2630";
// console.log("UC", UserContext);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    background: {
      default: temp_color,
    },
    action: {
      disabled: "lightgrey",
    },
  },
});

const App = () => {
  const { IsLanding } = React.useContext(UserContext);
  const [isLanding, setIsLanding] = IsLanding;

  return (
    // <ThemeProvider theme={darkTheme}>
    // <UserProvider>
    <>
      {isLanding ? <></> : <Sidebar />}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/auth/sign-in" element={<SignIn />}></Route>
        <Route path="/auth/sign-up" element={<SignUp />}></Route>
        <Route path="/auth/reset-password" element={<ResetPassword />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/auth/me"></Route>
          <Route path="/main">
            <Route path=":faculty" element={<Main />}></Route>
          </Route>
          <Route path="/visualization">
            <Route path=":courseId" element={<Visualization />}></Route>
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </>
    // </UserProvider>

    // </ThemeProvider>
  );
};

export default App;
