import React from "react";
import { UserContext } from "./UserContext";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, Outlet } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import { MyProSidebarProvider } from "./pages/global/sidebarContext";
import Navbar from "./pages/global/Navbar";
import Home from "./pages/index";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ResetPassword from "./pages/Auth/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./pages/Auth/Profile";
import Search from "./pages/Search/Search";
import Visualization from "./pages/Visualization/Visualization";
import Review from "./pages/Review/Review";
import Favorites from "./pages/Favorites/Favorites";
const Layout = () => (
  <MyProSidebarProvider>
    <div className="app">
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  </MyProSidebarProvider>
);

function App() {
  const [theme, colorMode] = useMode();
  const { IsLanding } = React.useContext(UserContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth/sign-in" element={<SignIn />}></Route>
          <Route path="/auth/sign-up" element={<SignUp />}></Route>
          <Route
            path="/auth/reset-password"
            element={<ResetPassword />}
          ></Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/main" element={<Search />}>
                <Route path=":faculty" element={<Search />}></Route>
              </Route>
              <Route path="/favorites" element={<Favorites />}></Route>
              <Route path="/visualization">
                <Route path=":courseId" element={<Visualization />}></Route>
              </Route>
              <Route path="/review">
                <Route path=":courseId" element={<Review />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
