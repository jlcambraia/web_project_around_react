import { useState } from "react";
import closeButton from "../../../../../../images/close__icon.svg";

export default function DeleteConfirmationPopup({ onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Função que gerencia o processo de confirmação
  const handleConfirm = () => {
    setIsDeleting(true);
    onConfirm();
  };

  return (
    <div className="popup">
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
