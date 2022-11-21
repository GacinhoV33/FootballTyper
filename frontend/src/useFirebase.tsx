
// import { app } from './service_firebase';
import React, { useContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { UserContext, UserStatus } from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAw3O-R4E5uB82wl8_3qhUtRzmNoOQ-Fb4",
  authDomain: "football-typer-9706a.firebaseapp.com",
  projectId: "football-typer-9706a",
  storageBucket: "football-typer-9706a.appspot.com",
  messagingSenderId: "774861746098",
  appId: "1:774861746098:web:1cd784a7e731aa1daabeab",
  measurementId: "G-YL1YM2DQFG"
};

export const app = initializeApp(firebaseConfig);

function useFirebase(setAuthMode: React.Dispatch<React.SetStateAction<string>>, setUserStatus: React.Dispatch<React.SetStateAction<UserStatus>>) {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const userCtx = useContext(UserContext)
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

  const handleGoogleSignIn = () => {
    let returnValue = false;
    const auth = getAuth(app);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: user.displayName,
            email: user.email,
            imgLink: user.photoURL
          }),
        };

        fetch(
          API_URL + "api/TyperUsers/googleLogin",
          requestOptions
        )
          .then((response) => {
            if (response.ok) {
              return response.json();

            }
            return Promise.reject(response);
          })
          .then((data) => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                username: data.user.username,
                email: data.user.email,
                fullName: data.user.fullName,
                id: data.user.id,
                imgLink: data.user.imgLink,
                leagues: data.user.leagues,
              })
            );
            // userCtx.isUserSigned
            localStorage.setItem("userToken", data.userToken);
            setAuthMode('profile');
            // setUserStatus()
            const userStatus: UserStatus = {
              userLocalData: {
                username: "",
                email: "",
                fullname: "",
                id: 0,
              },
              isUserSigned: true,
            };
            setUserStatus(userStatus);
          });

      }).catch((error) => {
        // Handle Errors here.
        // console.log(error);
        returnValue = false;
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

      });
  }

  // const handleFacebookSignIn = () => {
  //   const auth = getAuth();
  //   signInWithPopup(auth, facebookProvider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = FacebookAuthProvider.credentialFromResult(result);
  //       console.log("credential", credential);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log("user", user);
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = FacebookAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // }

  return {
    handleGoogleSignIn: handleGoogleSignIn,
    // handleFacebookSignIn: handleFacebookSignIn
  }
}



export default useFirebase;