export default function EditProfile() {
  return (
    <form class="popup__form" name="edit-popup" novalidate>
      <div class="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-name"
          class="popup__input"
          type="text"
          placeholder="Nome"
          minlength="2"
          maxlength="40"
          required
        />
        <span
          id="popup__input-name-error"
          class="popup__input-error popup__input-error_hidden"
        ></span>
      </div>
      <div class="popup__input-wrapper">
        <input
          name="about"
          id="popup__input-about"
          class="popup__input popup__input_margin-large"
          type="text"
          placeholder="Sobre mim"
          minlength="2"
          maxlength="200"
          required
        />
        <span
          id="popup__input-about-error"
          class="popup__input-error popup__input-error_positioned-top popup__input-error_hidden"
        ></span>
      </div>
      <button
        id="popup__save-edit-button"
        type="submit"
        class="popup__save-button"
      >
        Salvar
      </button>
    </form>
  );
}
