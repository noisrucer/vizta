import { useState, createContext, useMemo } from 'react';

const UserContext = createContext(); 

const UserProvider = (props) => {
    const [userData, setUserData] = useState(() => {
        return null
    });
    const [userToken, setUserToken] = useState(() => {
        return null
    });

// const dataValue = useMemo(
//     () => ({userData, setUserData}),[userData])

// const tokenValue = useMemo(
//     () => ({userToken, setUserToken}),[userToken])


    return (
        <UserContext.Provider
            value={{UserData: [userData, setUserData], UserToken: [userToken, setUserToken]}}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };