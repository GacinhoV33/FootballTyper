import React from 'react'
import useFirebase from '../../useFirebase';
import "./ProviderLogin.scss"
import GoogleLogo from './google-logo.png'

export interface GoogleLoginProps{
    setAuthMode: React.Dispatch<React.SetStateAction<string>>,
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({setAuthMode}) => {
    const { handleGoogleSignIn: handleGoogleSignIn } = useFirebase(setAuthMode);
    const onClickPrevent = (e: any) => {
        e.preventDefault();
        handleGoogleSignIn();
        // setAuthMode()
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