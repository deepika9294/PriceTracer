import React from 'react';

function ErrorMsg (props) {
    return (
        <div className="error-notice">
            <span>{props.message}</span>
            <button className="btn btn-outline-danger" onClick={props.clearError}>X</button>
        </div>
    );
}

export default ErrorMsg;