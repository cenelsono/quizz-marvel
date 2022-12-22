import React from 'react';

const Modal = ({showModal, children}) => {
    console.log('RENDER IN Modal')
    return (
        showModal && (
            <div className='modalBackground'>
                <div className="modalContainer">
                    {children}
                </div>
            </div>
        )
    );
};

export default Modal;