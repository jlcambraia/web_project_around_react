export default function NewCard() {
  return (
    <form class="popup__form" name="add-popup" novalidate>
      <div class="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-title"
          class="popup__input"
          type="text"
          placeholder="Título"
          minlength="2"
          maxlength="30"
          required
        />
        <span
          id="popup__input-title-error"
          class="popup__input-error popup__input-error_hidden"
        ></span>
      </div>
      <div class="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-link"
          class="popup__input popup__input_margin-large"
          type="url"
          placeholder="Link da imagem"
          required
        />
        <span
          id="popup__input-link-error"
          class="popup__input-error popup__input-error_positioned-top popup__input-error_hidden"
        ></span>
      </div>
      <button
        id="popup__save-add-button"
        type="submit"
        class="popup__save-button"
      >
        Criar
      </button>
    </form>
  );
}
