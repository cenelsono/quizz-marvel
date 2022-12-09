import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../Firebase/firebaseConfig.js'


const ForgetPassword = () => {

    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(null);
    const navigate = useNavigate();

    const isDisabled = email === '';

    const handleSubmit = (e)=>{
        e.preventDefault();
        sendPasswordResetEmail(auth,email).then((value)=>{
            setError(null);
            setSuccess(`Un email pour réinitialiser votre mot de passe a été envoyé à ${email} avec succès !` );
            setTimeout(()=>{
                navigate('/login');
            }, 3000);

        }).catch((error)=>{
            setError(error);
        })

    }

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className="formBoxLeftForget"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        { error && <span>{error.message}</span> }
                        { success && <span style={{border:'1px solid green', backgroundColor:'green', color:'white'}}>{success}</span> }
                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="email" name="email" value={email} autoComplete='off' required onChange={(e)=> setEmail(e.target.value)}/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={isDisabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <NavLink className='simpleLink' to='/login'>Déjà inscrit? Connectez-vous.</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;