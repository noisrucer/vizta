import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router";
import SignIn from "./pages/Auth/SignIn";
import { UserContext } from "./UserContext";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

const ProtectedRoutes = () => {
  const { UserData, UserToken, IsAuth } = useContext(UserContext);
  const [userData, setUserData] = UserData;
  const [userToken, setUserToken] = UserToken;
  const [isAuth, setIsAuth] = IsAuth;

  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("userToken", JSON.stringify(userToken));

  return <Outlet />
};

export default ProtectedRoutes;
