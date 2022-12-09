import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {auth} from "../../Firebase/firebaseConfig";
import { useContext} from "react";
import AuthContext from "../../Context/AuthContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const authContext = useContext(AuthContext);
    const isDisabledBtn = password.length < 6 || email === '';
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/welcome')
                // console.log(userCredential);
                //TODO: doesn't work
                // authContext.login(userCredential?.stsTokenManager?.accessToken);
            })
            .catch((error) => {
                setError(error);
                setEmail('');
                setPassword('');
            });
    }

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        { error !== '' && <span>{error.message}</span> }
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="email" name="email" value={email} autoComplete='off' required onChange={(e)=> setEmail(e.target.value)}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" name="password" value={password} autoComplete='off' required onChange={(e)=> setPassword(e.target.value)}/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <button disabled={isDisabledBtn}>Connexion</button>
                        </form>
                        <div className="linkContainer">
                            <NavLink className='simpleLink' to='/signup'>Nouveau sur Marvel Quizz? Inscrivez-vous maintenant</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;