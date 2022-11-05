import { Route, Routes } from "react-router-dom";

import TopNavBar from "./components/TopNavBar/TopNavBar";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";

const App = () => {
  return (
    <div>
      <TopNavBar />
      <Routes>
        <Route path="/auth/sign-in" element={<SignIn />}></Route>
        <Route path="/auth/sign-up" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
};

export default App;
