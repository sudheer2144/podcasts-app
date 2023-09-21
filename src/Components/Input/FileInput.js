import React from 'react';

const FileInput = ({ labelText, file, setFile, accept, id }) => {
    function handleOnChange(e) {
        setFile(e.target.files[0]);
        labelText = e.target.files[0].name;
    }
    return (
        <>
            <label
                htmlFor={id}
                className={`custom-input custom-input-label ${file && "custom-input-label-selected"}`}>{file ? file.name : labelText + " [+]"}</label>
            <input
                type="file"
                accept={accept}
                id={id}
                style={{ display: "none" }}
                onChange={handleOnChange}
            />
        </>
    );
}

export default FileInput;
