import { useState, createContext, useMemo } from 'react';

const UserContext = createContext(); 

const UserProvider = (props) => {
    const [userData, setUserData] = useState(() => {
        const loadUserData = JSON.parse(localStorage.getItem("userData"));
        // console.log("Initial useContext after refresh (userData): ", loadUserData)
        return loadUserData
    });
    const [userToken, setUserToken] = useState(() => {
        const loadUserToken = JSON.parse(localStorage.getItem("userToken"));
        // console.log("Initial useContext after refresh (userToken): ", loadUserToken)
        return loadUserToken
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    //     () => {
    //     const loadIsLoggedIn = localStorage.getItem("isLoggedIn");
    //     console.log("Initial useContext after refresh (isLoggedIn): ", loadIsLoggedIn)
    //     return loadIsLoggedIn
    // })

    const UserData = useMemo(
        () => ({userData, setUserData}),[userData])

    const UserToken = useMemo(
        () => ({userToken, setUserToken}),[userToken])

    const IsLoggedIn = useMemo(
        () => ({isLoggedIn, setIsLoggedIn}),[isLoggedIn])

    // console.log("UserData in UserContext: ", UserData)
    // console.log("UserToken in UserContext: ", UserToken)
    // console.log("IsLoggedIn in UserContext: ", IsLoggedIn)

    return (
        <UserContext.Provider
            value={{UserData: [userData, setUserData], UserToken: [userToken, setUserToken], IsLoggedIn: [isLoggedIn, setIsLoggedIn]}}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };