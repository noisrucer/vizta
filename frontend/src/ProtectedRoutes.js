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

    // localStorage.setItem("userData", userData);
    // localStorage.setItem("userToken", userToken);

    useEffect(() => {
        setUserData(UserData);
        setUserToken(UserToken);
    },[])

    console.log("data sent to auth/me in protectedRoutes: ", userData, userToken);

    axios.post(`${baseURL}/auth/me`,
        userData,
        userToken
    )
    .then(response => {
        console.log("response in Protected Routes: ", response);
        setIsAuth(true);
    })
    .catch(err => {
        console.log("err in Protected Routes: ", err)
        setIsAuth(false);
    })

    console.log("isAuth: ", isAuth)
    return isAuth ? <Outlet /> : <SignIn />;
}

export default ProtectedRoutes;