// const BASE_URL = "https://api.movies.vladislav.nomoredomains.work";
// const BASE_URL = "http://localhost:3001";

class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(res => Promise.reject(res));
  };

  registerUser(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(this._checkResponse);
  }

  loginUser( email, password ) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    }).then(this._checkResponse);
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const auth = new Auth({
  url: "https://api.movies.vladislav.nomoredomains.work",
  headers: {
    'Accept': 'application/json',
    "content-type": "application/json",
  },
});

export default auth;

