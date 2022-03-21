import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const saved = props.saved;

  const name = props.movie.nameRU;
  const linkImage = props.movie.image;
  const duration = props.movie.duration;

  function handleClick(e) {
    e.target.classList.toggle("card__btn-save_active");
  }

  return (
    <article className="card">
      <img
        className="card__image"
        alt={`Постер фильма "${name}"`}
        src={linkImage}
      />
      <div className="card__block">
        <h2 className="card__title">{name}</h2>
        {saved ? (
          <button
            type="button"
            className={"card__button card__btn-delete"}
          ></button>
        ) : (
          <button
            type="button"
            className="card__button card__btn-save"
            onClick={handleClick}
          ></button>
        )}
      </div>
      <p className="card__duration">{duration}</p>
    </article>
  );
}

export default MoviesCard;
