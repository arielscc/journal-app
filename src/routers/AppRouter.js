import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

import { firebase } from '../firebase/config';
import { login } from '../actions/auth';
import { getListNotes } from '../actions/notes';

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(getListNotes(user.uid));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <p>Cargando...</p>;
  }

  return (
    <Router>
      <>
        <Switch>
          {isLoggedIn ? (
            <Route exact path="/" component={JournalScreen} />
          ) : (
            <Route path="/auth" component={AuthRouter} />
          )}
          <Redirect to={isLoggedIn ? '/' : '/auth/login'} />
        </Switch>
      </>
    </Router>
  );
};
