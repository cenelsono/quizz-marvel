import React, {useContext, useEffect, useState} from 'react';
import Logout from "../../components/Logout/Logout";
import Quizz from "../../components/Quizz/Quizz";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import {getUserData, user} from "../../Firebase/users";
import {auth, db} from "../../Firebase/firebaseConfig";
import {doc, getDoc} from 'firebase/firestore';


const Welcome = () => {
    //TODO: déporter cette logique dans App.js et AuthContext pour protéger mes routes
    const [ userSession, setUserSession ] = useState(null);
    const [ userData, setUserData ] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user)=>{
            user ? setUserSession(user) : navigate('/');
        });

        console.log('userSession', userSession);

        if(userSession){
            const collectionRef = user(userSession.uid);
            console.log('collectionRef', collectionRef)
            getDoc(collectionRef)
                .then((snapshot)=>{
                    console.log('snapshot', snapshot);
                    const exist = snapshot.exists();
                        if(snapshot.exists()){

                        console.log(snapshot.exists())
                        const docData = snapshot.data();
                        setUserData(docData);
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        }

        return listener();
    }, [userSession]);


    return userSession === null ? (
        <>
            <div className="loader"></div>
            <p className='loaderText'>Loading...</p>

        </>
    ) : (
        <div className='quizz-bg'>
            <div className="container">
                <Logout/>
                <Quizz userData={userData}/>
            </div>
        </div>
    )
};

export default Welcome;