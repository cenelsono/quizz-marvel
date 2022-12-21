import React, {createContext, useMemo, useState, useEffect} from 'react';
import {auth} from '../Firebase/firebaseConfig.js';
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getDoc} from "firebase/firestore";
import { user} from "../Firebase/users";

//initialisation du context
export const AuthContext = createContext();

export const AuthContextProvider = props => {
    const [ userSession, setUserSession ] = useLocalStorage('userSession', null);
    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user)=>{
            user ? setUserSession(user) : navigate('/');
        });
        return listener();
    }, [userSession]);

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                setUserSession(userCredential)
            });
    };

    const logout = () => {
        signOut(auth).then(() => {
            setTimeout(()=>{
                setUserSession(null);
                navigate("/", { replace: true });
            }, 1000)
        }).catch((error) => {
            console.log(error)
        });
    };

    const value = useMemo(
        () => ({
            userSession: userSession,
            // userData: userData,
            login,
            logout
        }),
        [userSession]
    );

return (
        <AuthContext.Provider
            value={{value}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

