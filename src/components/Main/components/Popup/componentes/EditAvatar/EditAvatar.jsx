export default function EditAvatar() {
  return (
    <form
      className="popup__form"
      name="change-profile-picture-popup"
      noValidate
    >
      <div className="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-change-profile-link"
          className="popup__input popup__input_margin-large"
          type="url"
          placeholder="Link da imagem"
          required
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
