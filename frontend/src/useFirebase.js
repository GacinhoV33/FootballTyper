import { app } from './service_firebase';
import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";


function useFirebase() {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("user", user);

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
          process.env.REACT_APP_API_URL + "api/TyperUsers/googleLogin",
          requestOptions
        )
          .then((response) => {
            if (response.ok) {
              console.log("response: ", response);
              return response.json();

            }
            return Promise.reject(response);
          })
          .then((data) => {
            console.log("data: ", data);
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

            localStorage.setItem("userToken", data.userToken);
          });
          return true;

      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        return false;
      });
  }

  const handleFacebookSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        console.log("credential", credential);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return {
    handleGoogleSignIn: handleGoogleSignIn,
    handleFacebookSignIn: handleFacebookSignIn
  }
}



export default useFirebase;