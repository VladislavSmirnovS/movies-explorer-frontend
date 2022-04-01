import React from "react";
import "./Movies.css";
import { searchShortMovies } from "../../utils/utils";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  loggedIn,
  onSubmitSearchForm,
  isActive,
  errorServer,
  notFoundMovies,
  onMovieSave,
  onMovieDelete,
  onCheckbox,
  shortFilms,searchQuery
}) {

  const [shortMovies, setShortMovies] = React.useState([]);
  const [notFoundShort, setNotFoundShort] = React.useState(false);


  React.useEffect(() => {
    if (shortFilms == 'on') {
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
        onCheckbox={onCheckbox}
        shortFilms={shortFilms}
        searchQuery={searchQuery}
      />
      <Preloader isActive={isActive} />
      {!isActive && (
        <MoviesCardList
          movies={shortFilms=='on' ? shortMovies : movies}
          saved={false}
          isChecked={shortFilms}
          errorServer={errorServer}
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          notFoundMovies={shortFilms == 'on' ? notFoundShort : notFoundMovies}
        />
      )}
      <Footer />
    </>
  );
}

export default Movies;
