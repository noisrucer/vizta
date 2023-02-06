import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router";
import SignIn from "./pages/Auth/SignIn";
import { UserContext } from "./UserContext";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

console.log("RC", UserContext);

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { UserData, UserToken, IsLoggedIn, IsLanding } =
    useContext(UserContext);
  const [userData, setUserData] = UserData;
  const [userToken, setUserToken] = UserToken;
  const [isLoggedIn, setIsLoggedIn] = IsLoggedIn;
  const [isLanding, setIsLanding] = IsLanding;

  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("userToken", JSON.stringify(userToken));
  // localStorage.setItem("isLoggedIn", isLoggedIn);

  useEffect(() => {
    setUserData(userData);
    setUserToken(userToken);
    setIsLoggedIn(isLoggedIn);
  }, []);

  axios
    .request({
      method: "get",
      url: `${baseURL}/auth/me`,
      headers: userToken["headers"],
    })
    .then((response) => {
      console.log("response in Protected Routes: ", response);
      setIsLoggedIn(true);
      setIsAuth(true);
      setIsLanding(false);
    })
    .catch((err) => {
      // console.log("err in Protected Routes: ", err);
      setIsLoggedIn(false);
      setIsAuth(false);
    });
  return isAuth ? <Outlet /> : <SignIn />;
};

export default ProtectedRoutes;