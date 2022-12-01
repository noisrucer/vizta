// import { useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Main from "./pages/Main/Main";
import { UserProvider } from "./UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
// import RouteError from "./RouteError";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Sidebar />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/auth/sign-in" element={<SignIn />}></Route>
          <Route path="/auth/sign-up" element={<SignUp />}></Route> 
          <Route element={<ProtectedRoutes />}>
            <Route path="/auth/me"></Route>
            <Route path="/main" element={<Main />}></Route>
          </Route>
        </Routes>
      </UserProvider>
      {/* <RouteError /> */}
    </div>
  );
};

export default App;
