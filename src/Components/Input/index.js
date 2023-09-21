import React from 'react';
import "./styles.css"

const InputComponent = ({ type, setState, placeholder, value }) => {
    return (
        <input
            type={type}
            onChange={(e) => { setState(e.target.value) }}
            required={true}
            placeholder={placeholder}
            className='custom-input'
            value={value}
        />
    );
}

export default InputComponent;
