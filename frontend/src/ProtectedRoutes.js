import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router"; 
import SignIn from "./pages/Auth/SignIn";
import {UserContext} from "./UserContext";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000";

const ProtectedRoutes = () => {
    const [isAuth, setIsAuth] = useState("false");
    const {UserData, UserToken} = useContext(UserContext);
    const [userData, setUserData] = UserData;
    const [userToken, setUserToken] = UserToken;

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userToken", JSON.stringify(userToken));

    useEffect(() => {
        console.log("USE EFFECT!")
        setUserData(userData);
        setUserToken(userToken);
    },[])

    // console.log("data sent to auth/me in protectedRoutes: ", userData, userToken);
    console.log("AAAA userToken: ", userToken['headers'])
    axios.request({
        method: 'get',
        url: `${baseURL}/auth/me`,
        headers: userToken['headers']
      })
    // axios.get(`${baseURL}/auth/me`,
    //     userData,
    //     userToken
    //     // localStorage.getItem(JSON.parse(localStorage.getItem("userData"))),
    //     // localStorage.getItem(JSON.parse(localStorage.getItem("userToken")))
    // )
    .then(response => {
        console.log("response in Protected Routes: ", response);
        setIsAuth(true);
    })
    .catch(err => {
        console.log("err in Protected Routes: ", err)
        setIsAuth(false);
    })

    // console.log("isAuth: ", isAuth)
    return isAuth ? <Outlet /> : <SignIn />;
}

export default ProtectedRoutes;