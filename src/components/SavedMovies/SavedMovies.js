import React from "react";
import "./SavedMovies.css";
import { searchShortMovies } from "../../utils/utils";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  movies,
  loggedIn,
  onMovieDelete,
  onSubmitSearchForm,
  notFoundSavedMovies,
  onCheckbox,
  shortFilms,
}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [notFoundShort, setNotFoundShort] = React.useState(false);

  React.useEffect(() => {
    if (shortFilms) {
      const listShortMovies = searchShortMovies(movies);
      if (listShortMovies.length !== 0) {
        setShortMovies(listShortMovies);
        setNotFoundShort(false);
      } else {
        setShortMovies([]);
        setNotFoundShort(true);
      }
    } else {
      !shortFilms && setNotFoundShort(false);
    }
  }, [movies, shortFilms]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSubmit={onSubmitSearchForm}
        shortFilms={shortFilms}
        onCheckbox={onCheckbox}
      />
      <MoviesCardList
        movies={shortFilms == "on" ? shortMovies : movies}
        saved={true}
        onMovieDelete={onMovieDelete}
        notFoundSavedMovies={
          notFoundShort ? notFoundShort : notFoundSavedMovies
        }
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
