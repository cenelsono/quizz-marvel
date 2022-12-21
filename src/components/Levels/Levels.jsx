import React, {memo} from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({currentLevel, levelNames}) => {

    return (
        <div className='levelsContainer'>
            {/*<h2 className='headingLevels'>Débutant</h2>*/}
            <Stepper
                steps={levelNames.map((levelName)=> ({title:levelName.toUpperCase()}))}
                activeStep={currentLevel}
                circleTop={1}
                activeTitleColor={'#d31017'}
                activeColor={'#d31017'}
                completeTitleColor={'#333030'}
                completeColor={'#333030'}
                completeBarColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                defaultColor={'#E0E0E0'}
                barStyle={'dashed'}
                size={45}
                circleFontSize={20}
            />
        </div>
    );
};

export default memo(Levels);