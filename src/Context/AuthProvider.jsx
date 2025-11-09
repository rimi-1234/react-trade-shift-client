import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword,sendPasswordResetEmail, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateProfileFunc = (updatedata) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedata);
  };
  const signoutUserFunc = () => {
    setLoading(true);
    return signOut(auth);
  };
const signInWithGoogleFunc = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider);
};


const sendPasswordResetEmailFunc = (email) => {
  return sendPasswordResetEmail(auth, email);
};
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);



    });
    return () => {
      unsubscribe();
    };
  }, []);



  const authInfo = {
    loading,
    setLoading,
    user,
    signInWithGoogleFunc,
    setUser,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    updateProfileFunc,
    onAuthStateChanged,
    signoutUserFunc,
    sendPasswordResetEmailFunc

  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;