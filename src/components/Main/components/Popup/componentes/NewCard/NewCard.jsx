export default function NewCard() {
  return (
    <form className="popup__form" name="add-popup" noValidate>
      <div className="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-title"
          className="popup__input"
          type="text"
          placeholder="Título"
          minlenght="2"
          maxlenght="30"
          required
        />
        <span
          id="popup__input-title-error"
          className="popup__input-error popup__input-error_hidden"
        ></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-link"
          className="popup__input popup__input_margin-large"
          type="url"
          placeholder="Link da imagem"
          required
        />
        <span
          id="popup__input-link-error"
          className="popup__input-error popup__input-error_positioned-top popup__input-error_hidden"
        ></span>
      </div>
      <button
        id="popup__save-add-button"
        type="submit"
        className="popup__save-button"
      >
        Criar
      </button>
    </form>
  );
}
