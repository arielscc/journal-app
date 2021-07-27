import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useDispatch, useSelector } from 'react-redux';
import { addErrorMessage, removeErrorMessage } from '../../actions/ui';
import { registerWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    name: 'ariel',
    email: 'ariel@gmail.com',
    password: '123456',
    password2: '123456',
  });
  const { name, email, password, password2 } = formValues;

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(registerWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(addErrorMessage('Name is required'));
      return false;
    }

    if (!validator.isEmail(email)) {
      dispatch(addErrorMessage('Email is not valid'));
      return false;
    }

    if (
      !validator.isLength(password, 5) ||
      !validator.isLength(password2, 5) ||
      password !== password2
    ) {
      dispatch(
        addErrorMessage(
          "Password doesn't match and must be greater than 5 characters"
        )
      );
      return false;
    }
    dispatch(removeErrorMessage());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      {ui.error && <div className="auth__alert-error">{ui.error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="auth__input"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="confirm password"
          name="password2"
          className="auth__input"
          autoComplete="off"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-full">
          Register
        </button>

        <Link to="/auth/login" className="link mt-5">
          Already rigistered?
        </Link>
      </form>
    </>
  );
};
