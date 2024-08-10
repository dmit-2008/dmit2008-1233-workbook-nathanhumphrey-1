// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB_qJFmBTXy4GHHYHYYDiUPr6bzTdXRTJY',
  authDomain: 'blah-blah-78580.firebaseapp.com',
  projectId: 'blah-blah-78580',
  storageBucket: 'blah-blah-78580.appspot.com',
  messagingSenderId: '239973378751',
  appId: '1:239973378751:web:cfc3649884ef5392eb740a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
