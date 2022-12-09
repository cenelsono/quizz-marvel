import React, {useRef, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Home = () => {

    const refWolverine = useRef(null);

    const [ displayButtons, setDisplayButtons ] = useState(false);

    useEffect(() => {
        refWolverine.current?.classList?.add('startingImg');
        setTimeout(()=>{
            refWolverine.current?.classList?.remove('startingImg');
            setDisplayButtons(true);
        }, 1000);
    }, []);

    const setLeftImg = ()=>{
        refWolverine.current?.classList?.add('leftImg');
    }

    const seRightImg = ()=>{
        refWolverine.current?.classList?.add('rightImg');
    }

    const clearImg = ()=>{
        if(refWolverine.current?.classList?.contains('rightImg')){
            refWolverine.current?.classList?.remove('rightImg');
        }else if(refWolverine.current?.classList?.contains('leftImg')){
            refWolverine.current?.classList?.remove('leftImg');
        }
    }

    return (
        <main className='welcomePage' ref={refWolverine}>
            {displayButtons &&
                <>
                    <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                        <Link className='btn-welcome' to='/signup'>Inscription</Link>
                    </div>
                    <div onMouseOver={seRightImg} onMouseOut={clearImg} className="rightBox">
                        <Link className='btn-welcome' to='login'>Connexion</Link>
                    </div>
                </>
            }
        </main>
    );
};

export default Home;