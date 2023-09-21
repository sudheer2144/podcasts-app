import React, { useState } from 'react';
import SignUp from '../../Components/SignUp/SignUp';
import Login from '../../Components/Login/Login';
import "./SignUpLoginPage.css"

const SignUpPage = () => {

    const [switchLogin, setSwitchLogin] = useState(true);

    const switchText = switchLogin ? "Don't have an Account ?" : "Already have an Account ?"

    return (
        <div className="container">
            <div className="inputContainer signup-login-page">
                {switchLogin && <Login />}
                {!switchLogin && <SignUp />}
                <p className="switchLink" onClick={() => { setSwitchLogin(!switchLogin) }}>
                    {switchText}
                </p>
            </div>
        </div>
    );
};


export default SignUpPage;
