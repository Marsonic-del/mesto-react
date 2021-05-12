 class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  removeCard(idCard) {
    return fetch(`${this._address}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  addLike(idCard) {
    return fetch(`${this._address}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  deleteLike(idCard) {
    return fetch(`${this._address}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  editAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    });
  }
}
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: '06d63aad-75bc-4641-be17-ed6babb8063a',
})

export default api;
