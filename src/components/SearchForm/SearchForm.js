import React from "react";
import "./SearchForm.css";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({onSubmit, onHandleCheckbox}) {
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.searchInput);
  }

  return (
    <section className="search page__section">
      <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
        <input
        value={values.searchInput || ""}
         onChange={handleChange}
          type="text"
          name="searchInput"
          className="search__input"
          placeholder="Фильм"
          required
        />
       <span className="form__error search__error">{errors.searchInput ? 'Нужно ввести ключевое слово' : ''}</span>
        <button className="search__button" disabled={!isValid}>Найти</button>
        <div className="search__switch-box">
          <label className="search__switch-label">
            <input type="checkbox" className="search__switch" onClick={onHandleCheckbox} />
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
