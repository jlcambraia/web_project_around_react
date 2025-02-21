export default function Popup(props) {
  const { title, children } = props;
  return (
    <div className="popup popup_hidden popup_type_edit">
      <div className="popup__card">
        <button className="popup__close-button">
          <img
            className="popup__close-button-icon"
            src="./src/images/close__icon.svg"
            alt="Ícone de Fechar"
          />
        </button>
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
