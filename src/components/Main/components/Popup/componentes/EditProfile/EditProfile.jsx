import { useState, useEffect, useContext, useCallback } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // Garante que o botão inicie desabilitado

  // Atualiza a validação do formulário quando os erros mudam
  useEffect(() => {
    setIsFormValid(!nameError && !aboutError && name && about);
  }, [nameError, aboutError, name, about]);

  // Função que atualiza o name quando o input for utilizado
  function handleNameChange(evt) {
    setName(evt.target.value);
    setNameError(evt.target.validity.valid ? "" : evt.target.validationMessage);
  }

  // Função que atualiza o about quando o input for utilizado
  function handleAboutChange(evt) {
    setAbout(evt.target.value);
    setAboutError(
      evt.target.validity.valid ? "" : evt.target.validationMessage
    );
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmitting(true);
    handleUpdateUser({ name, about });
  }

  const resetForm = useCallback(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setNameError("");
    setAboutError("");
    setIsSubmitting(false);
    setIsFormValid(false);
  }, [currentUser.name, currentUser.about]);

  // Reseta o formulário ao abrir o popup
  useEffect(() => {
    resetForm();
  }, [currentUser, resetForm]);

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
          minLength="2"
          maxLength="40"
          required
        />
        <span
          id="popup__input-name-error"
          className={`popup__input-error ${
            !nameError ? "popup__input-error_hidden" : ""
          }`}
        >
          {nameError}
        </span>
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
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="popup__input-about-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            !aboutError ? "popup__input-error_hidden" : ""
          }`}
        >
          {aboutError}
        </span>
      </div>
      <button
        id="popup__save-edit-button"
        type="submit"
        className={`popup__save-button ${
          isSubmitting || !isFormValid ? "popup__save-button_disabled" : ""
        }`}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
