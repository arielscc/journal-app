import types from '../types';
import { firebase, googleAuthProvider } from '../firebase/config';
import { addAndRemoveLoading } from './ui';

export const loginWithEmailPsw = (email, password) => (dispatch) => {
  dispatch(addAndRemoveLoading());
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user: { uid, displayName } }) => {
      dispatch(login(uid, displayName));
      dispatch(addAndRemoveLoading());
    });
};

export const registerWithEmailPasswordName =
  (email, password, name) => (dispatch) => {
    dispatch(addAndRemoveLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(addAndRemoveLoading());
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
