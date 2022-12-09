import React, {useState, useEffect, useContext} from 'react';
import AuthContext from "../../Context/AuthContextProvider";
import { signOut } from 'firebase/auth';
import { useNavigate} from "react-router-dom";

const Logout = () => {

    const [ checked, setChecked ] = useState(false);
    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if(checked){
            signOut(auth).then(() => {
                setTimeout(()=>{
                    navigate('/');
                }, 1000)

            }).catch((error) => {
                console.log(error)
            });
        }

    }, [checked]);
    return (
        <div className="logoutContainer">
            <label className='switch'>
                <input type='checkbox' checked={checked} onChange={(e)=>setChecked(e.target.checked)}/>
                <span className="slider round"></span>
            </label>

        </div>
    );
};

export default Logout;