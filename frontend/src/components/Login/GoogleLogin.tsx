import React from 'react'
import useFirebase from '../../useFirebase';
import "./ProviderLogin.scss"
import GoogleLogo from './google-logo.png'

const GoogleLogin = (props: any) => {
    const { handleGoogleSignIn: handleGoogleSignIn } = useFirebase();
    const onClickPrevent = (e: any) => {
        e.preventDefault();
        handleGoogleSignIn();
        // props.handleGoogleSignIn();
    }
    return (
        <div className="container">

            <button onClick={onClickPrevent}>
                {/* Sign in with Google */}
                <img src={GoogleLogo} alt="Google Logo" />
                Sign In
            </button>
        </div>
    )

}


export default GoogleLogin;