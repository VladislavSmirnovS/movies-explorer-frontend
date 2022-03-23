import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search page__section">
      <form className="search__form" name="search" noValidate>
        <input
          type="text"
          name="searchInput"
          className="search__input"
          placeholder="Фильм"
        />
        <button className="search__button">Найти</button>
        <div className="search__switch-box">
          <label className="search__switch-label">
            <input type="checkbox" className="search__switch" />
            <span className="search__switch_visible">
              <span className="search__switch-item"></span>
            </span>
          </label>
          <span className="search__switch-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
