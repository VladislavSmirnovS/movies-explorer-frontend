import React from "react";
import "./SearchForm.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({ onSubmit, shortFilms, onCheckbox }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.searchInput);
  }

  return (
    <section className="search page__section">
      <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          value={values.searchInput || ""}
          onChange={handleChange}
          type="text"
          name="searchInput"
          className="search__input"
          placeholder="Фильм"
          required
        />
        <span className="form__error search__error">
          {errors.searchInput ? "Нужно ввести ключевое слово" : ""}
        </span>
        <button className="search__button" disabled={!isValid}>
          Найти
        </button>
        <div className="search__switch-box">
          <label
            className={`search-form__filter
            ${shortFilms === "on" ? "search-form__filter_active" : null}`}
          >
            <input
              className="search-form__radio search-form__radio_off"
              type="radio"
              name="shortFilms"
              value="off"
              checked={shortFilms === "off" ? true : false}
              onChange={onCheckbox}
            />
            <input
              className="search-form__radio search-form__radio_on"
              type="radio"
              name="shortFilms"
              value="on"
              checked={shortFilms === "on" ? true : false}
              onChange={onCheckbox}
            />
            <span className="search-form__switch"></span>
          </label>
          <span className="search__switch-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
