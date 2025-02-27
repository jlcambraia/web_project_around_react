import deleteButton from "../../../../images/delete__icon.svg";
import likeButton from "../../../../images/like__icon.svg";
import ImagePopup from "../Popup/componentes/ImagePopup/ImagePopup";

export default function Card({ card, onClick, onCardLike, onDeleteCard }) {
  const { name, link, isLiked } = card;

  // Constante que renderiza o popup de imagem
  const imagePopup = {
    title: "",
    children: <ImagePopup card={card} />,
  };

  // Verificar se o usuário atual “curtiu” o cartão
  const cardLikeButtonClassName = `grid__like-icon ${
    isLiked ? "grid__like-icon_active" : ""
  }`;

  // Criação do manipulador de clique
  function handleLikeClick() {
    onCardLike(card);
  }

  // Criação do removedor de cards
  function handleDeleteClick() {
    onDeleteCard(card); // Chama a função passada pelo componente pai para abrir o popup
  }

  return (
    <li className="grid__card">
      <img
        className="grid__img"
        src={link}
        alt=""
        onClick={() => onClick(imagePopup)}
      />
      <button
        onClick={handleDeleteClick}
        className="grid__card-delete-button"
        aria-label="Delete card"
        type="button"
      >
        <img
          src={deleteButton}
          alt="Ícone de Deletar"
          className="grid__delete-icon"
        />
      </button>
      <div className="grid__card-footer">
        <h2 className="grid__card-title">{name}</h2>
        <button
          onClick={handleLikeClick}
          className="grid__card-footer-button"
          aria-label="Like card"
          type="button"
        >
          <img
            src={likeButton}
            alt="Ícone de Curtir"
            className={cardLikeButtonClassName}
          />
        </button>
      </div>
    </li>
  );
}
