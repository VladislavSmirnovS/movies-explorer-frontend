import React from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies page__section">
      <div className="movies__list">
        {props.movies.map((item, i) => (
          <MoviesCard key={i} movie={item} saved={props.saved} />
        ))}
      </div>
      <div className="movies__button-area">
        <button
          type="button"
          className={`movies__button ${
            props.saved && "movies__button_invisible"
          }`}
        >
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
