import React from 'react'
import useFirebase from '../../useFirebase';
import "./ProviderLogin.scss"
import GoogleLogo from './google-logo.png'

import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import { UserStatus } from '../../App';

export interface GoogleLoginProps {
    setAuthMode: React.Dispatch<React.SetStateAction<string>>,
    setUserStatus: React.Dispatch<React.SetStateAction<UserStatus>>
}

const GoogleLoginButton: React.FC<GoogleLoginProps> = ({ setAuthMode, setUserStatus }) => {
    const { handleGoogleSignIn: handleGoogleSignIn } = useFirebase(setAuthMode, setUserStatus);

    const onClickPrevent = (e: any) => {
        e.preventDefault();
        handleGoogleSignIn();
    }

    return (
            <GoogleButton onClick={onClickPrevent} disabled={false}>Sign in with Google</GoogleButton>
    )

}


export default GoogleLoginButton;