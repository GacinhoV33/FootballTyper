import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
