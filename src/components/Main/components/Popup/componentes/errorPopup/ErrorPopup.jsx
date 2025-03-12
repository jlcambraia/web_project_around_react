import { useEffect } from "react";
import closeButton from "../../../../../../images/close__icon.svg";

export default function ErrorPopup({ err, onClose }) {
  // Use o useEffect sem condição no nível superior
  useEffect(() => {
    // Só executa a lógica se err existir
    if (err) {
      const timer = setTimeout(() => {
        onClose(); // Chama a função onClose após 3 segundos
      }, 3000);

      // Limpa o temporizador se o componente for desmontado antes dos 3 segundos
      return () => clearTimeout(timer);
    }
  }, [err, onClose]);

  // Renderiza condicionalmente o conteúdo, não o componente inteiro
  if (!err) return null;

  return (
    <div className="popup">
      <div className="popup__card">
        <p className="popup__message">{`Erro: ${err.message || err}`}</p>
        <button className="popup__close-button" onClick={onClose}>
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
