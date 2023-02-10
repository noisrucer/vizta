import { UserProvider } from "../..";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import Box from "@mui/material/Box";

import config from "../../config/index.json";
import "../../styles/main.css";

import axios from "axios";
const baseURL = "https://vizta.onrender.com";

const MainHero = () => {
  const { mainHero } = config;
  const [isAuth, setIsAuth] = useState(false);
  const { UserData, UserToken, IsLoggedIn } = useContext(UserContext);
  const [userData, setUserData] = UserData;
  const [userToken, setUserToken] = UserToken;
  const [isLoggedIn, setIsLoggedIn] = IsLoggedIn;

  const handleLogoutClick = (e) => {
    setUserToken({ ...userToken, headers: "" });
    localStorage.setItem("userToken", JSON.stringify({ headers: "" }));
  };

  useEffect(() => {
    axios
      .request({
        method: "get",
        url: `${baseURL}/auth/me`,
        headers: userToken["headers"],
      })
      .then((response) => {
        setIsAuth(true);
      })
      .catch((err) => {
        // console.log("err in Protected Routes: ", err);
        setIsAuth(false);
      });
  }, [userToken]);

  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline" style={{ color: "white" }}>
            {mainHero.title}
          </span>{" "}
          <br />
          {/* <div style={{ marginTop: "10px" }}> */}
          <span
            className={`block text-primary xl:inline`}
            style={{ fontSize: "35px" }}
          >
            {mainHero.subtitle}
          </span>
          {/* </div> */}
        </h1>
        <p
          className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          style={{ color: "#b9b6b6" }}
        >
          {mainHero.description}
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={
                isAuth
                  ? mainHero.primaryActionSearch.href
                  : mainHero.primaryAction.href
              }
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
              // style={{ backgroundColor: '#FFC106', color: 'white' }}
            >
              {isAuth
                ? mainHero.primaryActionSearch.text
                : mainHero.primaryAction.text}
            </a>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              onClick={handleLogoutClick}
              href={
                isAuth
                  ? mainHero.secondaryActionLogout.href
                  : mainHero.secondaryAction.href
              }
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {isAuth
                ? mainHero.secondaryActionLogout.text
                : mainHero.secondaryAction.text}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
