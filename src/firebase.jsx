import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDh0QAqKZfBmBbTZOIPaE2auWyEvfQJb3Y",
  authDomain: "oxygenkart-3c9ef.firebaseapp.com",
  projectId: "oxygenkart-3c9ef",
  storageBucket: "oxygenkart-3c9ef.appspot.com",
  messagingSenderId: "403247989575",
  appId: "1:403247989575:web:a940e3f5d0174043870262",
  measurementId: "G-C1JQ8DK937",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

// Force account selection
provider.setCustomParameters({
  prompt: "select_account",
});

export const authWithGoogle = async () => {
  let user = null;

  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (error) {
    console.log(error);
  }

  return user;
};
