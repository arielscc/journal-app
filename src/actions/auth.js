import types from '../types';
import { firebase, googleAuthProvider } from '../firebase/config';

export const loginWithEmailPsw = (email, password) => dispatch => {
  setTimeout(() => {
    dispatch(login(123, 'Juanito'));
  }, 3500);
};

export const startGoogleLogin = () => dispatch => {
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
