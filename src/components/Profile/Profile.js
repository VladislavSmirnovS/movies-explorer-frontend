import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

import Header from "../Header/Header";
import { userData } from "../../utils/constant";

function Profile() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
  }, []);

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, {userData.name}!</h2>
        <form className="profile__form" name="profile">
          <label className="profile__label">
            Имя
            <input
              value={name}
              type="text"
              name="name"
              className="profile__input"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="form__error profile__error"></span>
          </label>
          <label className="profile__label">
            E-mail
            <input
              value={email}
              className="profile__input"
              type="email"
              name="email"
            />
            <span className="form__error profile__error"></span>
          </label>
          <button type="submit" className="profile__button" disabled={true}>
            Редактировать
          </button>
        </form>
        <Link to="/" className="profile__link">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
}

export default Profile;
