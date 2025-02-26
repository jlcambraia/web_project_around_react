import { useState, useEffect, useContext } from "react";

import profileIcon from "../../images/profile__icon.png";
import editIcon from "../../images/edit__icon.svg";
import addIcon from "../../images/add__icon.svg";

import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/componentes/NewCard/NewCard";
import EditProfile from "./components/Popup/componentes/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/componentes/EditAvatar/EditAvatar";

import Card from "./components/Card/Card";

import { api } from "../../utils/api.js";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  // Cria a constante currentUser, que faz o useContext
  const currentUser = useContext(CurrentUserContext);

  // Cria a constante do Popup para adicionar novos cartões
  const newCardPopup = { title: "Novo local", children: <NewCard /> };

  // Cria a constante do Popup para editar perfil
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  // Cria a constante do Popup para editar avatar
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  // Hook useEffect que chama a função getCardsFromApi
  useEffect(() => {
    getCardsFromApi();
  }, []);

  // Função getCardsFromApi, que retorna os Cards solicitados na Api e atualiza setCards
  function getCardsFromApi() {
    api
      .getCardsInfo()
      .then((cards) => setCards(cards))
      .catch((err) => console.error("Erro:", err)); // Quando popup de erro estiver configurado, colocar aqui;
  }

  // Função para abrir os popups
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // Função para fechar os popups
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__picture-container"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser.avatar}
            alt="Placeholder para Foto de Perfil do Usuário"
            className="profile__picture"
          />
          <img
            src={profileIcon}
            alt="Ícone de Editar para o Perfil do Usuário"
            className="profile__icon"
          />
        </div>

        <div className="profile__user-info">
          <div className="profile__user-container">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={() => handleOpenPopup(editProfilePopup)}
            >
              <img
                src={editIcon}
                alt="Ícone de Editar Perfil"
                className="profile__edit-button-icon"
              />
            </button>
          </div>

          <p className="profile__user-about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img
            src={addIcon}
            alt="Ícone de Adicionar Foto"
            className="profile__add-button-icon"
          />
        </button>
      </section>
      <section className="grid">
        <div className="grid__without-cards">
          <p className="grid__without-cards-text"></p>
        </div>

        <ul className="grid__card-container">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              isLiked={card.isLiked}
              onClick={handleOpenPopup}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
