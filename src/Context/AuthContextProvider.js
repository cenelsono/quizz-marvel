import React, {createContext, useMemo, useState} from 'react';
import {auth} from '../Firebase/firebaseConfig.js';
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";

//initialisation du context
export const AuthContext = createContext();

//creation du composant avec le state que je veux partager dans l'appli
export const AuthContextProvider = props => {

    const [token, setToken] = useLocalStorage('token', null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        setToken(data);
        navigate("/welcome");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setToken(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user: token,
            login,
            logout
        }),
        [token]
    );

return (
        <AuthContext.Provider
            value={{value}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;