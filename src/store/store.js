import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';

//deberiamos tener el middleware

//El combine reducers centraliza todos los reducers que se tenga
const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(reducers);