import closeButton from "../../../../images/close__icon.svg";
import { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children } = props;

  // Efeito para lidar com o evento de pressionar a tecla Escape
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        // Desfoca qualquer elemento atualmente focado
        if (document.activeElement) {
          document.activeElement.blur();
        }
        onClose();
      }
    };

    // Adiciona event listener quando o componente é montado
    document.addEventListener("keydown", handleEscClose);

    // Remove event listener quando o componente é desmontado
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  // Função para lidar com cliques no overlay (fora do popup__card)
  const handleOverlayClick = (evt) => {
    // Verifica se o clique foi diretamente no elemento com classe "popup"
    // e não em algum de seus filhos
    if (evt.target.classList.contains("popup")) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
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
