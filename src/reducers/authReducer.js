import types from '../types';

export const authReducer = (state = {}, action) => {
  const { login, logout } = types;
  const reducer = {
    [login]: () => ({
      uid: action.payload.uid,
      name: action.payload.displayName,
    }),
    [logout]: {},
  };
  return reducer[action.type] || state;
};
