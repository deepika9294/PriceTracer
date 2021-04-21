import React from 'react';

function ErrorMsg (props) {
    return (
        <div className="error-notice">
            <span>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    );
}

export default ErrorMsg;