import closeButton from "../../../../images/close__icon.svg";

export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <div className="popup">
      <div
        className={`popup__card ${
          !title ? "popup__card_type_image" : "popup__card_type_forms"
        }`}
      >
        <button
          className="popup__close-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-button-icon"
            src={closeButton}
            alt="Ícone de Fechar"
          />
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
