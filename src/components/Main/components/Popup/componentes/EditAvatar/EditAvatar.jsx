import { useRef, useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cria uma referência para o input do avatar
  const avatarRef = useRef();

  // Função para gerenciar o estado de submissão
  function handleSubmitState(isSubmitting) {
    setIsSubmitting(isSubmitting);
  }

  // Função para lidar com o input para troca de avatar
  function handleAvatarLinkSubmit(evt) {
    evt.preventDefault();

    // Atualiza o estado para "salvando"
    handleSubmitState(true);

    const avatarLink = avatarRef.current.value;

    onUpdateAvatar({ avatarLink });
  }

  return (
    <form
      className="popup__form"
      name="change-profile-picture-popup"
      noValidate
      onSubmit={handleAvatarLinkSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-change-profile-link"
          className="popup__input popup__input_margin-large"
          type="url"
          placeholder="Link da imagem"
          required
          ref={avatarRef}
        />
        <span
          id="popup__input-change-profile-link-error"
          className="popup__input-error popup__input-error_positioned-top popup__input-error_hidden"
        ></span>
      </div>
      <button
        id="popup__change-profile-picture-button"
        type="submit"
        className={`popup__save-button ${
          isSubmitting ? "popup__save-button_disabled" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
