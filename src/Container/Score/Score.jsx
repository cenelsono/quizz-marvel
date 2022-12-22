import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../Context/AuthContextProvider";
import {scores} from "../../Firebase/users";
import {getDoc} from "firebase/firestore";
import {GiTrophyCup} from "react-icons/gi";
import Loader from "../../components/Loader/Loader";
import Logout from "../../components/Logout/Logout";
import {useNavigate} from "react-router-dom";

const Score = () => {
    const {value: {userSession}} = useContext(AuthContext);
    const [scoreData, setScoreData] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getScoreData = () => {
        const scoreRef = scores(userSession?.uid);
        if (scoreRef) {
            getDoc(scoreRef)
                .then((snapshot) => {
                    console.log(snapshot)
                    if (snapshot.exists()) {
                        const scoreData = snapshot.data();
                        if (scoreData.score) {
                            setScoreData([...scoreData.score])
                        } else {
                            setMessage('Aucun score enregistré en DB')
                        }
                        setIsLoading(false);

                    }
                }).catch((error) => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        getScoreData();
    }, []);

    return (
        <div className='quizz-bg'>
            <div className="container">
                <Logout/>
                <div style={{
                    display: 'flex',
                    margin: '20px 0',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                }}>
                    <h2>Mes scores</h2>
                    <button className='btnResult success' onClick={() => navigate('/welcome')}>Accueil</button>

                </div>
                <div className='answerContainer'>
                    {isLoading ?
                        <Loader/> : (
                            <>
                                {scoreData ? (
                                    <table className='answers'>
                                        <thead>
                                        <tr>
                                            <th>Niveaux</th>
                                            <th>Score</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <>
                                            {scoreData && scoreData.map((score, key) => (
                                                <tr key={key}>
                                                    <td>{score.name}</td>
                                                    <td>{score.score}/10</td>
                                                </tr>
                                            ))
                                            }
                                        </>
                                        </tbody>
                                    </table>
                                ) : (<p>{message}</p>)
                                }
                            </>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default Score;