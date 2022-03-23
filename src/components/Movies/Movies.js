import React from "react";
import "./Movies.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { initialMovies } from "../../utils/constant";

function Movies() {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList movies={initialMovies} saved={false} />
      <Preloader />
      <Footer />
    </>
  );
}

export default Movies;
