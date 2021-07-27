import types from '../types';

const initialState = {
  loading: false,
  error: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addError:
      return {
        ...state,
        error: action.payload,
      };
    case types.removeError:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
