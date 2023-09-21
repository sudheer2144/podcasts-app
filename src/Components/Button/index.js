import React from 'react';
import "./styles.css"

const Button = ({ handleClick, loading = false, text, children }) => {
    return (
        <div className="submitBtn" onClick={handleClick} disabled={loading}>
            {
                text ? text : children
            }
        </div>
    );
}

export default Button;
