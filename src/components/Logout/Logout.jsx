import React, {useState, useEffect, useContext} from 'react';
import AuthContext from "../../Context/AuthContextProvider";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Logout = () => {
    const [ checked, setChecked ] = useState(false);
    const { value: {logout} } = useContext(AuthContext);

    useEffect(() => {
        if(checked){
            logout();
        }
    }, [checked]);
    return (
        <div className="logoutContainer">
            <label className='switch'>
                <input  type='checkbox' checked={checked} onChange={(e)=>setChecked(e.target.checked)}/>
                <span id="logout" className="slider round"></span>
            </label>
            <Tooltip anchorId="logout" place="left" content="Déconnexion" variant="dark" />
        </div>
    );
};

export default Logout;