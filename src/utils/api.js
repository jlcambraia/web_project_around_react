class Api {
  constructor({ baseUrl, token, makeRequest }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._makeRequest = makeRequest;
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }

  getCardsInfo() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()]).then(
      ([userInfo, cards]) => {
        return { userInfo, cards };
      }
    );
  }

  setUserInfo(inputNameValue, inputAboutValue) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputNameValue,
        about: inputAboutValue,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }

  addNewCard(inputTitleValue, inputLinkValue) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputTitleValue,
        link: inputLinkValue,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }

  updateLikeState(cardId, isLiked) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }

  changeProfileImage(data) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Algo deu errado: ${res.status}`);
    });
  }
}

// Configuração para API
const apiConfig = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  token: "a97c4c63-ce40-4267-993b-56ebee3b0bfe",
  makeRequest: (...args) => fetch(...args),
};

// Instância para o Api
export const api = new Api(apiConfig);
