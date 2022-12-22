import React, {memo, useEffect, useState} from 'react';
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import {axioInstance} from "../../ressources/apiConfig";
import {ImCross} from "react-icons/im";
import {FaCheck} from "react-icons/fa";
import ScoreSection from "./ScoreSection";


const PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const TS = '1';

//md5 est un générator de hash: https://www.md5hashgenerator.com/
// const hash = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);
const HASH = process.env.REACT_APP_MARVEL_API_HASH;

const QuizzOver = ({
                       questions,
                       quizzLevel,
                       maxQuestions,
                       levelNames,
                       score,
                       percent,
                       loadLevelQuestion,
                       finishLevel,
                       userAnswers
                   }) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [characterData, setCharacterData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const averageGrade = maxQuestions / 2;
    const hasAverage = score >= averageGrade;

    const hideModal = () => {
        setDisplayModal(false);
        setIsLoading(true);
    }

    const handleModal = (heroId) => {

        if (localStorage.getItem(heroId)) {
            setCharacterData(JSON.parse(localStorage.getItem(heroId)));
            setDisplayModal(true);
            setIsLoading(false);
        } else {
            axioInstance
                .get(`/characters/${heroId}?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`)
                .then((response) => {
                    if (response.data) {
                        setCharacterData(response.data);
                        setIsLoading(false);
                        //j'enregistre ds le localStorage: si je reclique sur le btn INFOS du même personnage, je ne referai pas le même call API
                        localStorage.setItem(heroId, JSON.stringify(response.data));
                        if (!localStorage.getItem('marvelStorageDate')) {
                            localStorage.setItem('marvelStorageDate', Date.now().toString());
                        }
                        setDisplayModal(true);

                    }
                }).catch((error) => {
                console.log(error)
            })
        }
    }

    if (!hasAverage) {
        setTimeout(() => {
            loadLevelQuestion(quizzLevel);
        }, 3000)
    }

    //au bout de 15jours, on clear le localStorage, en effet les datas de l'API ont pu changer
    const checkDataDate = (date) => {
        const today = Date.now();
        const timeDifference = today - date;

        const daysDifference = timeDifference / (1000 * 3600 * 24);
        if (daysDifference >= 15) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', today.toString());
        }
    }

    useEffect(() => {
        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate');
            checkDataDate(date);
        }
    }, [])


    const resultInModal = isLoading ? (
        <>
            <div className="modalHeader">
                <h2>Réponse de Marvel...</h2>
            </div>
            <div className="modalBody">
                <Loader/>
            </div>
        </>
    ) : (
        <>
            <div className="modalHeader">
                <h2>{characterData.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img
                        src={`${characterData.data.results[0]?.thumbnail?.path}.${characterData.data.results[0]?.thumbnail?.extension}`}
                        alt={characterData.data.results[0].name}/>
                    {characterData.attributionText}
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {characterData.data.results[0]?.description ? <p>{characterData.data.results[0]?.description}</p> :
                        <p>Description indisponible</p>}
                    <h3>Plus d'infos</h3>
                    {characterData.data.results[0].urls && characterData.data.results[0].urls.map((url, index) => {
                        return <a key={index} href={url.url} target='_blank'
                                  rel='noopener noreferrer'>{url.type.toUpperCase()}</a>
                    })
                    }
                </div>
            </div>
            <div className="modalFooter">
                <button className='modalBtn' onClick={hideModal}>Fermer</button>

            </div>
        </>
    );

    const displayUserAnswerIcon = (idQuestion) => {
        if (idQuestion >= 0) {
            const response = userAnswers.filter((answer) => answer.idQuestion === idQuestion);
            return response[0].isCorrect ? (<> <FaCheck style={{color: '#0cb765'}}/> </>) : (<> <ImCross
                style={{color: "#EB1D27"}}/> </>);
        }
    }

    return (
        <>
            <ScoreSection
                score={score}
                maxQuestions={maxQuestions}
                quizzLevel={quizzLevel}
                finishLevel={finishLevel}
                levelCount={levelNames.length}
                hasAverage={hasAverage}
                percent={percent}
            />
            <p>Les réponses aux questions posées:</p>
            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                    <tr>
                        <th>Question</th>
                        <th></th>
                        <th>Réponse</th>
                        <th>Infos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hasAverage ? (
                        <>
                            {questions && questions.map((question) => (
                                <tr key={question.id}>
                                    <td>{question.question}</td>
                                    <td>{displayUserAnswerIcon(question.id)}</td>
                                    <td>{question.answer}</td>
                                    <td>
                                        <button className='btnInfo' onClick={() => handleModal(question.heroId)}>Infos
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td colSpan='3'>
                                <Loader
                                    text="Vous allez être redirigé vers l'accueil..."
                                    style={{textAlign: 'center', color: 'red'}}
                                />
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
            <Modal showModal={displayModal} hideModal={hideModal}>
                {resultInModal}
            </Modal>
        </>
    );
};

// export default QuizzOver;
export default memo(QuizzOver);