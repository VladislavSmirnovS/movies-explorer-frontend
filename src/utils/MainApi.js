

export class MainApi {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return res.json().then(res => Promise.reject(res));
    }
  
     
  getMyInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

    getMyMovies() {
      return fetch(`${this._url}/movies`, {
        method: 'GET',
        credentials: "include",
        headers: this._headers,
      })
      .then(this._checkResponse)
      .then(data => {
        return data;
      })
    }
  
    createMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }) {
      return fetch(`${this._url}/movies`, {
        method: 'POST',
        credentials: "include",
        headers: this._headers,
        body: JSON.stringify({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          thumbnail,
          movieId,
          nameRU,
          nameEN,
        })
      })
      .then(this._checkResponse);
    }
  
  
    deleteMovie(id) {
      return fetch(`${this._url}/movies/${id}`, {   
        method: 'DELETE',
        credentials: "include",
        headers: this._headers,
      })
        .then(this._checkResponse);
    }
  
    updateUserInfo(name, email) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: "include",
        headers: this._headers,
        body: JSON.stringify({
          name,
          email,
        })
      })
        .then(this._checkResponse);
    }
  
  }
  
  const mainApi = new MainApi({
    // url: 'https://api.movies.vladislav.nomoredomains.work',
    url: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default mainApi;