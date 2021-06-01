import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    name: 'ariel',
    email: 'ariel@gmail.com',
    password: '12345',
    password2: '12345',
  });
  const { name, email, password, password2 } = formValues;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, email, password, password2);
    if (isFormValid()) {
      console.log('formulario valido');
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      console.log('Name is required');
      return false;
    } else if (!validator.isEmail(email)) {
      console.log('Email is not valid');
      return false;
    } else if (password !== password2 || password.length < 5 || password2 < 5) {
      console.log(
        "Password doesn't match and must be greater than 5 characters"
      );
      return false;
    }
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
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
          Login
        </button>

        <Link to="/auth/login" className="link mt-5">
          Already rigistered?
        </Link>
      </form>
    </>
  );
};
