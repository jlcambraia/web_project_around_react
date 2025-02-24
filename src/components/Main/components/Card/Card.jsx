import deleteButton from "../../../../images/delete__icon.svg";
import likeButton from "../../../../images/like__icon.svg";
import ImagePopup from "../Popup/componentes/ImagePopup/ImagePopup";

export default function Card({ card, onClick }) {
  const { name, link } = card;

  const imagePopup = {
    title: "",
    children: <ImagePopup card={card} />,
  };

  return (
    <li className="grid__card">
      <img
        className="grid__img"
        src={link}
        alt=""
        onClick={() => onClick(imagePopup)}
      />
      <button
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
          className="grid__card-footer-button"
          aria-label="Like card"
          type="button"
        >
          <img
            src={likeButton}
            alt="Ícone de Curtir"
            className="grid__like-icon"
          />
        </button>
      </div>
    </li>
  );
}
