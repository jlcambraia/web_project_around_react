import { useState, useEffect } from "react";
import closeButton from "../../../../../../images/close__icon.svg";

export default function DeleteConfirmationPopup({ onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Função que gerencia o processo de confirmação
  const handleConfirm = () => {
    setIsDeleting(true);
    onConfirm();
  };

  // Efeito para lidar com o evento de pressionar a tecla Escape
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape" && !isDeleting) {
        // Desfoca qualquer elemento atualmente focado
        if (document.activeElement) {
          document.activeElement.blur();
        }
        onClose();
      }
    };

    // Adiciona event listener quando o componente é renderizado
    document.addEventListener("keydown", handleEscClose);

    // Remove event listener
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose, isDeleting]);

  // Método específico para checar se o clique foi no overlay
  const handleOverlayClick = (evt) => {
    // Verifica se o elemento clicado é exatamente o elemento com a classe popup_type_delete
    // e não qualquer um de seus filhos
    if (evt.target === evt.currentTarget && !isDeleting) {
      onClose();
    }
  };

  return (
    <div
      className="popup"
      onClick={handleOverlayClick}
      data-testid="delete-overlay"
    >
      <div className="popup__card popup__card_type_delete">
        <h2 className="popup__title popup__title_margin_small">Tem certeza?</h2>
        <button
          id="popup__delete-confirmation-button"
          type="submit"
          className={`popup__delete-confirmation-button ${
            isDeleting ? "popup__delete-confirmation-button_disabled" : ""
          }`}
          onClick={handleConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? "Excluindo..." : "Sim"}
        </button>
        <button
          className="popup__close-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
          disabled={isDeleting}
        >
          <img
            className="popup__close-button-icon"
            src={closeButton}
            alt="Ícone de Fechar"
          />
        </button>
      </div>
    </div>
  );
}
