import React from 'react'
import useFirebase from '../../useFirebase';
import "./ProviderLogin.scss"
import GoogleLogo from './google-logo.png'

import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'

export interface GoogleLoginProps {
    setAuthMode: React.Dispatch<React.SetStateAction<string>>,
}

const GoogleLoginButton: React.FC<GoogleLoginProps> = ({ setAuthMode }) => {
    const { handleGoogleSignIn: handleGoogleSignIn } = useFirebase(setAuthMode);

    const onClickPrevent = (e: any) => {
        e.preventDefault();
        handleGoogleSignIn();
    }

    return (
            <GoogleButton onClick={onClickPrevent} disabled={false}>Sign in with Google</GoogleButton>
    )

}


export default GoogleLoginButton;