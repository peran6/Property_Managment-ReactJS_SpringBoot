import React from 'react';

const Alert = ({addAlert}) => {

    return (
        <div className='container'>
            {addAlert
                ?<div className="alert alert-success  ">
                    <strong>Success!</strong>  
                </div>
                : <div className="alert alert-danger  ">
                    <strong>Failure!</strong>  
                </div>       
            }
        </div>
    );
};

export default Alert;