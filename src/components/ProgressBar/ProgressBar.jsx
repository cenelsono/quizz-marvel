import React, {memo} from 'react';

const ProgressBar = ({questionId, maxQuestions}) => {

    const actualQuestion = questionId + 1;

    const getWidthPercent = (totalQuestions, questionId) =>{
        return (100/ totalQuestions) * questionId
    }

    const progressPercent = getWidthPercent(maxQuestions, actualQuestion);
    return (
        <>
            <div className='percentage'>
                <div className="progressPercent">Question: {actualQuestion}/{maxQuestions}</div>
                <div className="progressPercent">Progression: {progressPercent}%</div>
            </div>
            <div className='progressBar'>
                <div className='progressBarChange' style={{width:`${progressPercent}%`}}></div>
            </div>
        </>
    );
};

export default memo(ProgressBar) ;