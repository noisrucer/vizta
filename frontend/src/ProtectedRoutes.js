import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router"; 
import SignIn from "./pages/Auth/SignIn";
import {UserContext} from "./UserContext";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000";

const ProtectedRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const {UserData, UserToken, IsLoggedIn} = useContext(UserContext);
    const [userData, setUserData] = UserData;
    const [userToken, setUserToken] = UserToken;
    const [isLoggedIn, setIsLoggedIn] = IsLoggedIn;

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userToken", JSON.stringify(userToken));
    // localStorage.setItem("isLoggedIn", isLoggedIn);

    useEffect(() => {
        setUserData(userData);
        setUserToken(userToken);
        setIsLoggedIn(isLoggedIn);
    },[])

    axios.request({
        method: 'get',
        url: `${baseURL}/auth/me`,
        headers: userToken['headers']
      })
    .then(response => {
        // console.log("response in Protected Routes: ", response);
        setIsLoggedIn(true);
        setIsAuth(true);
    })
    .catch(err => {
        // console.log("err in Protected Routes: ", err)
        setIsLoggedIn(false);
        setIsAuth(false);
    })
    return isAuth ? <Outlet /> : <SignIn />;
}

export default ProtectedRoutes;