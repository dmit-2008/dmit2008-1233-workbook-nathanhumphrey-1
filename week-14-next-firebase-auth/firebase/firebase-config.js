// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDg4Xjfi2j8i1KsM_TKCzYRv-BWaBDRLIE',
  authDomain: 'blah-blah-2b3c9.firebaseapp.com',
  projectId: 'blah-blah-2b3c9',
  storageBucket: 'blah-blah-2b3c9.appspot.com',
  messagingSenderId: '279045210965',
  appId: '1:279045210965:web:dcd614e53dc12c45e825dc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
