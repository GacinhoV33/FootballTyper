import React from 'react'
import useFirebase from '../../useFirebase';
import "./ProviderLogin.scss"
import FacebookLogo from './facebook-logo.png'

const FacebookLogin = () => {
    // const { handleFacebookSignIn: handleFacebookSignIn } = useFirebase();
    const handleFacebookSignIn = (e: any) => {
        e.preventDefault();
        alert("Not implemented yet");
    }

    return (
        <div className="container">
            <button onClick={handleFacebookSignIn}>
                {/* Sign in with Facebook */}
                <img src={FacebookLogo} alt="Facebook Logo" />
                Sign In
            </button>
        </div>
    )

}

export default FacebookLogin;