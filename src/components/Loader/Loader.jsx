import React from 'react';

const Loader = ({text, style}) => {
    return (
        <>
            <div className='loader'></div>
            <p style={style}>
                {text}
            </p>
        </>
    );
};

export default Loader;