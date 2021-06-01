import types from '../types';

export const loginWithEmailPsw = (email, password) => dispatch => {
  setTimeout(() => {
    dispatch(login(123, 'Juanito'));
  }, 3500);
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
