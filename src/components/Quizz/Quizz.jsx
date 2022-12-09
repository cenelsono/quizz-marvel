import React,{useEffect, useState} from 'react';
import Levels from "../Levels/Levels";
import ProgressBar from "../ProgressBar/ProgressBar";
import { QuizMarvel} from "../../ressources/questions";

const Quizz = ({userData}) => {

    //va me permettre de cibler le niveau pour pouvoir fetch mes questions ds loadQuestions
    const [ levelNames, setLevelNames ] = useState(['debutant', 'confirme', 'expert']);
    const [ quizzLevel, setQuizzLevel ] = useState(0);
    const [ storedQuestions, setStoredQuestions ] = useState([]);

    const maxQuestions = 10;

    const loadQuestions = (level)=>{
        const fetchedQuizz = QuizMarvel[0].quizz[level];
        if(fetchedQuizz.length >= maxQuestions){

            //je créé un [] où je copie fetchedQuizz mais sans les reponses
            const newArray = fetchedQuizz.map(({answer,...keepRest})=> keepRest);
            setStoredQuestions(newArray);

        }else{
            console.log('Il manque des questions')
        }
        
    }

    useEffect(() => {
        loadQuestions(levelNames[quizzLevel]);
    }, []);

    return (
        <div>
            <h2>Pseudo: {userData.pseudo}</h2>
            <Levels/>
            <ProgressBar/>
            <h2>Notre question</h2>
            <p className='answerOptions'>Question 1</p>
            <p className='answerOptions'>Question 2</p>
            <p className='answerOptions'>Question 3</p>
            <p className='answerOptions'>Question 4</p>
            <button type='submit'>Suivant</button>
        </div>
    );
};

export default Quizz;