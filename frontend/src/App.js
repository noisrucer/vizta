import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Main from "./pages/Main/Main";
import { UserProvider } from "./UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
// import RouteError from "./RouteError";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./components/Sidebar/Profile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // secondary: {
    //   // main: "#dd0000",
    // }
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/auth/sign-in" element={<SignIn />}></Route>
          <Route path="/auth/sign-up" element={<SignUp />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/auth/me"></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </UserProvider>
      {/* <RouteError /> */}
    </ThemeProvider>
  );
};

export default App;
