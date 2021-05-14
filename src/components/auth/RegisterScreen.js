import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form>
        <input
          type="text"
          placeholder="name"
          name="name"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="confirm password"
          name="password2"
          className="auth__input"
          autoComplete="off"
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
