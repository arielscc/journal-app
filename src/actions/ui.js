import types from '../types';

export const addErrorMessage = (error) => (dispatch) => {
  dispatch(addError(error));
};

export const removeErrorMessage = () => (dispatch) => {
  dispatch(removeError());
};

const addError = (error) => ({
  type: types.addError,
  payload: error,
});

const removeError = () => ({
  type: types.removeError,
});
