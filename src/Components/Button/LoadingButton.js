import React from 'react';
import { ReactComponent as Loader } from "./LoadingButtonBackground.svg";
import "./styles.css"

const LoadingButton = ({ text = "Submit", loading, onClcik }) => {
    return (
        <button
            className="submitBtn"
            type="button"
            onClick={onClcik}
            disabled={loading}
        >
            {loading ? <Loader className="spinner" /> : text}
        </button>
    );

}

export default LoadingButton;
