import React, { useState, useContext } from 'react';
import AuthContext from '../../Context/AuthContextProvider.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { user } from '../../Firebase/users';
import {auth} from '../../Firebase/firebaseConfig.js'


const SignUp = () => {
    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmedPassword:''
    };

    const [ loginData, setLoginData ] = useState(data);
    const [ error, setError ] = useState('');

    const { pseudo, email, confirmedPassword, password } = loginData;
    const isDisabledBtn = pseudo === '' || email === '' || password === '' || password !== confirmedPassword;

    const navigate = useNavigate();
    const handleChange = (e)=>{
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser)=>{
                return setDoc(user(authUser.user.uid), {
                    pseudo: pseudo,
                    email: email
                })
            })
            .then(()=>{
                //je vide l'objet
                setLoginData({...data});
                navigate('/welcome');
            }).catch((error)=> {
                setError(error);
                setLoginData({...data});
        })

    }



    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        { error !== '' && <span>{error.message}</span> }
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="text" name="pseudo" id="pseudo" value={pseudo} autoComplete='off' required onChange={handleChange}/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input type="email" name="email" id="email" value={email} autoComplete='off' required onChange={handleChange}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" name="password" id="password" value={password} autoComplete='off' required onChange={handleChange}/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" name="confirmedPassword" id="confirmedPassword" value={confirmedPassword} autoComplete='off' onChange={handleChange} required onPaste={(e)=> {
                                    e.preventDefault();
                                    return false;
                                }}/>
                                <label htmlFor="password">Confirmer le mot de passe</label>
                            </div>
                            <button disabled={isDisabledBtn}>Inscription</button>
                        </form>
                        <div className="linkContainer">
                            <NavLink className='simpleLink' to='/login'>Déjà inscrit? Connectez-vous</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;