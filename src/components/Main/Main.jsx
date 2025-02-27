import { useContext } from "react";
import profileIcon from "../../images/profile__icon.png";
import editIcon from "../../images/edit__icon.svg";
import addIcon from "../../images/add__icon.svg";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/componentes/NewCard/NewCard";
import EditProfile from "./components/Popup/componentes/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/componentes/EditAvatar/EditAvatar";
import ErrorPopup from "./components/Popup/componentes/ErrorPopup/ErrorPopup";
import Card from "./components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  cards,
  onCardLike,
  onDeleteCard,
  onAddPlace,
  popup,
  onOpenPopup,
  onClosePopup,
  err,
}) {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const hasCards = cards && cards.length > 0;

  const newCardPopup = {
    title: "Novo local",
    children: <NewCard onAddPlace={onAddPlace} onClose={onClosePopup} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: (
      <EditAvatar onUpdateAvatar={handleUpdateAvatar} onClose={onClosePopup} />
    ),
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__picture-container"
          onClick={() => onOpenPopup(editAvatarPopup)}
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
              onClick={() => onOpenPopup(editProfilePopup)}
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
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            src={addIcon}
            alt="Ícone de Adicionar Foto"
            className="profile__add-button-icon"
          />
        </button>
      </section>
      <section className="grid">
        {!hasCards ? (
          <div className="grid__without-cards">
            <p className="grid__without-cards-text">Não há nenhum card</p>
          </div>
        ) : (
          <ul className="grid__card-container">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                isLiked={card.isLiked}
                onClick={onOpenPopup}
                onCardLike={onCardLike}
                onDeleteCard={onDeleteCard}
              />
            ))}
          </ul>
        )}
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      {err && (
        <Popup onClose={onClosePopup}>
          <ErrorPopup err={err} onClose={onClosePopup} />
        </Popup>
      )}
    </main>
  );
}
