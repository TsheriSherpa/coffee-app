import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './authSlice';
import { auth } from '../config/firebase';

const FirebaseOAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            const { email, displayName, refreshToken } = user;
            dispatch(login({ email, userName: displayName, isLoggedIn: true, token: refreshToken }));
        } else {
            dispatch(logout());
        }
    });

    return () => {
      // Unsubscribing the listener when component unmounts
      unsubscribe();
    };
  }, [dispatch]);

  // This component doesn't render anything
  return null; 
};

export default FirebaseOAuthListener;
