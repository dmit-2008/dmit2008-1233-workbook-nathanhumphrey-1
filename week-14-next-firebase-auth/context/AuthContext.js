import { createContext, useState } from 'react';
import { auth } from '@/firebase/firebase-config';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Context object
const contextValue = {
  isReady: false,
  user: null,
  signIn: async function (email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Probably want to throw this error to the calling function to handle more gracefully
      console.error(error);
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // Probably want to throw this error to the calling function to handle more gracefully
      console.error(error);
    }
  },
};

export const AuthContext = createContext(contextValue);

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [isReadyState, setIsReadyState] = useState(false);

  // Setup auth state listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Signed in
      setUserState(user);
    } else {
      // Signed out
      setUserState(null);
    }
    setIsReadyState(true);
  });

  return (
    <AuthContext.Provider
      value={{ ...contextValue, user: userState, isReady: isReadyState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
