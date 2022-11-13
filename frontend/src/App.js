import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopNavBar from "./components/TopNavBar/TopNavBar";
import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Verification from "./pages/Auth/Verification";
import Main from "./pages/Main/Main";
import Contact from "./pages/Contact/Contact";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";

const App = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/auth/sign-in" element={<SignIn />}></Route>
        <Route path="/auth/sign-up" element={<SignUp />}></Route> 
        <Route path="/auth/verification" element={<Verification />}></Route> 
        <Route path="/main" element={<Main />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>

    </div>
  );
};

export default App;
