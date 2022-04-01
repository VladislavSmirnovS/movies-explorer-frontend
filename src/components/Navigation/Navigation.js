import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";

import iconAccount from "../../images/account.svg";

function Navigation(props) {
  const [isnavigationOpen, setIsnavigationOpen] = React.useState(false);

  function handlenavigationClick() {
    setIsnavigationOpen(!isnavigationOpen);
  }

  return (
    <div
      className={`navigation ${
        props.pathname === "/" ? " navigation_auth-theme" : ""
      }`}
    >
      {!props.loggedIn ? (
        <div>
          <Link
            to="/signup"
            className="navigation__link navigation__link_type_auth "
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link_type_auth navigation__link_color_green"
          >
            Войти
          </Link>
        </div>
      ) : (
        <>
        <div className="navigation__menu">
        <nav className="navigation__movies">
            <NavLink
              to="/movies"
              className={`navigation__link ${
                props.pathname === "/" ? "navigation__link-theme" : ""
              }`}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={`navigation__link ${
                props.pathname === "/" ? "navigation__link-theme" : ""
              }`}
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <nav className="navigation__profile">
            <Link
              to="/profile"
              className={`navigation__link  navigation__link_text_medium navigation__link_type_account ${
                props.pathname === "/" ? "navigation__link-theme" : "" 
              }`}
            >
              Аккаунт
              <div className="navigation__icon">
                <img
                  className="navigation__icon-image"
                  alt="Иконка аккаунта"
                  src={iconAccount}
                />
              </div>
            </Link>
          </nav>
        </div>
          

          <button
            className="navigation__burger-btn"
            onClick={handlenavigationClick}
          ></button>
          <div
            className={`navigation__burger ${
              isnavigationOpen && "navigation__burger_visible"
            }`}
          >
            <div className="navigation__burger-container">
              <button
                type="button"
                className="navigation__burger-close-btn"
                aria-label="Закрыть"
                onClick={handlenavigationClick}
              ></button>
              <nav className="navigation__burger-list">
                <NavLink
                  to="/"
                  className="navigation__burger-link"
                >
                  Главная
                </NavLink>
                <NavLink
                  to="/movies"
                  className="navigation__burger-link"
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className="navigation__burger-link"
                >
                  Сохранённые фильмы
                </NavLink>
                <NavLink
                  to="/profile"
                  className="navigation__burger-link navigation__burger-link_type_account"
                >
                  Аккаунт
                  <div className="navigation__icon">
                    <img
                      className="navigation__icon-image"
                      alt="Иконка аккаунта"
                      src={iconAccount}
                    />
                  </div>
                </NavLink>
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
