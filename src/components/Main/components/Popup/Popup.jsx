import closeButton from "../../../../images/close__icon.svg";

export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <div className="popup popup_hidden popup_type_edit">
      <div className="popup__card">
        <button className="popup__close-button" onClick={onClose}>
          <img
            className="popup__close-button-icon"
            src={closeButton}
            alt="Ícone de Fechar"
          />
        </button>
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
