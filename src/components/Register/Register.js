import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

import Logo from "../Logo/Logo";
import Authorization from "../Authorization/Authorization";
import Preloader from "../Preloader/Preloader";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register({ onRegister, serverResponse, isActive }) {
  const { values, handleChange, errors, isValid} = useFormWithValidation();

  function handleSubmit(e) {
    const { name, email, password } = values;
    e.preventDefault();
    onRegister(name, email, password);
  }

  return (
    <section className="register">
      <Logo />
      <Authorization
        title="Добро пожаловать!"
        name="register"
        onSubmit={handleSubmit}
      >
        <p className="form__input-text">Имя</p>
        <input
          value={values.name || ""}
          onChange={handleChange}
          id="name"
          type="text"
          name="name"
          className="form__input"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__error">{errors.name}</span>

        <p className="form__input-text">E-mail</p>
        <input
          value={values.email || ""}
          id="email-user"
          onChange={handleChange}
          type="email"
          name="email"
          className="form__input"
          required
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
        />
      <span className="form__error">{errors.email ? `Введите корректный email. Пример: example@ya.ru` : ''}</span>

        <p className="form__input-text">Пароль</p>
        <input
          value={values.password || ""}
          onChange={handleChange}
          id="password"
          type="password"
          name="password"
          className="form__input"
          minLength="4"
          required
        />
        <span className="form__error">{errors.password}</span>
        <p className="register__server-error">{serverResponse}</p>
        <button type="submit" className="form__btn" disabled={!isValid}>{isActive ? <Preloader isActive={isActive} isAuth={true} /> : 'Зарегистрироваться'}</button>
      </Authorization>

      <p className="auth__subtitle">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="auth__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
