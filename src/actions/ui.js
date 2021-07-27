import types from '../types';

export const addErrorMessage = (error) => (dispatch) => {
  dispatch(addError(error));
};

export const removeErrorMessage = () => (dispatch) => {
  dispatch(removeError());
};

export const addAndRemoveLoading = () => (dispatch) => {
  dispatch(toggleLoading());
};

const addError = (error) => ({
  type: types.addError,
  payload: error,
});

const removeError = () => ({
  type: types.removeError,
});

const toggleLoading = () => ({
  type: types.addRemoveLoading,
});
