import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginWithEmailPsw, startGoogleLogin } from '../../actions/auth';
import { addErrorMessage, removeErrorMessage } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: 'ariel@gmail.com',
    password: '123456',
  });

  const { email, password } = formValues;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ui);

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(loginWithEmailPsw(email, password));
      history.push('/');
    }
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(addErrorMessage('Format email is not valid'));
      return false;
    }

    if (!validator.isLength(password, 5)) {
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

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      {error && <div className="auth__alert-error">{error}</div>}
      <form onSubmit={handleLogin}>
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
        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          Login
        </button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
