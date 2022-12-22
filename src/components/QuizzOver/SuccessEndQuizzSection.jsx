import React, {memo} from 'react';
import {GiTrophyCup} from "react-icons/gi";

const SuccessEndQuizzSection = ({quizzLevel, levelCount, finishLevel}) => {
    return quizzLevel < levelCount ?
        (
            <>
                <div className='stepsBtnContainer'>
                    <p className='successMsg'>
                        <GiTrophyCup
                            size='50px'
                        />
                        Bravo, passez au niveau suivant!
                    </p>
                    <button className='btnResult success' onClick={() => finishLevel(quizzLevel)}>Niveau suivant
                    </button>
                </div>
            </>
        ) : (
            <>
                <div className='stepsBtnContainer'>
                    <p className='successMsg'>
                        <GiTrophyCup
                            size='50px'
                        />
                        Bravo, vous êtes un expert !
                    </p>
                    <button className='btnResult gameOver' onClick={() => finishLevel(quizzLevel)}>Accueil</button>
                </div>
            </>
        );
};

export default memo(SuccessEndQuizzSection);