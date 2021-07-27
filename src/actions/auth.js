import types from '../types';
import { firebase, googleAuthProvider } from '../firebase/config';

export const loginWithEmailPsw = (email, password) => (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user: { uid, displayName } }) => dispatch(login(uid, displayName)));
};

export const registerWithEmailPasswordName =
  (email, password, name) => (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      });
  };

export const startGoogleLogin = () => (dispatch) => {
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
};

const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
