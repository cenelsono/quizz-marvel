import React, {useContext, useEffect, useMemo, useState} from 'react';
import Levels from "../Levels/Levels";
import ProgressBar from "../ProgressBar/ProgressBar";
import {QuizMarvel} from "../../ressources/questions";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizzOver from "../QuizzOver/QuizzOver";
import {FaChevronRight} from "react-icons/fa";
import AuthContext from "../../Context/AuthContextProvider";
import {arrayUnion, getDoc, setDoc, updateDoc, deleteField} from "firebase/firestore";
import {scores} from "../../Firebase/users";
import {useNavigate} from "react-router-dom";


const Quizz = ({userData}) => {

    //va me permettre de cibler le niveau pour pouvoir fetch mes questions ds loadQuestions
    const [quizzLevel, setQuizzLevel] = useState(0);
    const [storedQuestions, setStoredQuestions] = useState([]);
    const [question, setQuestion] = useState(null);
    const [questionId, setQuestionId] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [userAnswer, setUserAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [levelFinished, setLevelFinished] = useState(false);
    const [fetchQuizz, setFetchQuizz] = useState([]);
    const [percent, setPercent] = useState(0);
    const [userAnswersArray, setUserAnswersArray] = useState([]);

    const maxQuestions = 10;
    const levelNames = ['débutant', 'confirmé', 'expert'];
    const navigate = useNavigate();

    const {value: {userSession}} = useContext(AuthContext);

    const loadQuestions = (level) => {
        const quizzData = QuizMarvel[0].quizz[level];
        if (quizzData.length >= maxQuestions) {
            setFetchQuizz(quizzData);
            //je créé un [] où je copie quizzData mais sans les reponses
            const newArray = quizzData.map(({answer, ...keepRest}) => keepRest);
            setStoredQuestions(newArray);
        } else {
            console.log('Il manque des questions')
        }
    }

    const reinitializeState = () => {
        setQuestionId(0);
        setPercent(0);
        setScore(0);
        setLevelFinished(false);
        setUserAnswersArray([]);
    }

    const goToNextLevel = (lvl) => {
        const isQuizzFinished = lvl >= levelNames.length;

        const levelName = levelNames[quizzLevel - 1];
        saveResultsInDb(levelName, score);

        if (isQuizzFinished) {
            setTimeout(() => {
                navigate('/scores');
            }, 1500)
        } else {
            loadNextLevelQuestions(quizzLevel)
        }
    }

    const saveResultsInDb = (levelName, score) => {
        //TODO: vérifier si la donnée n'existe pas déjà en DB? update : set

        if (levelName === 'débutant') {
            setDoc(scores(userSession.uid), {score: [{name: levelName, score: score}]})
                .then(() => {
                    console.log('score sauvegardé')
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            updateDoc(scores(userSession.uid), {score: arrayUnion({name: levelName, score: score})})
                .then(() => {
                    console.log('score sauvegardé')
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const loadNextLevelQuestions = (lvl) => {
        setQuizzLevel(lvl);
        reinitializeState();
        loadQuestions(levelNames[lvl]);
    }

    const loadQuestion = () => {
        if (storedQuestions.length !== undefined) {
            setQuestion({
                question: storedQuestions[questionId]?.question,
                options: storedQuestions[questionId]?.options
            })
        }
    }

    const selectAnswer = (answer) => {
        setUserAnswer(answer);
        setBtnDisabled(false)
    }

    const showWelcomeMessage = (pseudo) => {
        toast(`Bienvenue ${pseudo}! Puisse le sort vous être favorable 🦸  🦸‍♂️`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showResultMessage = (isSuccess) => {
        const config = {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        };

        if (isSuccess) {
            return toast.success('Wow GG! 👌', config);
        } else {
            return toast.error('T es mauvais Jack... 👎', config);
        }
    }

    const gameOver = () => {
        const gradePercent = getPercentage(maxQuestions, score);
        if (gradePercent >= 50) {
            setQuizzLevel(quizzLevel + 1);
        }
        setPercent(gradePercent);
    }

    const getPercentage = (maxQuestions, score) => (score / maxQuestions) * 100;

    const submitAnswer = () => {
        if (questionId === maxQuestions - 1) {
            setLevelFinished(true);
        } else {
            setQuestionId(questionId + 1);
        }

        const answer = fetchQuizz[questionId].answer;

        if (answer === userAnswer) {
            setScore(score + 1);
            setUserAnswersArray([...userAnswersArray, {idQuestion: questionId, isCorrect: true}])

            showResultMessage(true);
        } else {
            setUserAnswersArray([...userAnswersArray, {idQuestion: questionId, isCorrect: false}])

            showResultMessage(false);
        }

        setBtnDisabled(true);
        setUserAnswer(null);
    }

    useMemo(() => {
        loadQuestion();
    }, [storedQuestions, questionId]);

    useMemo(() => {
        if (levelFinished) {
            gameOver()
        }
    }, [levelFinished])

    //pour éviter de réafficher la notification après avoir terminé le quizz et qu'on revient à la page d'accueil
    useMemo(() => {
        if (userData.pseudo) {
            showWelcomeMessage(userData.pseudo)
        }
    }, [userData.pseudo])

    useEffect(() => {
        loadQuestions(levelNames[0]);

    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {levelFinished ? (
                <QuizzOver
                    questions={fetchQuizz}
                    levelNames={levelNames}
                    score={score}
                    maxQuestions={maxQuestions}
                    quizzLevel={quizzLevel}
                    percent={percent}
                    loadLevelQuestion={loadNextLevelQuestions}
                    finishLevel={goToNextLevel}
                    userAnswers={userAnswersArray}
                />
            ) : (
                <>
                    <Levels levelNames={levelNames} currentLevel={quizzLevel}/>
                    <ProgressBar questionId={questionId} maxQuestions={maxQuestions}/>
                    {question?.question !== null && question?.options != null && (
                        <>
                            <h2>{question.question}</h2>
                            {question?.options.map((option, key) => {
                                return <p key={key}
                                          className={`answerOptions ${userAnswer === option ? 'selected' : ''}`}
                                          onClick={() => selectAnswer(option)}>
                                    <FaChevronRight/>
                                    {option}
                                </p>
                            })
                            }

                        </>
                    )}

                    <button
                        className='btnSubmit'
                        disabled={btnDisabled}
                        type='submit'
                        onClick={() => submitAnswer()}
                    >
                        {questionId < maxQuestions - 1 ? 'Suivant' : 'Terminer'}
                    </button>
                </>

            )}
        </>)

};

export default Quizz;