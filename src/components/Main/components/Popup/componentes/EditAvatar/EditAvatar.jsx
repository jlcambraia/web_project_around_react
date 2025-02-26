import { useRef } from "react";

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  // Cria uma referência para o input do avatar
  const avatarRef = useRef();

  // Função para lidar com o input para troca de avatar
  function handleAvatarLinkSubmit(evt) {
    evt.preventDefault();
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
        className="popup__save-button"
      >
        Salvar
      </button>
    </form>
  );
}
