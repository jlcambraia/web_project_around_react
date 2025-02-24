export default function EditProfile() {
  return (
    <form className="popup__form" name="edit-popup" noValidate>
      <div className="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-name"
          className="popup__input"
          type="text"
          placeholder="Nome"
          minLenght="2"
          maxLenght="40"
          required
        />
        <span
          id="popup__input-name-error"
          className="popup__input-error popup__input-error_hidden"
        ></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="about"
          id="popup__input-about"
          className="popup__input popup__input_margin-large"
          type="text"
          placeholder="Sobre mim"
          minLenght="2"
          maxLenght="200"
          required
        />
        <span
          id="popup__input-about-error"
          className="popup__input-error popup__input-error_positioned-top popup__input-error_hidden"
        ></span>
      </div>
      <button
        id="popup__save-edit-button"
        type="submit"
        className="popup__save-button"
      >
        Salvar
      </button>
    </form>
  );
}
