import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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

function App() {
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
    function filterMovies(movies) {
      const listFindMovies = handleSearchMovies(movies, word);
      if (listFindMovies.length !== 0) {
        setIsActivePreloader(false);
        localStorage.setItem("movies", JSON.stringify(listFindMovies));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        setNotFoundMovies(false);
      } else {
        setIsActivePreloader(false);
        setNotFoundMovies(true);
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
  }

  function handleUpdateUser(name, email) {
    setIsActivePreloader(true);
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setIsActivePreloader(false);
        setUpdateUserServerResponse({
          message: "Данные успешно обновлены!",
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
          console.log(loggedIn)
          localStorage.setItem("loggedIn", "true");
          setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
          setCurrentUser({ name: res.name, email: res.email });
          console.log(loggedIn)
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
                loggedIn={loggedIn}
                movies={movies}
                isActive={isActivePreloader}
                errorServer={errorServer}
                notFoundMovies={notFoundMovies}
                onSubmitSearchForm={searchMovies}
                onMovieSave={handleMovieSave}
                onMovieDelete={handleMovieDelete}
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
              <Login
                onLogin={handleLogin}
                serverResponse={loginServerResponse}
                isActive={isActivePreloader}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegisterUser}
                serverResponse={registerServerResponse}
                isActive={isActivePreloader}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
