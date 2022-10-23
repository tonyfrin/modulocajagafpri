import React from 'react';

const Error = ({error}) => (
    <>
    {error &&   
        <div className="gs-col-8 gs-box-error">
            {error.map((item, index) => (
                <React.Fragment key={`error-${index}`}>
                    <p className="gs-message-error">{item}</p>
                </React.Fragment>
            ))}
        </div>
    }
    </>
);
    


export {Error}