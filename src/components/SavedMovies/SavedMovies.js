import React from "react";
import "./SavedMovies.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { initialSavedMovies } from "../../utils/constant";

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm />
      <MoviesCardList movies={initialSavedMovies} saved={true} />
      <Footer />
    </>
  );
}

export default SavedMovies;
