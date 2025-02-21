import { useState } from "react";

import profilePlaceholder from "../../images/profile__placeholder.png";
import profileIcon from "../../images/profile__icon.png";
import editIcon from "../../images/edit__icon.svg";
import addIcon from "../../images/add__icon.svg";

import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/componentes/NewCard/NewCard";
import EditProfile from "./components/Popup/componentes/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/componentes/EditAvatar/EditAvatar";

export default function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit avatar", children: <EditAvatar /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

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
            src={profilePlaceholder}
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
            <h1 className="profile__user-name">Jacques Cousteau</h1>
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

          <p className="profile__user-about">Explorador</p>
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
          <p className="grid__without-cards-text">Ainda não há cartões</p>
        </div>

        <div className="grid__card-container"></div>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
