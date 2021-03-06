import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

import Logo from "../Logo/Logo";
import Authorization from "../Authorization/Authorization";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Preloader from '../Preloader/Preloader';

function Login({ onLogin, serverResponse, isActive }) {
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  function handleSubmit(e) {
    const { email, password } = values;
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className="login">
      <Logo />
      <Authorization title="Рады видеть!" name="login" onSubmit={handleSubmit}>
        <p className="form__input-text">E-mail</p>
        <input
        value={values.email || ''} 
        onChange={handleChange}
          id="email-user"
          type="email"
          name="email"
          className="form__input"
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
          required
        />
        <span className="form__error">{errors.email ? `Введите корректный email. Пример: example@ya.ru` : ''}</span>

        <p className="form__input-text">Пароль</p>
        <input
        value={values.password || ''}
         onChange={handleChange}
          id="password"
          type="password"
          name="password"
          className="form__input"
          minLength='4'
          required
        />
        <span className="form__error">{errors.password}</span>
        <p className="login__server-error">{serverResponse}</p>
      <button type="submit" className="form__btn" disabled={!isValid}>{isActive ? <Preloader isActive={isActive} isAuth={true} /> : 'Войти'}</button>
      </Authorization>

      <p className="auth__subtitle">
        Ещё не зарегистрированы?{" "}
        <Link to="/signup" className="auth__link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
