import React, {useContext, useEffect, useState} from 'react';
import Logout from "../../components/Logout/Logout";
import Quizz from "../../components/Quizz/Quizz";
import {user} from "../../Firebase/users";
import {getDoc} from 'firebase/firestore';
import Loader from "../../components/Loader/Loader";
import AuthContext from "../../Context/AuthContextProvider";

const Welcome = () => {
    const [userData, setUserData] = useState({});
    const {value: {userSession}} = useContext(AuthContext);

    useEffect(() => {
        if (userSession?.uid) {
            const collectionRef = user(userSession?.uid);
            getDoc(collectionRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data();
                        setUserData(docData);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [userSession]);


    return userSession === null ? (
        <Loader text="Authentification..." style={{textAlign: 'center', color: '#fff'}}/>
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