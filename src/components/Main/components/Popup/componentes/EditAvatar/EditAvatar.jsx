import { useRef, useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const avatarRef = useRef();

  // Função para validar o input de avatar
  function handleAvatarChange() {
    const avatarValue = avatarRef.current.value;

    if (avatarRef.current.validity.valid) {
      setAvatarError("");
      setIsFormValid(true);
    } else {
      setAvatarError(avatarRef.current.validationMessage);
      setIsFormValid(false);
    }
  }

  // Função para lidar com o botão submit do form
  function handleAvatarLinkSubmit(evt) {
    evt.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);

    onUpdateAvatar({ avatarLink: avatarRef.current.value });

    // Resetando o input e a validação após o envio
    avatarRef.current.value = "";
    setIsFormValid(false);
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
          onChange={handleAvatarChange}
        />
        <span
          id="popup__input-change-profile-link-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            !avatarError ? "popup__input-error_hidden" : ""
          }`}
        >
          {avatarError}
        </span>
      </div>
      <button
        id="popup__change-profile-picture-button"
        type="submit"
        className={`popup__save-button ${
          isSubmitting || !isFormValid ? "popup__save-button_disabled" : ""
        }`}
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
