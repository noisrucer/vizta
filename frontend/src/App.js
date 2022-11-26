import { useState, useMemo } from "react";
import { Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Verification from "./pages/Auth/Verification";
import Main from "./pages/Main/Main";
import Contact from "./pages/Contact/Contact";
import UserContext from "./UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
import RouteError from "./RouteError";

const App = () => {
  // const [user, setUser] = useState(null);
  // const value = useMemo(() => ({user, setUser}), [user, setUser])
  console.log(UserContext);
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/auth/sign-in" element={<SignIn />}></Route>
        <Route path="/auth/sign-up" element={<SignUp />}></Route> 
        <Route path="/auth/verification" element={<Verification />}></Route> 
        <Route path="/auth/me"></Route>
        <Route path="/contact" element={<Contact />}></Route>
        {/* <UserContext.Provider value={}> */}
          <Route path="/main" element={<Main />}></Route>
        {/* </UserContext.Provider> */}
      </Routes>
      {/* <RouteError /> */}
    </div>
  );
};

export default App;
