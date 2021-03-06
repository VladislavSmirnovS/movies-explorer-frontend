import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getInitialMovies } from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import auth from "../../utils/auth";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function App() {
  const Checkbox = localStorage.getItem("shortFilms") === "on" ? "on" : "off";
  const searchValue = localStorage.getItem("searchQuery");
  const { resetForm } = useFormWithValidation();
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("loggedIn"))
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [apiMovies, setApiMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loginServerResponse, setLoginServerResponse] = React.useState("");
  const [registerServerResponse, setRegisterServerResponse] =
    React.useState("");
  const [updateUserServerResponse, setUpdateUserServerResponse] =
    React.useState({ message: "", success: false });
  const [isActivePreloader, setIsActivePreloader] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState(false);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [notFoundSavedMovies, setNotFoundSavedMovies] = React.useState(false);
  const [shortFilms, setShortFilms] = React.useState(Checkbox);
  const [searchQuery, setSearchQuery] = React.useState(searchValue);

  const navigate = useNavigate();

  function handleSearchMovies(movies, word) {
    const findMovies = movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(word);
    });
    return findMovies;
  }

  function searchMyMovies(word) {
    const movies = JSON.parse(localStorage.getItem("savedMovies"));
    const listMovies = handleSearchMovies(movies, word);

    if (listMovies.length !== 0) {
      setSavedMovies(listMovies);
      setNotFoundSavedMovies(false);
    } else {
      setSavedMovies([]);
      setNotFoundSavedMovies(true);
    }
  }

  function searchMovies(word) {
    setIsActivePreloader(true);
    setSearchQuery(word);
    localStorage.setItem("searchQuery", word);
    localStorage.setItem("shortFilms", shortFilms);
    function filterMovies(movies) {
      const listFindMovies = handleSearchMovies(movies, word);
      if (listFindMovies.length !== 0) {
        setIsActivePreloader(false);
        localStorage.setItem("movies", JSON.stringify(listFindMovies));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        setNotFoundMovies(false);
        console.log(notFoundMovies)
      } else {
        setIsActivePreloader(false);
        setNotFoundMovies(true);
        console.log('1')
        setMovies([]);
      }
    }

    if (apiMovies.length === 0) {
      getInitialMovies()
        .then((data) => {
          setApiMovies(data);
          filterMovies(data);
        })
        .catch((err) => {
          console.log(err);
          setErrorServer(true);
        });
    } else {
      filterMovies(apiMovies);
    }
  }

  function handleSwitchShortMovies(e) {
    setShortFilms(e.target.value);
    localStorage.setItem("shortFilms", e.target.value);
  }

  function handleMovieSave(movie) {
    mainApi
      .createMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then((savedMovie) => {
        const newSavedMovies = [...savedMovies, savedMovie];
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
        setSavedMovies([...savedMovies, savedMovie]);
      });
  }

  function handleMovieDelete(id) {
    mainApi.deleteMovie(id).then((data) => {
      const newSavedMovies = savedMovies.filter((movie) => movie._id !== id);
      localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      setSavedMovies(newSavedMovies);
    });
  }

  function handleLogin(email, password) {
    setIsActivePreloader(true);
    auth
      .loginUser(email, password)
      .then((res) => {
        resetForm({}, {}, false);
        setIsActivePreloader(false);
        localStorage.setItem("loggedIn", "true");
        setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
        mainApi
          .getMyInfo()
          .then((data) => {
            setCurrentUser({ name: data.name, email: data.email });
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/movies");
      })
      .catch((err) => {
        setIsActivePreloader(false);
        setLoginServerResponse(err.message);
        console.log(err);
      });
  }

  function handleRegisterUser(name, email, password) {
    setIsActivePreloader(true);
    auth
      .registerUser(name, email, password)
      .then((res) => {
        setIsActivePreloader(false);
        handleLogin(email, password);
        resetForm({}, {}, false);
      })
      .catch((err) => {
        setIsActivePreloader(false);
        setRegisterServerResponse(err.message);
        console.log(err);
      });
  }

  function onSignOut() {
    auth.logout();
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
    localStorage.removeItem("movies");
    setMovies([]);
    setSearchQuery('')
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("shortFilms");
    setSavedMovies([]);
  }

  function handleUpdateUser(name, email) {
    setIsActivePreloader(true);
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setIsActivePreloader(false);
        setUpdateUserServerResponse({
          message: "???????????? ?????????????? ??????????????????!",
          success: true,
        });
        setCurrentUser({ name: name, email: email });
      })
      .catch((err) => {
        setIsActivePreloader(false);
        console.log(err.message);
        setUpdateUserServerResponse({
          message: err.message,
          success: false,
        });
      });
  }

  function tokenCheck() {
    mainApi
      .getMyInfo()
      .then((res) => {
        if (res) {
          localStorage.setItem("loggedIn", "true");
          setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
          setCurrentUser({ name: res.name, email: res.email });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getMyMovies()
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem("savedMovies", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
          setErrorServer(true);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies && movies !== 0) {
      setMovies(movies);
    } else {
      setMovies([]);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                searchQuery={searchQuery}
                loggedIn={loggedIn}
                movies={movies}
                isActive={isActivePreloader}
                errorServer={errorServer}
                notFoundMovies={notFoundMovies}
                onSubmitSearchForm={searchMovies}
                onMovieSave={handleMovieSave}
                onMovieDelete={handleMovieDelete}
                onCheckbox={handleSwitchShortMovies}
                shortFilms={shortFilms}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                movies={savedMovies}
                loggedIn={loggedIn}
                onMovieDelete={handleMovieDelete}
                onSubmitSearchForm={searchMyMovies}
                notFoundSavedMovies={notFoundSavedMovies}
                onCheckbox={handleSwitchShortMovies}
                shortFilms={shortFilms}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                onSignOut={onSignOut}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                serverResponse={updateUserServerResponse}
                isActive={isActivePreloader}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace={true} />
              ) : (
                <Login
                  onLogin={handleLogin}
                  serverResponse={loginServerResponse}
                  isActive={isActivePreloader}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace={true} />
              ) : (
                <Register
                  onRegister={handleRegisterUser}
                  serverResponse={registerServerResponse}
                  isActive={isActivePreloader}
                />
              )
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
