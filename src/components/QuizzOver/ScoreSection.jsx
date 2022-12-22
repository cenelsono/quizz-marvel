import React, {memo} from 'react';
import SuccessEndQuizzSection from "./SuccessEndQuizzSection";

const ScoreSection = ({hasAverage, finishLevel, levelCount, quizzLevel, percent, score, maxQuestions}) => {
    return hasAverage ? (
        <>
            <SuccessEndQuizzSection finishLevel={finishLevel} levelCount={levelCount} quizzLevel={quizzLevel}/>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
            <hr/>
        </>
    ) : (
        <>
            <div className='stepsBtnContainer'>
                <p className='failureMsg'>Vous avez échoué!</p>
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
        </>
    );
};

export default memo(ScoreSection);