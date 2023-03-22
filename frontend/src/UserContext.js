import { useState, createContext, useMemo } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [userData, setUserData] = useState(() => {
    const loadUserData = JSON.parse(localStorage.getItem("userData"));
    // console.log("Initial useContext after refresh (userData): ", loadUserData)
    return loadUserData;
  });
  const [userToken, setUserToken] = useState(() => {
    const loadUserToken = JSON.parse(localStorage.getItem("userToken"));
    // console.log("Initial useContext after refresh (userToken): ", loadUserToken)
    return loadUserToken ? loadUserToken : { headers: "" };
  });

  const [isAuth, setIsAuth] = useState(false)


  return (
    <UserContext.Provider
      value={{
        UserData: [userData, setUserData],
        UserToken: [userToken, setUserToken],
        IsAuth: [isAuth, setIsAuth]
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
