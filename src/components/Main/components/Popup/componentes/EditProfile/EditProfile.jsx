import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função que atualiza o name quando o input for utilizado
  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  // Função que atualiza o about quando o input for utilizado
  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }

  // Função para gerenciar o estado de submissão
  function handleSubmitState(isSubmitting) {
    setIsSubmitting(isSubmitting);
  }

  // Função que atualiza os dados do usuário ao clicar no botão Salvar
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Atualiza o estado para "salvando"
    handleSubmitState(true);

    handleUpdateUser({ name, about }); // Atualiza as informações do usuário
  };

  return (
    <form
      className="popup__form"
      name="edit-popup"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          value={name}
          onChange={handleNameChange}
          name="name"
          id="popup__input-name"
          className="popup__input"
          type="text"
          placeholder="Nome"
          minlenght="2"
          maxlenght="40"
          required
        />
        <span
          id="popup__input-name-error"
          className="popup__input-error popup__input-error_hidden"
        ></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          value={about}
          onChange={handleAboutChange}
          name="about"
          id="popup__input-about"
          className="popup__input popup__input_margin-large"
          type="text"
          placeholder="Sobre mim"
          minlenght="2"
          maxlenght="200"
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
